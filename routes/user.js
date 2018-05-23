const mongoose = require('mongoose');
const express = require('express');
const Leaderboard = require('../models/Leaderboard');
const User = require('../models/User');
const router = express.Router({ mergeParams: true });

// Using private or public key to fetch user
router.get('/:user', (req, res) => {
  Leaderboard.findOne({
    $or: [{ privateKey: req.params.key }, { publicKey: req.params.key }]
  })
    .select('_id')
    .exec((err, leaderboard) => {
      User.findOne(
        {
          username: req.params.user,
          leaderboardID: leaderboard._id
        },
        (err, user) => {
          if (err) return res.status(500).send(err);

          if (user) {
            return res.send(user);
          } else {
            return res.status(404).send('Unable to find user');
          }
          res.send(user);
        }
      );
    });
});

// Using private key to delete user score from leaderboard if valid
router.delete('/:user', (req, res) => {
  const lbQuery = Leaderboard.findOne({
    privateKey: req.params.key
  })
    .select('data')
    .exec((err, leaderboard) => {
      if (leaderboard) {
        User.findOneAndRemove(
          {
            $or: [
              {
                username: req.params.user
              },
              {
                _id: req.params.user
              }
            ]
          },
          (err, deletedUser) => {
            if (deletedUser) {
              // leaderboard.data.filter(user => {
              //   return !(user === deletedUser._id);
              // });
              return res.send('Successfully deleted user');
            } else {
              return res.status(404).send('Unable to delete specified user');
            }
          }
        );
      } else {
        return res
          .status(401)
          .send(
            'Not authorized to delete user (requires private key of leaderboard)'
          );
      }
    });
});

const postUserScore = (res, key, username, score) => {
  if (!key || !username || !score || typeof score != 'number' || username.length < 1 || key.length !== 21) {
    return res.status(400).send('Invalid parameters');
  }

  const lbQuery = Leaderboard.findOne({
    privateKey: key
  })
    .select('data _id')
    .exec((err, leaderboard) => {
      if (err || !leaderboard)
        return res.status(404).send('Unable unable to access leaderboard');

      User.findOne(
        {
          username: username
        },
        (err, user) => {
          let newUser = false;
          if (err) return res.status(400).send(err);

          if (user) {
            // User exists
            if (user.score < score) {
              user.score = score;
            } else {
              return res.send(user);
            }
          } else {
            // User doesn't exist, create them
            newUser = true;
            user = new User({
              _id: new mongoose.Types.ObjectId(),
              username: username,
              score: score,
              leaderboardID: leaderboard._id
            });
          }

          user.save().then(user => {
            // Add reference to leaderboard on new user
            if (newUser) {
              leaderboard.data.push(user._id);
              leaderboard.save();
              return res.send(user);
            }

            return res.send(user);
          });
        }
      );
    });
};

// Check for private key and post/update score
router.post('/:user/:score', (req, res) => {
  const key = req.body.key || req.params.key;
  const username = req.body.username || req.params.username;
  const score = req.body.score || req.params.score;
  postUserScore(res, key, username, score);
});

router.post('/', (req, res) => {
  const key = req.body.key;
  const username = req.body.username;
  const score = req.body.score;
  postUserScore(res, key, username, score);
});

module.exports = router;
