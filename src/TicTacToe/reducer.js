const initialState = {
  board: [[null, null, null], [null, null, null], [null, null, null]],
  turn: "X",
  players: {
    X: null,
    O: null
  },
  winner: null,
  events: []
};

// logger = () => {};
const logger = console.log;

const reducer = (state, event) => {
  const status = state => {
    logger("\n");
    logger("Turn: ", state.turn, state.players[state.turn]);
    logger("Winner: ", state.winner);
    state.board.forEach(row => {
      logger(row);
    });
    logger("\n");
  };
  const isMoveValid = (state, marker, x, y) => {
    if (state.winner !== null) {
      logger("Game is over!");
      return false;
    }
    if (!state.turn === marker) {
      logger("Not your turn!");
      return false;
    }
    return state.board[y][x] === null;
  };

  // https://github.com/christkv/tic-tac-toe/blob/master/lib/handlers/gamer_handler.js
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

  if (event.type !== "PLAYER_MOVE") {
    logger("Only PLAYER_MOVE events are accepted.");
  } else {
    const { x, y, marker } = event.payload;
    if (!isMoveValid(state, marker, x, y)) {
      logger("Not a valid move!");
    } else {
      state.board[y][x] = marker;
      if (isGameOver(state.board, y, x, marker)) {
        state.winner = marker;
      } else {
        state.turn = marker === "X" ? "O" : "X";
      }
      state.events.push(event);
    }
    status(state);
  }

  return state;
};

module.exports = {
  reducer,
  initialState
};
