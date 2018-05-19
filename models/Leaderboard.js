const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stringRequired = {
  type: String,
  required: true
};

const validateEmail = (email) => {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email)
};

const leaderboardSchema = new Schema({
  gameName: {
    type: String,
    required: true,
    unique: true
  },
  ownerName: stringRequired,
  email: {
    type: String,
    trim: true,
    lowercase: true,
    required: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  dateCreated: {
    type: Date,
    default: Date.now()
  },
  data: [
    {
      type: Schema.Types.ObjectId,
      ref: 'user'
    }
  ],
  publicKey: stringRequired,
  privateKey: stringRequired
});

const Leaderboard = mongoose.model('leaderboard', leaderboardSchema);

module.exports = Leaderboard;
