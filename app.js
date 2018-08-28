const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config/config');
const cors = require('cors');

/**
 * Load models
 */
const Leaderboard = require('./models/Leaderboard');
mongoose.connect(config.mongoURI);
mongoose.Promise = global.Promise;

if (process.env.NODE_ENV === 'production') {
  const path = require('path');
  app.use(express.static(path.resolve(__dirname, './client/build')));
}

/**
 * Load routes
 */
const leaderboardRoutes = require('./routes/leaderboard');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use('/lb', leaderboardRoutes);

if (process.env.NODE_ENV === 'production') {
  const path = require('path');
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
