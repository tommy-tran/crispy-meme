const mongoose = require('mongoose');
const leaderboard = mongoose.model('leaderboards');

/**
 * Checks for request type and returns object specifying request type and the request itself
 */
const getRequestType = key => {

  const privateRequest = leaderboard.findOne({
    privateKey: key
  }, result => {
    return { type: 'private' }
  });

  const publicRequest = leaderboard.findOne({
    publicKey: key
  }, result => {
    return { type: 'public' }
  });

  return null;
};

module.exports = getRequestType;