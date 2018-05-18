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
            username: req.params.user
          },
          (err, deletedUser) => {
            if (deletedUser) {
              leaderboard.data.filter(user => {
                return !(user === deletedUser._id);
              });

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

// Check for private key and post/update score
router.post('/:user/:score', (req, res) => {
  const lbQuery = Leaderboard.findOne({
    privateKey: req.params.key
  })
    .select('data _id')
    .exec((err, leaderboard) => {
      if (err || !leaderboard)
        return res.status(404).send('Unable unable to access leaderboard');

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
              return res.status(200).send(user);
            }
          } else {
            // User doesn't exist, create them
            newUser = true;
            user = new User({
              _id: new mongoose.Types.ObjectId(),
              username: req.params.user,
              score: req.params.score,
              leaderboardID: leaderboard._id
            });
          }

          user.save().then(user => {
            // Add reference to leaderboard on new user
            if (newUser) {
              if (err) res.status(500).send('Error creating user');
              leaderboard.data.push(user._id);
              leaderboard.save();
              return res.send(user);
            }

            return res.send(user);
          });
        }
      );
    });
});

module.exports = router;
