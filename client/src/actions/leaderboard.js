import axios from 'axios';
import {
  CREATE_LEADERBOARD,
  DELETE_LEADERBOARD,
  CLEAR_LEADERBOARD,
  FETCH_LEADERBOARD,
  LEADERBOARD_ERROR
} from './types';

export const fetchLeaderboard = key => async dispatch => {
  const request = axios.get(`/${key}/info`);

  if (request.status === 200) {
    return {
      type: FETCH_LEADERBOARD,
      payload: response.data
    };
  } else {
    const errorType = 'fetch leaderboard';
    dispatch(leaderboardError(errorType));
  }
};

export const createLeaderboard = (
  gameName,
  ownerName,
  email
) => async dispatch => {
  const response = await axios.post('/create', {
    gameName,
    ownerName,
    email
  });

  if (response.status === 200) {
    return {
      type: CREATE_LEADERBOARD,
      payload: response.data
    };
  } else {
    const errorType = 'creating leaderboard';
    dispatch(leaderboardError(errorType));
  }
};

export const deleteLeaderboard = key => async dispatch => {
  const response = await axios.delete(`/${key}`);

  if (response.status === 200) {
    return {
      type: DELETE_LEADERBOARD
    };
  } else {
    const errorType = 'deleting leaderboard';
    dispatch(leaderboardError(errorType));
  }
};

export const leaderboardError = error => () => ({
  type: LEADERBOARD_ERROR,
  error: error
});