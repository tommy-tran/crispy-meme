import { combineReducers } from 'redux';
import leaderboardReducer from './leaderboard';

const rootReducer = combineReducers({
  leaderboard: leaderboardReducer
});

export default rootReducer;
