#!/usr/bin/env node
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';

import { getInitialState, movePiece } from './chessLogic.js';
import { pollUserMove, addUserMove } from './pollingTool.js';
import { ChessState, ChessToolResponse } from './types.js';
import express from 'express';
import http from 'http';
import WebSocket from 'ws';
import path from 'path';

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });


const games: Record<string, ChessState> = {};


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/gamelist.html'));
});
app.use(express.static(path.join(__dirname, '../public')));


app.get('/games', (req, res) => {
    res.json(Object.keys(games));
});


app.get('/game/:gameId', (req, res) => {
    const gameId = req.params.gameId;
    if (!games[gameId]) {
        res.status(404).send('Game not found');
        return;
    }
    res.sendFile(path.join(__dirname, '../public/index.html'));
});


app.get('/state/:gameId', (req, res) => {
    const gameId = req.params.gameId;
    const state = games[gameId];
    if (state) {
        res.json(state);
    } else {
        res.status(404).send('Game not found');
    }
});


wss.on('connection', ws => {
    ws.on('message', message => {
        let data;
        try {
            data = JSON.parse(message.toString());
        } catch (err) {
            console.error('[WebSocket] Invalid JSON message:', err);
            return;
        }
        if (data.type === 'move') {
            if (!data.gameId || !data.move) {
                console.error('[WebSocket] Missing gameId or move in message:', data);
                return;
            }
            addUserMove(data.gameId, { gameId: data.gameId, move: data.move, timestamp: Date.now() });
            console.error(`[WebSocket] Move received for game ${data.gameId}`);
        }
    });
    ws.on('close', () => {
        // Optionally handle cleanup
    });
});

const mcpServer = new McpServer({
    name: 'chess-mcp-server',
    version: '1.0.0'
});


mcpServer.registerTool('start', {
    title: 'Start Chess Game',
    description: 'Starts a new chess game',
    inputSchema: {},
}, async () => {
    const gameId = `game-${Date.now()}`;
    const initialState = getInitialState();
    games[gameId] = initialState;
    console.error(`[MCP] New game started: ${gameId}`);
    return {
        type: 'start',
        gameId,
        currentState: initialState,
        lastMove: null,
        nextAction: 'movePiece',
        content: [{ type: 'text', text: 'New game started' }],
    };
});


mcpServer.registerTool('movePiece', {
    title: 'Move Piece',
    description: 'Moves a piece on the board',
    inputSchema: { gameId: z.string(), move: z.any() },
}, async ({ gameId, move }) => {
    const currentState = games[gameId];
    if (!currentState) {
        console.error(`[MCP] movePiece: Game not found: ${gameId}`);
        throw new Error('Game not found');
    }
    const { newState, moveResult } = movePiece(currentState, move);
    games[gameId] = newState;

    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ type: 'update', gameId, newState }));
        }
    });

    if (!moveResult) {
        console.error(`[MCP] Invalid move for game ${gameId}:`, move);
    } else {
        console.error(`[MCP] Move made in game ${gameId}: ${moveResult.notation}`);
    }

    return {
        type: 'movePiece',
        gameId,
        currentState: newState,
        lastMove: moveResult || null,
        nextAction: newState.gameStatus === 'ongoing' ? 'pollUserMove' : 'finish',
        content: [{ type: 'text', text: moveResult ? `Moved ${moveResult.notation}` : 'Invalid move' }],
    };
});


mcpServer.registerTool('pollUserMove', {
    title: 'Poll User Move',
    description: 'Waits for a user to make a move',
    inputSchema: { gameId: z.string() },
}, async ({ gameId }) => {
    const currentState = games[gameId];
    if (!currentState) {
        console.error(`[MCP] pollUserMove: Game not found: ${gameId}`);
        throw new Error('Game not found');
    }
    const pollResult = await pollUserMove(gameId, currentState);
    // pollResult: { move: ..., found: boolean }
    if (pollResult && pollResult.move) {
        return {
            type: 'pollUserMove',
            gameId,
            currentState,
            lastMove: pollResult.move,
            nextAction: 'movePiece',
            content: [{ type: 'text', text: 'User has made a move' }],
        };
    } else {
        return {
            type: 'pollUserMove',
            gameId,
            currentState,
            lastMove: null,
            nextAction: 'pollUserMove',
            content: [{ type: 'text', text: 'Waiting for user move' }],
        };
    }
});


mcpServer.registerTool('finish', {
    title: 'Finish Game',
    description: 'Finishes the current game',
    inputSchema: { gameId: z.string() },
}, async ({ gameId }) => {
    const finalState = games[gameId];
    if (!finalState) {
        console.error(`[MCP] finish: Game not found: ${gameId}`);
        return {
            type: 'finish',
            gameId,
            currentState: null,
            lastMove: null,
            nextAction: null,
            content: [{ type: 'text', text: 'Game not found' }],
        };
    }
    delete games[gameId];
    console.error(`[MCP] Game finished: ${gameId}`);
    return {
        type: 'finish',
        gameId,
        currentState: finalState,
        lastMove: null,
        nextAction: null,
        content: [{ type: 'text', text: 'Game finished' }],
    };
});


import net from 'net';

function getPortFromArg(): number | undefined {
    const arg = process.argv.find(arg => arg.startsWith('--port='));
    if (arg) {
        const port = parseInt(arg.split('=')[1], 10);
        if (!isNaN(port)) return port;
    }
    return undefined;
}

function findAvailablePort(startPort: number, maxAttempts = 10): Promise<number> {
    return new Promise((resolve, reject) => {
        let port = startPort;
        let attempts = 0;
        function tryPort() {
            const tester = net.createServer()
                .once('error', err => {
                    if ((err as any).code === 'EADDRINUSE') {
                        attempts++;
                        if (attempts >= maxAttempts) {
                            reject(new Error('No available ports'));
                        } else {
                            port++;
                            tryPort();
                        }
                    } else {
                        reject(err);
                    }
                })
                .once('listening', () => {
                    tester.close(() => resolve(port));
                })
                .listen(port);
        }
        tryPort();
    });
}

async function main() {
    const transport = new StdioServerTransport();
    await mcpServer.connect(transport);

    let port = getPortFromArg() || 3000;
    try {
        port = await findAvailablePort(port);
    } catch (e) {
        console.error('[Server] No available ports found.');
        process.exit(1);
    }

    server.listen(port, () => {
        console.error(`[Server] Listening on http://localhost:${port}`);
    });

    const shutdown = () => {
        console.error('[Server] Shutting down...');
        server.close(() => {
            process.exit();
        });
    };
    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);
}

main().catch(error => {
    console.error('[Server] Error:', error);
    process.exit(1);
});
