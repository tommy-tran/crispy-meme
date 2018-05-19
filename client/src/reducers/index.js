import { combineReducers } from 'redux';
import auth from './auth';
import leaderboard from './leaderboard';

const rootReducer = combineReducers({
  auth,
  leaderboard
});