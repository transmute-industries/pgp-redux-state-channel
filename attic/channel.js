let state = {
  board: [[null, null, null], [null, null, null], [null, null, null]],
  turn: "X",
  players: {
    X: null,
    O: null
  },
  channelLength: 0
};

const isMoveValid = (board, symbol, x, y) => {
  return board[y][x] === null;
};

const makeMove = (board, symbol, x, y) => {
  return (board[y][x] = symbol);
};

// https://github.com/christkv/tic-tac-toe/blob/master/lib/handlers/gamer_handler.js
/**
 * Checks from a given marker position if it's a winner
 * on the horizontal, vertical or diagonal
 *
 * [0, 0, 0] [0, 1, 0] [1, 0, 0] [0, 0, 1]
 * [1, 1, 1] [0, 1, 0] [0, 1, 0] [0, 1, 0]
 * [0, 0, 0] [0, 1, 0] [0, 0, 1] [1, 0, 0]
 */
const isGameOver = function(board, y, x, marker) {
  // Check the x and y for the following ranges
  var foundVertical = true;
  var foundHorizontal = true;
  var foundDiagonal = true;

  // y and x = 0 to x = n
  for (var i = 0; i < board[0].length; i++) {
    if (board[y][i] != marker) {
      foundHorizontal = false;
      break;
    }
  }
  // Found a winning position
  if (foundHorizontal) return true;

  // x and y = 0 to y = n
  for (var i = 0; i < board.length; i++) {
    if (board[i][x] != marker) {
      foundVertical = false;
      break;
    }
  }

  // Found a winning position
  if (foundVertical) return true;

  // 0, 0 to n, n along the diagonal
  for (var i = 0, j = 0; i < board[0].length; i++) {
    if (board[j++][i] != marker) {
      foundDiagonal = false;
      break;
    }
  }

  // Found a winning position
  if (foundDiagonal) return true;
  // Reset found diagonal
  foundDiagonal = true;

  // n, 0 to 0, n along the diagonal
  for (var i = board[0].length - 1, j = 0; i > 0; i--) {
    if (board[j++][i] != marker) {
      foundDiagonal = false;
      break;
    }
  }

  // Return result of looking in the diagonal
  return foundDiagonal;
};

const printState = board => {
  board.forEach(row => {
    console.log(row);
  });
};

// printState(board);

// console.log(isMoveValid(board, "x", 0, 0));
// console.log(makeMove(board, "x", 0, 0));
// console.log(makeMove(board, "x", 0, 1));
// console.log(makeMove(board, "x", 0, 2));
// console.log(isMoveValid(board, "x", 0, 0));

// printState(board);

console.log(isGameOver(board, 0, 0, "x"));
