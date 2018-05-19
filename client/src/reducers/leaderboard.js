import {
  CREATE_LEADERBOARD,
  DELETE_LEADERBOARD,
  FETCH_LEADERBOARD,
  LEADERBOARD_ERROR,
  CLEAR_LEADERBOARD
} from '../actions/types';

let initialState = {};

export default (state = null, action) => {
  switch (action.type) {
    case CREATE_LEADERBOARD:
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
      return state
  }
};
