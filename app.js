const express = require('express');
const mongoose = require('mongoose');

/**
 * Load models
 */
const Leaderboard = require('./models/Leaderboard');
mongoose.connect('mongodb://localhost/crispy-meme');

/**
 * Load routes
 */
const requestRoutes = require('./routes/request');

const app = express();
app.use('/lb', requestRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
