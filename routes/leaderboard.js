const mongoose = require('mongoose');
const express = require('express');
const Leaderboard = require('../models/Leaderboard');
const router = express.Router({ mergeParams: true });
const generateKeys = require('../helpers/generateKeys');
const userRoute = require('./user');

router.use('/user', userRoute);
router.use('/:key/user', userRoute);

// Create Leaderboard
router.post('/', (req, res) => {
  const gameName = req.body.gameName || req.query.gameName;
  const ownerName = req.body.ownerName || req.query.ownerName;
  const email = req.body.email || req.query.email;

  const keys = generateKeys();

  new Leaderboard({
    gameName,
    ownerName,
    email,
    privateKey: keys.privateKey,
    publicKey: keys.publicKey
  })
    .save()
    .then(lb => {
      const newLB = {
        gameName: lb.gameName,
        ownerName: lb.ownerName,
        email: lb.email,
        privateKey: lb.privateKey,
        publicKey: lb.publicKey,
        data: lb.data,
        dateCreated: lb.dateCreated,
        id: lb._id,
        admin: true
      };
      res.send(newLB);
    })
    .catch(err => {
      if (err) {
        return res.status(400).send({
          status: 400,
          message: err
        });
      }
      res.status(400).send('Failed to create leaderboard.');
    });
});

/**
 * Get all users from leaderboard
 * Query options:
 * limit - limits number of returned users, default 50
 * order - determines how users sorted and returned, either des(descending) or asc(ascending)
 */
router.get('/:key', (req, res) => {
  const limit = req.query.limit || 50;
  const order = req.query.order || 'des';
  const key = req.params.key;

  if (key.length !== 20) {
    return res.status(400).send('Invalid key');
  }

  Leaderboard.findOne({
    $or: [{ privateKey: key }, { publicKey: key }]
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
              score: user.score,
              _id: user._id
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

// Shows information about leaderboard, requires private key
router.get('/:key/info', (req, res) => {
  const key = req.params.key;

  Leaderboard.findOne({ privateKey: key }, (err, lb) => {
    if (err) res.status(500).send('Error fetching leaderboard information');
    if (lb) {
      res.send({
        dateCreated: lb.dateCreated,
        gameName: lb.gameName,
        ownerName: lb.ownerName,
        email: lb.email,
        publicKey: lb.publicKey,
        admin: true,
        privateKey: lb.privateKey
      });
    } else {
      Leaderboard.findOne({ publicKey: key }, (err, lb) => {
        if (err) res.status(500).send('Error fetching leaderboard information');
        if (lb) {
          res.send({
            dateCreated: lb.dateCreated,
            gameName: lb.gameName,
            ownerName: lb.ownerName,
            publicKey: lb.publicKey,
            admin: false
          });
        } else {
          res.status(404).send('No leaderboard found');
        }
      });
    }
  });
});

// Clears leaderboard, requires private key
router.put('/:key', (req, res) => {
  Leaderboard.findOneAndUpdate(
    {
      privateKey: req.params.key
    },
    { data: [] },
    (err, old) => {
      if (old) {
        res.send('Leaderboard successfully cleared.');
      } else {
        res.status(404).send('Unable to clear leaderboard');
      }
    }
  );
});

router.delete('/:key', (req, res) => {
  Leaderboard.findOneAndRemove({
    privateKey: req.params.key
  })
    .then(lb => {
      if (!docs) {
        res.status(404).send('Unable to delete specified leaderboard.');
      }
      res.send('Your leaderboard has been deleted.');
    })
    .catch(err => {
      res.send('Error performing delete request.');
    });
});

module.exports = router;
