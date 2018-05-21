const mongoose = require('mongoose');
const express = require('express');
const Leaderboard = require('../models/Leaderboard');
const router = express.Router({ mergeParams: true });
const generateKeys = require('../helpers/generateKeys');
const userRoute = require('./user');

router.get('/create', (req, res) => {
  const gameName = req.query.gameName;
  const ownerName = req.query.ownerName;
  const email = req.query.email;
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
      res.send(lb);
    })
    .catch(err => {
      if (err) {
        return res.status(400).send({
          status: 400,
          message: 'Invalid parameters'
        });
      }
      res.status(400).send('Failed to create leaderboard.');
    });
});

router.post('/create', (req, res) => {
  const gameName = req.body.gameName;
  const ownerName = req.body.ownerName;
  const email = req.body.email;
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
      res.send(lb);
    })
    .catch(err => {
      if (err) {
        return res.status(400).send({
          status: 400,
          message: 'Invalid parameters'
        });
      }
      res.status(400).send('Failed to create leaderboard.');
    });
});

router.use('/:key/user', userRoute);
/**
 * Get all users from leaderboard
 * Query options:
 * limit - limits number of returned users, default 50
 * order - determines how users sorted and returned, either des(descending) or asc(ascending)
 */
router.get('/:key', (req, res) => {
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

// Shows information about leaderboard, requires private key
router.get('/:key/info', (req, res) => {
  Leaderboard.findOne({ privateKey: req.params.key }, (err, lb) => {
    if (err) res.status(500).send('Error fetching leaderboard information');
    if (lb) {
      res.send({
        dateCreated: lb.dateCreated,
        gameName: lb.gameName,
        ownerName: lb.ownerName,
        email: lb.email,
        publicKey: lb.publicKey
      });
    } else {
      Leaderboard.findOne({ publicKey: req.params.key }, (err, lb) => {
        if (err) res.status(500).send('Error fetching leaderboard information');
        if (lb) {
          res.send({
            dateCreated: lb.dateCreated,
            gameName: lb.gameName,
            ownerName: lb.ownerName,
            publicKey: lb.publicKey
          });
        } else {
          res.status(404).send('No leaderboard found');
        }
      });
    }
  });
});

// Clears leaderboard, requires private key
router.get('/:key/clear', (req, res) => {
  // Check if private key and clear leaderboard
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
      console.log(err);
      res.send('Error performing delete request.');
    });
});

module.exports = router;
