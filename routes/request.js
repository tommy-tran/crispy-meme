const mongoose = require('mongoose');
const express = require('express');
const Leaderboard = require('../models/Leaderboard');
const router = express.Router({ mergeParams: true });
const userRoute = require('./user');

router.use('/user', userRoute);

/**
 * Get all users from leaderboard
 * Query options:
 * limit - limits number of returned users, default 50
 * order - determines how users sorted and returned, either des(descending) or asc(ascending)
 */
router.get('/', (req, res) => {
  const limit = req.query.limit || 50;
  const order = req.query.order || 'des';

  Leaderboard.findOne({
    $or: [{ privateKey: req.params.key }, { publicKey: req.params.key }]
  })
    .select('data')
    .populate('data')
    .exec((err, leaderboard) => {
      if (err || !leaderboard)
        return res.status(404).send('Unable to find leaderboard.');

      res.send(
        leaderboard.data
          .map(user => {
            return {
              username: user.username,
              date: user.date,
              score: user.score
            };
          })
          .sort((a, b) => {
            if (a.score > b.score) {
              if (order === 'asc') return 1;
              else if (order === 'des') return -1;
            } else if (a.score < b.score) {
              if (order === 'asc') return -1;
              else if (order === 'des') return 1;
            }
            return 0;
          })
          .slice(0, limit)
      );
    });
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
        throw new Error('Error deleting leaderboard');
      }
      res.send('Your leaderboard has been deleted.');
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
