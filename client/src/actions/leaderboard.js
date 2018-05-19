import axios from 'axios';
import {
  CREATE_LEADERBOARD,
  DELETE_LEADERBOARD,
  CLEAR_LEADERBOARD,
  FETCH_LEADERBOARD,
  LEADERBOARD_ERROR
} from './types';

export const fetchLeaderboard = key => async dispatch => {
  const requestLeaderboardInfo = await axios.get(`/lb/${key}/info`).catch(err => {
    return dispatch(leaderboardError('fetching leaderboard'))
  });
  const requestUsers = await axios.get(`/lb/${key}`).catch(err => {
    return dispatch(leaderboardError('fetching leaderboard'))
  });
  if (requestLeaderboardInfo.status === 200 && requestUsers.status === 200) {
    const result = {
      ...requestLeaderboardInfo.data,
      data: requestUsers.data
    };

    dispatch({
      type: FETCH_LEADERBOARD,
      payload: result
    });
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
  }).catch(err => {
    return dispatch(leaderboardError('creating leaderboard'))
  });;

  if (response.status === 200) {
    dispatch({
      type: CREATE_LEADERBOARD,
      payload: response.data
    });
  }
};

export const deleteLeaderboard = key => async dispatch => {
  const response = await axios.delete(`/lb/${key}`).catch(err => {
    return dispatch(leaderboardError('deleting leaderboard'))
  });;

  if (response.status === 200) {
    dispatch({
      type: DELETE_LEADERBOARD
    });
  }
};

export const clearLeaderboard = key => async dispatch => {
  const response = axios.get(`/lb/${key}/clear`).catch(err => {
    return dispatch(leaderboardError('clearing leaderboard'))
  });

  if (response.status === 200) {
    dispatch({
      type: CLEAR_LEADERBOARD
    });
  }
};

export const leaderboardError = error => dispatch =>
  dispatch({
    type: LEADERBOARD_ERROR,
    error: error
  });
