const StateChannel = require("../StateChannel");

const TicTacToe = require("../TicTacToe");

const helpers = require("../helpers");

describe("Simple Integration Test", () => {
  it("has a happy path with no valdation", async () => {
    const user1 = await helpers.generateOpenPGPArmoredKeypair({
      name: "user1",
      passphrase: "user1"
    });

    const user2 = await helpers.generateOpenPGPArmoredKeypair({
      name: "user2",
      passphrase: "user2"
    });

    const game = new TicTacToe(user1.publicKey, user2.publicKey);

    const startState = JSON.stringify(game.state);

    const user1StartStateSig = await helpers.sign(
      startState,
      user1.privateKey,
      "user1"
    );

    const user2StartStateSig = await helpers.sign(
      startState,
      user2.privateKey,
      "user2"
    );

    let sc = new StateChannel({
      startState,
      pub1: user1.publicKey,
      sig1: user1StartStateSig,
      pub2: user2.publicKey,
      sig2: user2StartStateSig
    });

    await sc.openChannel();

    let move = {
      x: 0,
      y: 0,
      marker: game.state.turn
    };

    game.applyEvent({
      type: "PLAYER_MOVE",
      payload: move,
      signature: await helpers.sign(
        JSON.stringify({
          state: game.state,
          move: move
        }),
        user1.privateKey,
        "user1"
      )
    });

    move = {
      x: 0,
      y: 1,
      marker: game.state.turn
    };

    game.applyEvent({
      type: "PLAYER_MOVE",
      payload: move,
      signature: await helpers.sign(
        JSON.stringify({
          state: game.state,
          move: move
        }),
        user2.privateKey,
        "user2"
      )
    });

    move = {
      x: 1,
      y: 0,
      marker: game.state.turn
    };

    game.applyEvent({
      type: "PLAYER_MOVE",
      payload: move,
      signature: await helpers.sign(
        JSON.stringify({
          state: game.state,
          move: move
        }),
        user2.privateKey,
        "user2"
      )
    });

    move = {
      x: 0,
      y: 0,
      marker: game.state.turn
    };

    game.applyEvent({
      type: "PLAYER_MOVE",
      payload: move,
      signature: await helpers.sign(
        JSON.stringify({
          state: game.state,
          move: move
        }),
        user1.privateKey,
        "user1"
      )
    });

    move = {
      x: 0,
      y: 2,
      marker: game.state.turn
    };

    game.applyEvent({
      type: "PLAYER_MOVE",
      payload: move,
      signature: await helpers.sign(
        JSON.stringify({
          state: game.state,
          move: move
        }),
        user1.privateKey,
        "user1"
      )
    });

    move = {
      x: 2,
      y: 0,
      marker: game.state.turn
    };

    game.applyEvent({
      type: "PLAYER_MOVE",
      payload: move,
      signature: await helpers.sign(
        JSON.stringify({
          state: game.state,
          move: move
        }),
        user2.privateKey,
        "user2"
      )
    });

    move = {
      x: 1,
      y: 1,
      marker: game.state.turn
    };

    game.applyEvent({
      type: "PLAYER_MOVE",
      payload: move,
      signature: await helpers.sign(
        JSON.stringify({
          state: game.state,
          move: move
        }),
        user1.privateKey,
        "user1"
      )
    });

    const endState = JSON.stringify(game.state);

    const user1EndStateSig = await helpers.sign(
      endState,
      user1.privateKey,
      "user1"
    );

    const user2EndStateSig = await helpers.sign(
      endState,
      user2.privateKey,
      "user2"
    );

    await sc.closeChannel(endState, user1EndStateSig, user2EndStateSig);
  });
});
