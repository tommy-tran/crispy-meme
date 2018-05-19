import { combineReducers } from 'redux';
import authReducer from './auth';
import leaderboardReducer from './leaderboard';

const rootReducer = combineReducers({
  // authReducer,
  leaderboardReducer
});

export default rootReducer;
