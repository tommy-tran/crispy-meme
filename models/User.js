const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = {
  username: {
    type: String,
    required: true   
  },
  position: {
    type: Number,
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
}

module.exports = userSchema;