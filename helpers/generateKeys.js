const mongoose = require('mongoose');
const Leaderboard = mongoose.model('leaderboards');

const generateKeys = () => {
  const privateKey = Math.random()
    .toString(36)
    .replace('0.', '');
  const publicKey = Math.random()
    .toString(36)
    .replace('0.', '');

  // To handle unlikely case of both private and public keys being the same
  if (privateKey === publicKey) {
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
    privateKey,
    publicKey
  };
};

module.exports = generateKeys;
