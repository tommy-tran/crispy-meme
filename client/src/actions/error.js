import axios from 'axios';
import { LEADERBOARD_ERROR, REMOVE_ERROR } from './types';

export const leaderboardError = error => dispatch => {
  dispatch({
    type: LEADERBOARD_ERROR,
    error: error
  });
};

export const removeError = dispatch => {
  dispatch({
    type: REMOVE_ERROR
  });
};
