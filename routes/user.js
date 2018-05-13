const mongoose = require('mongoose');
const express = require('express');
const leaderboard = mongoose.model('leaderboards');
const router = express.Router({ mergeParams: true });

router.get('/:user', (req, res) => {
  // Return user data (more data if private key?)
});

router.delete('/:user', (req, res) => {
  // Check for private key and delete user score from leaderboard if valid
});

router.post('/:user/:points', (req, res) => {
  // Check for private key and set new score/time if valid
});

router.put('/:user/:points', (req, res) => {
  // Check for private key and set new score/time if valid
});


module.exports = router;