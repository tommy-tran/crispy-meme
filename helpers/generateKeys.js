const mongoose = require('mongoose');
const Leaderboard = require('../models/Leaderboard');

const generateKeys = () => {
  const randomKeys = num => {
    let key = '';
    for (let i = 0; i < num; i++) {
      key += Math.random()
        .toString(36)
        .replace('0.', '');
    }

    return key;
  };
  const privateKey = randomKeys(2);
  const publicKey = randomKeys(2);

  // To handle unlikely case of both private and public keys being the same
  if (
    privateKey === publicKey ||
    privateKey.length < 20 ||
    publicKey.length < 20
  ) {
    return generateKeys();
  }

  // Find if the generated keys currently exist in the databse
  Leaderboard.find({
    $or: [{ privateKey }, { publicKey }]
  }).then(() => {
    // Found leaderboard with generated key
    return generateKeys();
  });

  return {
    privateKey: privateKey.substring(0, 20),
    publicKey: publicKey.substring(0, 20)
  };
};

module.exports = generateKeys;
