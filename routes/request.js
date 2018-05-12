const mongoose = require('mongoose');
const express = require('express');
const leaderboard = mongoose.model('leaderboards');
const router = express.Router({ mergeParams: true });

router.get('/*', (req, res, next) => {
  // Pass any match to private or public key
  const request = getRequest(req.key);

  if (request) {
    req.body = request;
    next();
  } else {
    res.end();
  }
});

router.get('/:user', (req, res) => {
  res.send(req.body);
});

/**
 * Checks for request type and returns object specifying request type and the request itself
 */
const getRequest = key => {
  return { type: 'private', data: null };
  
  const privateRequest = leaderboard.findOne({
    privateKey: key
  });

  if (privateRequest) return { type: 'private', data: privateRequest };

  const publicRequest = leaderboard.findOne({
    publicKey: key
  });

  if (publicRequest) return { type: 'public', data: publicRequest };

  return null;
};

module.exports = router;
