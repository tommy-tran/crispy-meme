import {
  CREATE_LEADERBOARD,
  DELETE_LEADERBOARD,
  FETCH_LEADERBOARD,
  LEADERBOARD_ERROR,
  CLEAR_LEADERBOARD
} from '../actions/types';

let initialState = { error: null };

const leaderboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_LEADERBOARD:
      return {
        ...state,
        error: null,
        currentLeaderboard: action.payload
      };
    case FETCH_LEADERBOARD:
      return {
        ...state,
        error: null,
        currentLeaderboard: action.payload
      };
    case CLEAR_LEADERBOARD:
      return {
        ...state,
        error: null,
        currentLeaderboard: { ...state.currentLeaderboard, data: [] }
      };
    case DELETE_LEADERBOARD:
      return {
        ...state,
        error: null,
        currentLeaderboard: null
      };
    case LEADERBOARD_ERROR:
      return {
        ...state,
        error: action.error
      };
    default:
      return state;
  }
};

export default leaderboardReducer;
