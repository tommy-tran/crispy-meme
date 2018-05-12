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

app.use('/:key', requestRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
