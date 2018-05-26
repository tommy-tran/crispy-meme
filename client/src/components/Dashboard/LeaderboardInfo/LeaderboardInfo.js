import React from 'react';
import './LeaderboardInfo.css';

const LeaderboardInfo = props => {
  let redirect = null;
  let table = null;
  let privateMsg = null;
  let privateRow = null;

  if (props.leaderboard) {
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
        <td>
          <strong>Email</strong>
        </td>
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
          <td>
            <strong>Private Key</strong>
          </td>
          <td>{privateKey}</td>
        </tr>
      );
    }

    table = (
      <table>
        <tbody>
          <tr>
            <td>
              <strong>Game Name</strong>
            </td>
            <td>{gameName}</td>
          </tr>
          <tr>
            <td>
              <strong>Owner Name</strong>
            </td>
            <td>{ownerName}</td>
          </tr>
          {emailRow}
          <tr>
            <td>
              <strong>Date Created</strong>
            </td>
            <td>{dateCreated.split('T')[0]}</td>
          </tr>
          <tr>
            <td>
              <strong>Public Key</strong>
            </td>
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
