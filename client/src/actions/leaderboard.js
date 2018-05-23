import axios from 'axios';
import {
  CREATE_LEADERBOARD,
  DELETE_LEADERBOARD,
  CLEAR_LEADERBOARD,
  FETCH_LEADERBOARD,
  LEADERBOARD_ERROR,
  UNSET_LEADERBOARD,
  LOADING_LEADERBOARD,
  REDIRECTED_LEADERBOARD,
  DELETE_USER,
  ADD_USER,
  REMOVE_ERROR
} from './types';

export const fetchLeaderboard = key => async dispatch => {
  if (!key) {
    dispatch(
      leaderboardError({
        status: 400,
        message: 'Invalid leaderboard key'
      })
    );
  }

  dispatch(loadingLeaderboard);

  const requestLeaderboardInfo = await axios
    .get(`/lb/${key}/info`)
    .catch(err => {
      return dispatch(leaderboardError(err));
    });
  const requestUsers = await axios.get(`/lb/${key}`).catch(err => {
    return dispatch(leaderboardError(err));
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

    dispatch(redirectedLeaderboard);
  }
};

export const createLeaderboard = (
  gameName,
  ownerName,
  email
) => async dispatch => {
  dispatch(loadingLeaderboard);
  const response = await axios
    .post('lb/', {
      gameName,
      ownerName,
      email
    })
    .catch(err => {
      return dispatch(leaderboardError(err));
    });

  if (response.status === 200) {
    dispatch({
      type: CREATE_LEADERBOARD,
      payload: response.data
    });

    dispatch(redirectedLeaderboard);
  }
};

export const deleteLeaderboard = key => async dispatch => {
  dispatch(loadingLeaderboard);
  const response = await axios.delete(`/lb/${key}`).catch(err => {
    return dispatch(leaderboardError(err));
  });

  if (response.status === 200) {
    dispatch({
      type: DELETE_LEADERBOARD
    });
  }
};

export const clearLeaderboard = key => async dispatch => {
  dispatch(loadingLeaderboard);
  const response = axios.get(`/lb/${key}/clear`).catch(err => {
    return dispatch(leaderboardError(err));
  });

  if (response.status === 200) {
    dispatch({
      type: CLEAR_LEADERBOARD
    });
  }
};

export const unsetLeaderboard = dispatch => {
  dispatch(redirectedLeaderboard);
  dispatch({
    type: UNSET_LEADERBOARD
  });
};

export const leaderboardError = error => dispatch =>
  dispatch({
    type: LEADERBOARD_ERROR,
    error: error
  });

export const loadingLeaderboard = dispatch => {
  dispatch({
    type: LOADING_LEADERBOARD
  });
};

export const redirectedLeaderboard = dispatch => {
  dispatch({
    type: REDIRECTED_LEADERBOARD
  });
};

export const deleteUser = (key, userID) => async dispatch => {
  const response = await axios
    .delete(`/lb/${key}/user/${userID}`)
    .catch(err => {
      return dispatch(leaderboardError(err));
    });

  if (response.status === 200) {
    dispatch({
      type: DELETE_USER,
      _id: userID
    });
  }
};

export const addUser = (key, username, score) => async dispatch => {
  const response = await axios
    .post('/lb/user', {
      key,
      username,
      score
    })
    .catch(err => {
      return dispatch(leaderboardError(err));
    });

  if (response.status === 200) {
    dispatch({
      type: ADD_USER,
      user: response.data
    });
  }
};

export const removeError = dispatch => {
  dispatch({
    type: REMOVE_ERROR
  });
};
