import React, { Component } from 'react';
import './Dashboard.css';
import { connect } from 'react-redux';
import LeaderboardInfo from '../LeaderboardInfo/LeaderboardInfo';

class Dashboard extends Component {
  render() {
    return (
      <div className="Container">
        <div className="Dashboard">
          <div className="Dashboard__Content">
            <div className="Dashboard__Section">
              <LeaderboardInfo leaderboard={this.props.leaderboard} />
            </div>
            <div className="Dashboard__Section Dashboard__Section--Large ">
              <div className="Dashboard__Header">Dashboard</div>
            </div>
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
