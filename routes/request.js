const mongoose = require('mongoose');
const express = require('express');
const leaderboard = mongoose.model('leaderboards');
const router = express.Router({ mergeParams: true });
const userRoute = require('./user');

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
router.get('/info', (req, res) => {
  // Check if private key and show database information
  leaderboard.findOne({ privateKey: req.params.key }, (err, lb) => {
    console.log(err);
    console.log(lb);
    res.send('lb');
  });
});

router.delete('/', (req, res) => {
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
  leaderboard.findOne(
    {
      privateKey: req.params.key
    },
    (err, lb) => {
      if (err) {
        res.send('Error attemping to fetch public key');
        res.end();
      }

      if (lb) {
        res.send(`Your public key is: ${lb.publicKey}`);
      } else {
        res.send('Invalid leaderboard, please check your key again!');
      }
    }
  );
});

router.get('/clear', (req, res) => {
  if (req.requestType === 'public') {
    res.send('Unauthorized clear request');
  }

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

module.exports = router;
