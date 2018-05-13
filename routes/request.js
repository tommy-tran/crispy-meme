const mongoose = require('mongoose');
const express = require('express');
const leaderboard = mongoose.model('leaderboards');
const router = express.Router({ mergeParams: true });
const getRequestType = require('../helpers/getRequestType');
const userRoute = require('./user');

/**
 * Determines if request is by private key, public key, or invalid
 */
router.all('/*', (req, res, next) => {
  const type = getRequestType(req.key);
  if (type) {
    req.requestType = type;
    next();
  } else {
    // Invalid request
    res.end();
  }
});

router.use('/user', userRoute);

/**
 * Leaderboard request
 */
router.get('/', (req, res) => {
  /**
   * Get leaderboard, allow options like ascending and descending order, limiter
   * Must be sorted, allow retrieval of JSON and XML(?)
   */
});

/**
 * Private routes
 */
router.delete('/', (req, res) => {
  // Check for private key and delete leaderboard if valid
});

router.get('/publickey', (req, res) => {
  // Check if private key and return public key
});

router.get('/clear', (req, res) => {
  // Check if private key and clear leaderboard
});

router.get('/info', (req, res) => {
  // Check if private key and show database information
});

module.exports = router;
