import axios from 'axios';
import {
  CREATE_LEADERBOARD,
  DELETE_LEADERBOARD,
  CLEAR_LEADERBOARD,
  FETCH_LEADERBOARD,
  UNSET_LEADERBOARD,
  LOADING_LEADERBOARD,
  REDIRECTED_LEADERBOARD,
  LOAD_LEADERBOARD
} from './types';

import { leaderboardError } from './error';

export const fetchLeaderboard = key => async dispatch => {
  if (!key || key.length !== 20) {
    return dispatch(
      leaderboardError({
        status: 400,
        customMessage: 'Please enter a valid key'
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

  if (
    requestLeaderboardInfo &&
    requestUsers &&
    requestLeaderboardInfo.status === 200 &&
    requestUsers.status === 200
  ) {
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

  if (!gameName || !ownerName || !email) {
    let missingFields = [];
    if (!gameName) missingFields.push('game name');
    if (!ownerName) missingFields.push('your name');
    if (!email) missingFields.push('your email');

    return dispatch(
      leaderboardError({
        status: 400,
        customMessage: `Invalid information entered: missing ${missingFields.join(
          ', '
        )}`
      })
    );
  }

  const response = await axios
    .post('lb/', {
      gameName,
      ownerName,
      email
    })
    .catch(err => {
      console.log(err.response);
      return dispatch(leaderboardError(err));
    });

  if (response && response.status === 200) {
    dispatch({
      type: CREATE_LEADERBOARD,
      payload: response.data
    });

    dispatch(redirectedLeaderboard);
  }
};

export const deleteLeaderboard = key => async dispatch => {
  dispatch(loadingLeaderboard);

  if (!key || key.length !== 20) {
    return dispatch(
      leaderboardError({
        status: 400,
        customMessage: 'Please enter a valid key!'
      })
    );
  }

  const response = await axios.delete(`/lb/${key}`).catch(err => {
    return dispatch(leaderboardError(err));
  });

  if (response && response.status === 200) {
    localStorage.removeItem('leaderboard');
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
  localStorage.removeItem('leaderboard');
  dispatch(redirectedLeaderboard);
  dispatch({
    type: UNSET_LEADERBOARD
  });
};

export const loadingLeaderboard = dispatch => {
  dispatch({
    type: LOADING_LEADERBOARD
  });
};

export const loadLeaderboard = async dispatch => {
  let key = null;
  const localLeaderboard = JSON.parse(localStorage.getItem('leaderboard'));
  if (localLeaderboard) {
    key = localLeaderboard.privateKey || localLeaderboard.publicKey;

    const requestLeaderboardInfo = await axios
      .get(`/lb/${key}/info`)
      .catch(err => console.log(err));
    const requestUsers = await axios
      .get(`/lb/${key}`)
      .catch(err => console.log(err));

    if (
      requestLeaderboardInfo &&
      requestUsers &&
      requestLeaderboardInfo.status === 200 &&
      requestUsers.status === 200
    ) {
      const result = {
        ...requestLeaderboardInfo.data,
        data: requestUsers.data
      };

      dispatch({
        type: LOAD_LEADERBOARD,
        payload: result
      });
    } else {
      dispatch({
        type: LOAD_LEADERBOARD,
        payload: null
      });
    }
  }
};

export const redirectedLeaderboard = dispatch => {
  dispatch({
    type: REDIRECTED_LEADERBOARD
  });
};
