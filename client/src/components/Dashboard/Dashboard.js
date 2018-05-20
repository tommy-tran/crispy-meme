import React, { Component } from 'react';
import './Dashboard.css';
import { connect } from 'react-redux';
import LeaderboardInfo from '../LeaderboardInfo/LeaderboardInfo';
import Card from '../Card/Card';

class Dashboard extends Component {
  render() {
    return (
      <div className="Container">
        <div className="Dashboard">
          <div className="Dashboard__Header">Dashboard</div>
          <div className="Dashboard__Content">
            <div className="Dashboard__Column">
              <LeaderboardInfo leaderboard={this.props.leaderboard} />
            </div>
            <div className="Dashboard__Column Dashboard__Column--Large" />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    leaderboard: state.leaderboard.currentLeaderboard
  };
};

export default connect(mapStateToProps)(Dashboard);
