const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/leaderboard_test');

mongoose.connection
  .once('open', () => {
    'Mongoose connected to test db';
  })
  .on('error', err => {
    console.warn('WARNING', err);
  });

beforeEach(done => {
  mongoose.connection.collections.leaderboards.drop(() => {
    console.log('done');
    done();
  });
});
