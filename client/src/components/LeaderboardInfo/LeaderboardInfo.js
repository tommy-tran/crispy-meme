import React from 'react';
import './LeaderboardInfo.css';
import { Redirect } from 'react-router-dom';

const LeaderboardInfo = props => {
  let redirect = null;
  let table = null;
  let privateMsg = null;

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

    let privateRow = null;

    if (props.leaderboard.privateKey) {
      privateRow = (
        <tr>
          <td>Private Key</td>
          <td>{props.leaderboard.privateKey}</td>
        </tr>
      );
      privateMsg = (
        <div style={{ textAlign: 'center', color: 'red' }}>
          Please save the private key!
        </div>
      );
    }

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
          <tr>
            <td>Email</td>
            <td>{email}</td>
          </tr>
          <tr>
            <td>Public Key</td>
            <td>{publicKey}</td>
          </tr>
          {privateRow}
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
      {privateMsg}
    </div>
  );
};

export default LeaderboardInfo;
