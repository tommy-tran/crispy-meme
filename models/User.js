const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = {
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
};

mongoose.model('users', userSchema);

module.exports = userSchema;