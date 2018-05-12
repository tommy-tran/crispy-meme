const mongoose = require('mongoose');
const express = require('express');
const leaderboard = mongoose.model('leaderboards');
const router = express.Router({ mergeParams: true });

router.get('/*', (req, res, next) => {
  const request = getRequest(req.key);

  if (request) {
    req.requestData = request;
    next();
  } else {
    res.end();
  }
});


/**
 * Public routes
 */
router.get('/user/:user', (req, res) => {
  // Return user data
});

router.delete('/:user', (req, res) => {
  // Check if private key and delete user score from leaderboard
});

router.post('/user/:user/:points', (req, res) => {
  // Check if private key and set new score/time
});

/**
 * Private routes
 */
router.get('/publickey', (req, res) => {
  // Check if private key and return public key
});

router.get('/clear', (req, res) => {
  // Check if private key and clear leaderboard
});




/**
 * Checks for request type and returns object specifying request type and the request itself
 */
const getRequest = key => {
  // Used until database is set up
  return { type: 'private', data: null };

  const privateRequest = leaderboard.findOne({
    privateKey: key
  }, result => {
    return { type: 'private', data: privateRequest }
  });

  const publicRequest = leaderboard.findOne({
    publicKey: key
  }, result => {
    return { type: 'public', data: publicRequest }
  });

  return null;
};

module.exports = router;
