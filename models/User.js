const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  score: {
    type: Number,
    required: () => this.score || this.time
  },
  time: {
    type: String,
    required: () => this.score || this.time
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
