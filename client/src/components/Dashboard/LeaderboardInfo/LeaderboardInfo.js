import React from 'react';
import './LeaderboardInfo.css';
import { Redirect } from 'react-router-dom';

const LeaderboardInfo = props => {
  let redirect = null;
  let table = null;
  let privateMsg = null;
  let privateRow = null;

  if (!props.leaderboard) {
    redirect = <Redirect to="/" />;
  } else {
    const {
      gameName,
      ownerName,
      email,
      dateCreated,
      publicKey,
      privateKey
    } = props.leaderboard;

    const emailRow = email ? (
      <tr>
        <td>Email</td>
        <td>{email}</td>
      </tr>
    ) : null;

    if (privateKey) {
      privateMsg = (
        <div style={{ textAlign: 'center', color: 'red', marginTop: '10px' }}>
          Please save and protect your private key!
        </div>
      );

      privateRow = (
        <tr>
          <td>Private Key</td>
          <td>{privateKey}</td>
        </tr>
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
          {emailRow}
          <tr>
            <td>Date Created</td>
            <td>{dateCreated.split('T')[0]}</td>
          </tr>
          <tr>
            <td>Public Key</td>
            <td>{publicKey}</td>
          </tr>
          {privateRow}
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
