const boardSize = 5;
const maxMoves = 30;
let board = [];
let moveCount = 0;
let initialState = [];

function createBoard() {
  const gameBoard = document.getElementById('gameBoard');
  gameBoard.innerHTML = "";
  board = [];

  for (let row = 0; row < boardSize; row++) {
    board[row] = [];
    for (let col = 0; col < boardSize; col++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.row = row;
      cell.dataset.col = col;
      cell.addEventListener('click', () => {
        toggleLights(row, col);
        moveCount++;
        updateMoveCounter();
        checkWin();
        checkFail();
      });
      board[row][col] = cell;
      gameBoard.appendChild(cell);
    }
  }
}

function toggleLight(row, col) {
  if (row >= 0 && row < boardSize && col >= 0 && col < boardSize) {
    board[row][col].classList.toggle('is-off');
  }
}

function toggleLights(row, col) {
  toggleLight(row, col);     // center
  toggleLight(row - 1, col); // up
  toggleLight(row + 1, col); // down
  toggleLight(row, col - 1); // left
  toggleLight(row, col + 1); // right
}

function scrambleBoard() {
  const moves = 10;
  for (let i = 0; i < moves; i++) {
    const r = Math.floor(Math.random() * boardSize);
    const c = Math.floor(Math.random() * boardSize);
    toggleLights(r, c); // Apply click simulation
  }

  // Save initial state for reset
  initialState = board.map(row => row.map(cell => cell.classList.contains('is-off')));
}

function resetBoard() {
  for (let row = 0; row < boardSize; row++) {
    for (let col = 0; col < boardSize; col++) {
      board[row][col].classList.toggle('is-off', initialState[row][col]);
    }
  }
  moveCount = 0;
  updateMoveCounter();
}

function newGame() {
  createBoard();
  scrambleBoard();
  moveCount = 0;
  updateMoveCounter();
}

function updateMoveCounter() {
  document.getElementById('moveCounter').textContent = `Moves: ${moveCount}`;
}

function checkWin() {
  for (let row = 0; row < boardSize; row++) {
    for (let col = 0; col < boardSize; col++) {
      if (!board[row][col].classList.contains('is-off')) return;
    }
  }
  setTimeout(() => alert("You win!"), 100);
}

function checkFail() {
  if (moveCount > maxMoves) {
    setTimeout(() => {
      if (confirm("You've exceeded the maximum number of moves. Try again?")) {
        newGame();
      }
    }, 100);
  }
}

window.onload = newGame;
