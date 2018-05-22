import {
  CREATE_LEADERBOARD,
  DELETE_LEADERBOARD,
  FETCH_LEADERBOARD,
  LEADERBOARD_ERROR,
  CLEAR_LEADERBOARD,
  UNSET_LEADERBOARD,
  LOADING_LEADERBOARD,
  REDIRECTED_LEADERBOARD,
  ADD_USER,
  DELETE_USER,
  REMOVE_ERROR
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
        error: {
          status: action.error.response.status,
          message: action.error.response.statusText
        }
      };
    case REMOVE_ERROR:
      return {
        ...state,
        loading: false,
        error: null
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
            return user._id !== action._id;
          })
        }
      };
    case ADD_USER:
      let found = false;
      const updatedUser = action.user;

      let newData = state.currentLeaderboard.data.map(user => {
        if (user.username === updatedUser.username) {
          found = true;
          return updatedUser;
        } else {
          return user;
        }
      });

      if (!found) {
        newData = [...newData, updatedUser];
      }

      newData.sort((a, b) => {
        if (a.score < b.score) {
          return 1;
        } else if (a.score > b.score) {
          return -1;
        } else {
          return 0;
        }
      });

      return {
        ...state,
        currentLeaderboard: {
          ...state.currentLeaderboard,
          data: newData
        }
      };
    default:
      return state;
  }
};

export default leaderboardReducer;
