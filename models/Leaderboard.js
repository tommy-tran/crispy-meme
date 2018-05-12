const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = require('./Users');

const leaderboardSchema = new Schema({
  gameName: {
    type: String,
    required: true
  },
  owner: {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    }
  },
  dateCreated: {
    type: Date,
    required: true
  },
  data: [userSchema],
  publicKey: {
    type: String,
    required: true,
  },
  privateKey: {
    type: String,
    required: true
  }
});

mongoose.model('leaderboards', leaderboardSchema);

export default leaderboardSchema;
