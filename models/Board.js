const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const leaderboardSchema = new Schema({
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
  data: [
    {
      // User: UserModel
      position: {
        type: Number,
        required: true
      },
      date: {
        type: Date,
        required: true
      }
    }
  ],
  publicKey: {
    type: String,
    required: true,
  },
  privateKey: {
    type: String,
    required: true
  }
});
