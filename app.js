const express = require('express');
const mongoose = require('mongoose');

/**
 * Load models
 */
require('./models/Leaderboard');
const leaderboard = mongoose.model('leaderboards');

/**
 * Load routes
 */
const requestRoute = require('./routes/request');

const app = express();
app.get('/', (req, res, next) => {
  res.send('root');
});

app.post('/create', (req, res) => {});

app.use('/lb/:key', requestRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

const generateKeys = () => {
  const privateKey = Math.random()
    .toString(36)
    .replace('0.', '');
  const publicKey = Math.random()
    .toString(36)
    .replace('0.', '');

  // To handle unlikely case of both private and public keys being the same
  if (privateKey === publicKey) {
    return generateKeys();
  }

  // Find if the generated keys currently exist in the databse
  leaderboard
    .find({
      $or: [{ privateKey }, { publicKey }]
    })
    .then(() => {
      // Found leaderboard with generated key
      return generateKeys();
    });

  return {
    privateKey,
    publicKey
  };
};
