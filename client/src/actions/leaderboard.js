import axios from 'axios';
import {
  CREATE_LEADERBOARD,
  DELETE_LEADERBOARD,
  CLEAR_LEADERBOARD,
  FETCH_LEADERBOARD,
  LEADERBOARD_ERROR
} from './types';

export const fetchLeaderboard = key => async dispatch => {
  const requestLeaderboardInfo = await axios.get(`/${key}/info`);
  const requestUsers = await axios.get(`/${key}`);

  if (requestLeaderboardInfo.status === 200 && requestUsers === 200) {
    const result = {
      ...requestLeaderboardInfo.data,
      data: requestUsers.data
    };

    return {
      type: FETCH_LEADERBOARD,
      payload: result
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

export const clearLeaderboard = key => async dispatch => {
  const response = axios.get(`${key}/clear`);

  if (response.status === 200) {
    return {
      type: CLEAR_LEADERBOARD
    };
  } else {
    const errorType = 'clearing leaderboard';
    dispatch(leaderboardError(errorType));
  }
};

export const leaderboardError = error => () => ({
  type: LEADERBOARD_ERROR,
  error: error
});
