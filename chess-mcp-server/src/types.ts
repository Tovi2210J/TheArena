export type PieceType = 'pawn' | 'rook' | 'knight' | 'bishop' | 'queen' | 'king';
export type PieceColor = 'white' | 'black';

export interface ChessPiece {
  type: PieceType;
  color: PieceColor;
}

export interface ChessPosition {
  row: number;  // 0-7
  col: number;  // 0-7
}

export interface ChessMoveInput {
  from: ChessPosition;
  to: ChessPosition;
  promotion?: PieceType;
}

export interface ChessMove {
  from: ChessPosition;
  to: ChessPosition;
  piece: ChessPiece;
  captured?: ChessPiece;
  promotion?: PieceType;
  isCheck?: boolean;
  isCheckmate?: boolean;
  notation?: string;
}

export interface ChessState {
  board: (ChessPiece | null)[][];
  currentPlayer: PieceColor;
  gameStatus: 'ongoing' | 'check' | 'checkmate' | 'stalemate' | 'draw';
  moveHistory: ChessMove[];
  lastMove?: ChessMove;
}

export interface ChessToolResponse {
  [key: string]: any;
  content: { type: "text", text: string }[];
  context: {
    gameId: string;
    currentState: ChessState;
    waitingForPlayer?: PieceColor;
    lastMove?: ChessMove;
  };
  nextAction: 'movePiece' | 'pollUserMove' | 'finish' | null;
}

export interface UserMoveInput {
  gameId: string;
  move: ChessMoveInput;
  timestamp: number;
}
