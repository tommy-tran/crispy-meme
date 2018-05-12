const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = require('./User');

const stringRequired = {
  type: String,
  required: true
}

const leaderboardSchema = new Schema({
  gameName: stringRequired,
  ownerName: stringRequired,
  email: stringRequired,
  dateCreated: {
    type: Date,
    default: Date.now()
  },
  data: [userSchema],
  publicKey: stringRequired,
  privateKey: stringRequired
});

mongoose.model('leaderboards', leaderboardSchema);
