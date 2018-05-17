const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now()
  },
  score: {
    type: Number,
    required: true
  },
  leaderboardID: {
    type: String,
    required: true
  }
});

const User = mongoose.model('user', userSchema);

module.exports = User;
