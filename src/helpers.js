const openpgp = require("openpgp");

const generateOpenPGPArmoredKeypair = async ({ name, passphrase }) => {
  const secOptions = {
    userIds: [
      {
        name
      }
    ],
    curve: "secp256k1",
    passphrase
  };

  // create primary key
  const primaryKeyPair = await openpgp.generateKey(secOptions);
  return {
    publicKey: primaryKeyPair.publicKeyArmored,
    privateKey: primaryKeyPair.privateKeyArmored
  };
};

const encryptMessage = async (message, privkey, pubkey, passphrase) => {
  const privKeyObj = openpgp.key.readArmored(privkey).keys[0];
  await privKeyObj.decrypt(passphrase);

  const options = {
    data: message, // input as String (or Uint8Array)
    publicKeys: openpgp.key.readArmored(pubkey).keys, // for encryption
    privateKeys: [privKeyObj] // for signing (optional)
  };

  return openpgp.encrypt(options).then(ciphertext => {
    let encrypted = ciphertext.data; // '-----BEGIN PGP MESSAGE ... END PGP MESSAGE-----'
    return encrypted;
  });
};

const decryptMessage = async (encrypted, privkey, pubkey, passphrase) => {
  const privKeyObj = openpgp.key.readArmored(privkey).keys[0];
  await privKeyObj.decrypt(passphrase);

  const options = {
    message: openpgp.message.readArmored(encrypted), // parse armored message
    publicKeys: openpgp.key.readArmored(pubkey).keys, // for verification (optional)
    privateKeys: [privKeyObj] // for decryption
  };

  return openpgp.decrypt(options).then(plaintext => {
    // console.log(plaintext.data);
    return plaintext.data; // 'Hello, World!'
  });
};

const sign = async (message, privkey, passphrase) => {
  const privKeyObj = (await openpgp.key.readArmored(privkey)).keys[0];
  await privKeyObj.decrypt(passphrase);

  let options = {
    message: openpgp.cleartext.fromText(message), // CleartextMessage or Message object
    privateKeys: [privKeyObj] // for signing
  };

  return new Promise((resolve, reject) => {
    openpgp.sign(options).then(function(signed) {
      let cleartext = signed.data; // '-----BEGIN PGP SIGNED MESSAGE ... END PGP SIGNATURE-----'
      resolve(cleartext);
    });
  });
};

const verify = async (cleartext, pubKey) => {
  let options = {
    message: await openpgp.cleartext.readArmored(cleartext), // parse armored message
    publicKeys: (await openpgp.key.readArmored(pubKey)).keys // for verification
  };

  return new Promise((resolve, reject) => {
    openpgp.verify(options).then(function(verified) {
      let validity = verified.signatures[0].valid; // true
      if (validity) {
        console.log("signed by key id " + verified.signatures[0].keyid.toHex());
      }
      resolve(validity);
    });
  });
};

const getMessagePayload = async cleartext => {
  return (await openpgp.cleartext.readArmored(cleartext)).text;
};

module.exports = {
  sign,
  verify,
  generateOpenPGPArmoredKeypair,
  getMessagePayload
};
