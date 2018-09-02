const helpers = require("../helpers");

module.exports = class StateChannel {
  constructor(args) {
    this.args = args;
  }

  async openChannel() {
    const user1Agrees =
      (await helpers.verify(this.args.sig1, this.args.pub1)) &&
      (await helpers.getMessagePayload(this.args.sig1)) ===
        this.args.startState;

    const user2Agrees =
      (await helpers.verify(this.args.sig2, this.args.pub2)) &&
      (await helpers.getMessagePayload(this.args.sig2)) ===
        this.args.startState;

    console.log("Channel Open: ", user1Agrees && user2Agrees);
  }

  async closeChannel(endState, sig1, sig2) {
    const user1Agrees =
      (await helpers.verify(sig1, this.args.pub1)) &&
      (await helpers.getMessagePayload(sig1)) === endState;

    const user2Agrees =
      (await helpers.verify(sig2, this.args.pub2)) &&
      (await helpers.getMessagePayload(sig2)) === endState;

    console.log("Channel Closed: ", user1Agrees && user2Agrees);
    
  }
};
