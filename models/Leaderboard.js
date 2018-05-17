const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = require('./User');

const stringRequired = {
  type: String,
  required: true
};

const leaderboardSchema = new Schema({
  gameName: stringRequired,
  ownerName: stringRequired,
  email: stringRequired,
  dateCreated: {
    type: Date,
    default: Date.now()
  },
  data: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  publicKey: stringRequired,
  privateKey: stringRequired
});

const Leaderboard = mongoose.model('leaderboards', leaderboardSchema);

module.exports = Leaderboard;
