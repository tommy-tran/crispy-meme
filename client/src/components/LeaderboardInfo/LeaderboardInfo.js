import React from 'react';
import './LeaderboardInfo.css';
import { Redirect } from 'react-router-dom';

const LeaderboardInfo = props => {
  let redirect = null;
  let table = null;
  let emailRow = null;

  if (!props.leaderboard) {
    redirect = <Redirect to="/" />;
  } else {
    const {
      gameName,
      ownerName,
      email,
      dateCreated,
      publicKey
    } = props.leaderboard;

    if (email) {
      emailRow = (
        <tr>
          <td>Email</td>
          <td>{email}</td>
        </tr>
      );
    }

    let privateRow = null;

    table = (
      <table>
        <tbody>
          <tr>
            <td>Game Name</td>
            <td>{gameName}</td>
          </tr>
          <tr>
            <td>Owner Name</td>
            <td>{ownerName}</td>
          </tr>
          {emailRow}
          <tr>
            <td>Public Key</td>
            <td>{publicKey}</td>
          </tr>
          <tr>
            <td>Date Created</td>
            <td>{dateCreated.split('T')[0]}</td>
          </tr>
        </tbody>
      </table>
    );
  }

  return (
    <div className="LeaderboardInfo">
      <div className="LeaderboardInfo__Block">CURRENT LEADERBOARD</div>
      {redirect}
      {table}
      <div style={{ textAlign: 'center', color: 'red', marginTop: '10px' }}>
        Please save and protect your private key!
      </div>
    </div>
  );
};

export default LeaderboardInfo;
