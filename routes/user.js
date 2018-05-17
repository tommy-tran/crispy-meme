const mongoose = require('mongoose');
const express = require('express');
const Leaderboard = require('../models/Leaderboard');
const User = require('../models/User');
const router = express.Router({ mergeParams: true });
const {
  validatePublicKey,
  validatePrivateKey
} = require('../helpers/validateKey');

router.get('/:user', (req, res) => {
  User.findOne(
    {
      username: req.params.user
    },
    (err, user) => {
      if (err) return res.status(500).send(err);

      if (user) {
        return res.send(user);
      } else {
        return res.status(404).send('Unable to find user');
      }
      res.send(user)
    }
  );
});

router.delete('/:user', (req, res) => {
  // Check for private key and delete user score from leaderboard if valid
});

router.post('/:user/:score', (req, res) => {
  // Private key necessary for posting/updating score
  const lbQuery = Leaderboard.findOne({
    privateKey: req.params.key
  }).select('data');

  User.findOne(
    {
      username: req.params.user
    },
    (err, user) => {
      let newUser = false;

      if (err) console.log(err);
      if (user) {
        // User exists
        if (user.score < req.params.score) {
          user.score = req.params.score;
        } else {
          return res.status(200).send("User's score is lower than old score");
        }
      } else {
        // User doesn't exist, create them
        newUser = true;
        user = new User({
          _id: new mongoose.Types.ObjectId(),
          username: req.params.user,
          score: req.params.score
        });
      }

      user.save().then(user => {
        // Add reference to leaderboard on new user
        if (newUser) {
          lbQuery.exec((err, leaderboard) => {
            if (err) res.status(500).send('Error');
            if (leaderboard) {
              if (newUser) {
                leaderboard.data.push(mongoose.Types.ObjectId(user._id));
                leaderboard.save();
              }
              return res.send(leaderboard);
            }
            res.status(500).send('Leaderboard not found');
          });
        }
      });
    }
  );
});

module.exports = router;
