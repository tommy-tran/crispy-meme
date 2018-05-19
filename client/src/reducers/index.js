import { combineReducers } from 'redux';
import authReducer from './auth';
import leaderboardReducer from './leaderboard';

const rootReducer = combineReducers({
  // authReducer,
  leaderboard: leaderboardReducer
});

export default rootReducer;
