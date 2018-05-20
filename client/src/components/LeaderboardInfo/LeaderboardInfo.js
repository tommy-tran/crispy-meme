import React from 'react';
import './LeaderboardInfo.css';
import { Redirect } from 'react-router-dom';

const LeaderboardInfo = props => {
  
  let redirect = null;
  let name = null;

  if (!props.leaderboard) {
    redirect = <Redirect to="/" />;
  } else {
    name = <h2>{props.leaderboard.gameName}</h2>
  }

  return (
    <div className="LeaderboardInfo">
      {redirect}
      {name}
    </div>
  );
};

export default LeaderboardInfo;
