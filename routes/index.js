const mongoose = require('mongoose');
const express = require('express');
const Leaderboard = mongoose.model('leaderboards');
const router = express.Router();
const generateKeys = require('../helpers/generateKeys');

router.get('/', (req, res, next) => {
  res.send('root');
});

router.post('/create', (req, res) => {
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
    .then(res.send('Successfully created leaderboard'))
    .catch(err => {
      console.log(err);
      throw new Error('Failed to create leaderboard!');
    });
});

module.exports = router;