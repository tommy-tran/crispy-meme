const mongoose = require('mongoose');
const express = require('express');
const Leaderboard = mongoose.model('leaderboards');
const router = express.Router({ mergeParams: true });
const userRoute = require('./user');

router.use('/user', userRoute);

/**
 * Leaderboard request
 */
router.get('/', (req, res) => {
  let query = {};

  const limit = req.query.limit || 100;

  Leaderboard.findOne({
    $or: [{ privateKey: req.param.key }, { publicKey: req.param.key }]
  }).select('data').limit(limit).sort({});
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
  Leaderboard.findOne({ privateKey: req.params.key }, (err, lb) => {
    res.send(lb);
  });
});

router.delete('/', (req, res) => {
  Leaderboard.findOneAndRemove({
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
  Leaderboard.findOne(
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
  Leaderboard.findOneAndUpdate(
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
