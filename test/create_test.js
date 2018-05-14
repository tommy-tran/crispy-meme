const assert = require('assert');
const Leaderboard = require('../models/Leaderboard');
const generateKeys = require('../helpers/generateKeys');

describe('Creating a new database', () => {
  it('saves a new database', done => {
    const gameName = 'testName';
    const ownerName = 'testOwner';
    const email = 'testEmail';
    const keys = generateKeys();

    new Leaderboard({
      gameName,
      ownerName,
      email,
      privateKey: keys.privateKey,
      publicKey: keys.publicKey
    })
      .save()
      .then(lb => {
        assert(lb);
        done();
      })
      .catch(err => {
        throw new Error(err);
      });
  });
});
