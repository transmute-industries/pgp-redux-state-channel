const { reducer, initialState } = require("./reducer");

module.exports = class TicTacToe {
  constructor(pub1, pub2) {
    this.state = initialState;
    // X always goes first and pub1 is always X
    this.state.players["X"] = pub1;
    this.state.players["O"] = pub2;
  }

  applyEvent(event) {
    const { state } = this;
    this.state = reducer(state, event);
  }
};
