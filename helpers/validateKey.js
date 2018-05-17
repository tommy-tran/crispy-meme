const Leaderboard = require('../models/Leaderboard');

const validatePrivateKey = (key) => {
  Leaderboard.findOne({
    privateKey: key
  }, (err, result) => {
    if (err) {
      console.log(err);
    }

    return result;
  });
}

const validatePublicKey = (key) => {
  Leaderboard.findOne({
    privateKey: key
  }, (err, result) => {
    if (err) {
      console.log(err);
    }

    return result;
  });
}

module.exports = { validatePrivateKey, validatePublicKey };