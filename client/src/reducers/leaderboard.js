import {
  CREATE_LEADERBOARD,
  DELETE_LEADERBOARD,
  FETCH_LEADERBOARD,
  LEADERBOARD_ERROR
} from '../actions/types';

let initialState = {};

export default (state = null, action) => {
  switch (action.type) {
    case CREATE_LEADERBOARD:
      return {
        ...state,
        currentLeaderboard: action.payload
      };
    case DELETE_LEADERBOARD:
      return {
        ...state,
        currentLeaderboard: null
      };
    case FETCH_LEADERBOARD:
      return {
        ...state,
        currentLeaderboard: action.payload
      };
    case LEADERBOARD_ERROR:
      return {};
  }
};
