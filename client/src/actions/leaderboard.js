import axios from 'axios';
import {
  CREATE_LEADERBOARD,
  DELETE_LEADERBOARD,
  CLEAR_LEADERBOARD,
  FETCH_LEADERBOARD,
  LEADERBOARD_ERROR,
} from './types';

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
    }
  } else {
    return {
      type: LEADERBOARD_ERROR,
      error: 'creating leaderboard'
    }
  }
};

export const deleteLeaderboard = key => async () => {
  const response = await axios.delete(`/${key}`);

  if (response.status === 200) {
    return {
      type: DELETE_LEADERBOARD
    }
  } else {
    return {
      type: LEADERBOARD_ERROR,
      error: 'deleting leaderboard'
    }
  }
};
