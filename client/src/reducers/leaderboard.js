import {
  CREATE_LEADERBOARD,
  DELETE_LEADERBOARD,
  FETCH_LEADERBOARD,
  LEADERBOARD_ERROR,
  CLEAR_LEADERBOARD,
  UNSET_LEADERBOARD,
  LOADING_LEADERBOARD,
  REDIRECTED_LEADERBOARD,
  DELETE_USER
} from '../actions/types';

let initialState = { error: null };

const leaderboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_LEADERBOARD:
      return {
        ...state,
        error: null,
        loading: false,
        redirectToDashboard: true,
        currentLeaderboard: action.payload
      };
    case FETCH_LEADERBOARD:
      return {
        ...state,
        error: null,
        loading: false,
        redirectToDashboard: true,
        currentLeaderboard: action.payload
      };
    case CLEAR_LEADERBOARD:
      return {
        ...state,
        error: null,
        loading: false,
        currentLeaderboard: { ...state.currentLeaderboard, data: [] }
      };
    case DELETE_LEADERBOARD:
      return {
        ...state,
        error: null,
        loading: false,
        currentLeaderboard: null
      };
    case UNSET_LEADERBOARD:
      return {
        ...state,
        error: null,
        currentLeaderboard: null
      };
    case LEADERBOARD_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case LOADING_LEADERBOARD:
      return {
        ...state,
        loading: true
      };
    case REDIRECTED_LEADERBOARD:
      return {
        ...state,
        redirectToDashboard: false
      };
    case DELETE_USER:
      return {
        ...state,
        currentLeaderboard: {
          ...state.currentLeaderboard,
          data: state.currentLeaderboard.data.filter(user => {
            return user.id !== action.userID;
          })
        }
      };
    default:
      return state;
  }
};

export default leaderboardReducer;
