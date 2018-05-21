import React, { Component } from 'react';
import './Dashboard.css';
import { connect } from 'react-redux';
import LeaderboardInfo from './LeaderboardInfo/LeaderboardInfo';
import UserTable from './UserTable/UserTable';

class Dashboard extends Component {
  render() {
    const tableData = this.props.leaderboard.data.map((user, index) => {
      return {
        rank: index + 1,
        ...user,
        date: user.date.split('T')[0],
        id: user.id
      };
    });

    return (
      <div className="Container">
        <div className="Dashboard">
          <div className="Dashboard__Content">
            <div className="Dashboard__Section">
              <LeaderboardInfo leaderboard={this.props.leaderboard} />
            </div>
            <div className="Dashboard__Section Dashboard__Section--Large  Dashboard__Section--Flex">
              <div className="Dashboard__Header">Dashboard</div>
              <div className="Dashboard__Table">
                <UserTable
                  leaderboardData={tableData}
                  admin={this.props.leaderboard.admin}
                  requestKey={this.props.leaderboard.privateKey}
                />
              </div>
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

export default connect(mapStateToProps, null, null, {
  pure: false
})(Dashboard);
