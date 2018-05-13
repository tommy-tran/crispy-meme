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
  leaderboard
    .findOneAndRemove({
      privateKey: req.params.key
    })
    .then(lb => {
      if (!docs) {
        res.statusCode = '500';
        throw new Error('Error deleting leaderboard');
      }
      res.send('Your leaderboard has been deleted.' + docs);
    })
    .catch(err => {
      console.log(err);
      res.send('Error performing delete request.');
    });
});

router.get('/publickey', (req, res) => {
  // Check if private key and return public key
  leaderboard.findOne(
    {
      privateKey: req.params.key
    },
    (err, lb) => {
      res.send(`Your public key is: ${lb.publicKey}`);
    }
  );
});

router.get('/clear', (req, res) => {
  // Check if private key and clear leaderboard
  leaderboard.findOneAndUpdate(
    {
      privateKey: req.params.key
    },
    { data: [] },
    (err, old) => {
      res.send(old);
    }
  );
});

router.get('/info', (req, res) => {
  // Check if private key and show database information
});

module.exports = router;
