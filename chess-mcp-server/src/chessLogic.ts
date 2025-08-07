import { Chess } from 'chess.js';
import { ChessState, ChessMove, ChessMoveInput, ChessPiece, PieceColor, PieceType } from './types';

export function getInitialState(): ChessState {
  const chess = new Chess();
  return chessToState(chess);
}

export function movePiece(state: ChessState, move: ChessMoveInput): {newState: ChessState, moveResult: ChessMove | null} {
  const chess = stateToChess(state);
  try {
    const result = chess.move({ from: posToSquare(move.from), to: posToSquare(move.to), promotion: move.promotion });
    const newState = chessToState(chess);
    const moveResult: ChessMove = {
        from: move.from,
        to: move.to,
        piece: result.piece as any,
        captured: result.captured as any,
        promotion: result.promotion as any,
        isCheck: newState.gameStatus === 'check',
        isCheckmate: newState.gameStatus === 'checkmate',
        notation: result.san
    };
    return { newState, moveResult };
  } catch (e) {
    return { newState: state, moveResult: null };
  }
}

function chessToState(chess: any): ChessState {
    const board: (ChessPiece | null)[][] = chess.board().map((row: any) =>
        row.map((p: any) => {
            if (!p) return null;
            return {
                type: p.type === 'p' ? 'pawn' : p.type === 'r' ? 'rook' : p.type === 'n' ? 'knight' : p.type === 'b' ? 'bishop' : p.type === 'q' ? 'queen' : 'king',
                color: p.color === 'w' ? 'white' : 'black'
            };
        })
    );

    return {
        board,
        currentPlayer: chess.turn() === 'w' ? 'white' : 'black',
        gameStatus: chess.isCheckmate() ? 'checkmate' : chess.isCheck() ? 'check' : chess.isStalemate() ? 'stalemate' : chess.isDraw() ? 'draw' : 'ongoing',
        moveHistory: [], // Simplified for now
    };
}

function stateToChess(state: ChessState): any {
  const chess = new Chess();
  chess.load(stateToFen(state));
  return chess;
}

function stateToFen(state: ChessState): string {
    let fen = '';
    for (const row of state.board) {
        let empty = 0;
        for (const piece of row) {
            if (piece) {
                if (empty > 0) {
                    fen += empty;
                    empty = 0;
                }
                let char = piece.type === 'pawn' ? 'p' : piece.type === 'rook' ? 'r' : piece.type === 'knight' ? 'n' : piece.type === 'bishop' ? 'b' : piece.type === 'queen' ? 'q' : 'k';
                if (piece.color === 'white') {
                    char = char.toUpperCase();
                }
                fen += char;
            } else {
                empty++;
            }
        }
        if (empty > 0) {
            fen += empty;
        }
        fen += '/';
    }
    fen = fen.slice(0, -1); // Remove last '/'

    fen += state.currentPlayer === 'white' ? ' w' : ' b';
    fen += ' KQkq - 0 1'; // Simplified castling and en passant
    return fen;
}

function posToSquare(pos: { row: number, col: number }): string {
    const file = String.fromCharCode('a'.charCodeAt(0) + pos.col);
    const rank = 8 - pos.row;
    return `${file}${rank}`;
}
