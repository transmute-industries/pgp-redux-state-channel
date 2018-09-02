const helpers = require("./src/helpers");

// sign plaintext
(async () => {
  const passphrase = "yolo";
  const message = "hello";
  let keypair = await helpers.generateOpenPGPArmoredKeypair({
    name: "bob",
    passphrase
  });

  let clearTextMessage = await helpers.sign(
    message,
    keypair.privateKey,
    passphrase
  );
  //   console.log(clearTextMessage);
  let verified = await helpers.verify(clearTextMessage, keypair.publicKey);
  console.log(verified);
})();

// // authenticated encryption for self
// (async () => {
//   const passphrase = "yolo";
//   const message = "hello";
//   let keypair = await generateOpenPGPArmoredKeypair({
//     name: "bob",
//     passphrase
//   });
//   console.log(keypair);
//   let encryptedMessage = await encryptMessage(
//     message,
//     keypair.privateKey,
//     keypair.publicKey,
//     passphrase
//   );
//   console.log(encryptedMessage);
//   let decryptedMessage = await decryptMessage(
//     encryptedMessage,
//     keypair.privateKey,
//     keypair.publicKey,
//     passphrase
//   );
//   console.log(decryptedMessage);
// })();
