import { ChessToolResponse, UserMoveInput } from './types';

const userMoveQueue: { [gameId: string]: UserMoveInput[] } = {};

export function addUserMove(gameId: string, move: UserMoveInput) {
    if (!userMoveQueue[gameId]) {
        userMoveQueue[gameId] = [];
    }
    userMoveQueue[gameId].push(move);
}

export async function pollUserMove(gameId: string, currentState: any): Promise<ChessToolResponse> {
    // Throttle: always wait at least MIN_DELAY ms before returning
    const MIN_DELAY = 1200; // ms
    const start = Date.now();
    return new Promise((resolve) => {
        const interval = setInterval(() => {
            if (userMoveQueue[gameId] && userMoveQueue[gameId].length > 0) {
                const userMove = userMoveQueue[gameId].shift()!;
                clearInterval(interval);
                const elapsed = Date.now() - start;
                const wait = Math.max(0, MIN_DELAY - elapsed);
                setTimeout(() => {
                    resolve({
                        content: [{ type: 'text', text: 'User has made a move' }],
                        context: {
                            gameId,
                            currentState: currentState, // This should be the new state
                            lastMove: userMove.move as any,
                        },
                        nextAction: 'movePiece',
                    });
                }, wait);
            }
        }, 1000);
    });
}
