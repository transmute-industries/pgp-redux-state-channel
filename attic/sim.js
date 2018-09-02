const Game = require("./src/TicTacToe");

let g = new Game("0x0", "0x1");

g.applyEvent({
  type: "PLAYER_MOVE",
  payload: {
    x: 0,
    y: 0,
    marker: g.state.turn
  }
});

g.applyEvent({
  type: "PLAYER_MOVE",
  payload: {
    x: 0,
    y: 1,
    marker: g.state.turn
  }
});

g.applyEvent({
  type: "PLAYER_MOVE",
  payload: {
    x: 1,
    y: 0,
    marker: g.state.turn
  }
});

g.applyEvent({
  type: "PLAYER_MOVE",
  payload: {
    x: 0,
    y: 0,
    marker: g.state.turn
  }
});

g.applyEvent({
  type: "PLAYER_MOVE",
  payload: {
    x: 0,
    y: 2,
    marker: g.state.turn
  }
});

g.applyEvent({
  type: "PLAYER_MOVE",
  payload: {
    x: 2,
    y: 0,
    marker: g.state.turn
  }
});

g.applyEvent({
  type: "PLAYER_MOVE",
  payload: {
    x: 1,
    y: 1,
    marker: g.state.turn
  }
});

console.log(g.state.events);
