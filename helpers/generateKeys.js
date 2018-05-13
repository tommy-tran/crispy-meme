const mongoose = require('mongoose');
const Leaderboard = mongoose.model('leaderboards');

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
  const privateKey =  randomKeys(2);
  const publicKey =  randomKeys(2);

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
