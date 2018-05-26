import axios from 'axios';
import { DELETE_USER, ADD_USER } from './types';
import { leaderboardError, removeError } from './error';

export const deleteUser = (key, userID) => async dispatch => {
  const response = await axios
    .delete(`/lb/${key}/user/${userID}`)
    .catch(err => {
      return dispatch(leaderboardError(err));
    });

  if (response && response.status === 200) {
    dispatch({
      type: DELETE_USER,
      _id: userID
    });
  }
};

export const addUser = (key, username, score) => async dispatch => {
  if (!username || !score || score <= 0) {
    return dispatch(
      leaderboardError({
        status: 400,
        customMessage: 'Please enter valid parameters!'
      })
    );
  }

  const response = await axios
    .post('/lb/user', {
      key,
      username,
      score
    })
    .catch(err => {
      return dispatch(leaderboardError(err));
    });

  if (response && response.status === 200) {
    dispatch({
      type: ADD_USER,
      user: response.data
    });
  }
};
