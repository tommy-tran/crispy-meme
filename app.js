const express = require('express');
const mongoose = require('mongoose');

/**
 * Load models
 */
require('./models/Leaderboard');
const Leaderboard = mongoose.model('leaderboards');
mongoose.connect('mongodb://localhost/crispy-meme');
/**
 * Load routes
 */
const index = require('./routes/index');
const requestRoute = require('./routes/request');

const app = express();
app.use('/', index);
app.use('/lb/:key', requestRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
