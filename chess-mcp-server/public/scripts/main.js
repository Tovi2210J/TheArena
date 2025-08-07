const board = document.getElementById('board');
const ws = new WebSocket('ws://localhost:3001');

let gameId = null;
let selectedPiece = null;

ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.type === 'update') {
        gameId = data.gameId;
        drawBoard(data.newState.board);
    }
};

function drawBoard(boardData) {
    board.innerHTML = '';
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            const square = document.createElement('div');
            square.classList.add('square', (i + j) % 2 === 0 ? 'white' : 'black');
            square.dataset.row = i;
            square.dataset.col = j;

            const piece = boardData[i][j];
            if (piece) {
                const pieceElement = document.createElement('div');
                pieceElement.classList.add('piece');
                pieceElement.textContent = getPieceSymbol(piece);
                pieceElement.addEventListener('click', () => onPieceClick(i, j));
                square.appendChild(pieceElement);
            }
            square.addEventListener('click', () => onSquareClick(i, j));
            board.appendChild(square);
        }
    }
}

function getPieceSymbol(piece) {
    const symbols = { pawn: '♙', rook: '♖', knight: '♘', bishop: '♗', queen: '♕', king: '♔' };
    let symbol = symbols[piece.type];
    if (piece.color === 'black') {
        symbol = String.fromCharCode(symbol.charCodeAt(0) + 6);
    }
    return symbol;
}

function onPieceClick(row, col) {
    selectedPiece = { row, col };
}

function onSquareClick(row, col) {
    if (selectedPiece) {
        const move = { from: selectedPiece, to: { row, col } };
        ws.send(JSON.stringify({ type: 'move', gameId, move }));
        selectedPiece = null;
    }
}
