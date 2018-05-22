import React, { Component } from 'react';
import './Dashboard.css';
import { connect } from 'react-redux';
import LeaderboardInfo from './LeaderboardInfo/LeaderboardInfo';
import UserTable from './UserTable/UserTable';
import AddUser from '../AddUser/AddUser';

class Dashboard extends Component {
  state = {
    showAdd: false
  };

  onAddUser = () => {
    this.setState({
      showAdd: true
    });
  };

  onCloseAddUser = () => {
    this.setState({
      showAdd: false
    });
  };

  render() {
    let tableData = [];
    if (this.props.leaderboard) {
      tableData = this.props.leaderboard.data.map((user, index) => {
        return {
          rank: index + 1,
          ...user,
          date: user.date.split('T')[0],
          _id: user._id
        };
      });
    }

    let options = null;
    if (this.props.leaderboard && this.props.leaderboard.admin) {
      options = (
        <div className="Header__Options">
          <i
            className="fal fa-plus-circle Header__Options__Icon Green"
            onClick={this.onAddUser}
          />
          <i className="fal fa-ban Header__Options__Icon Red" />
        </div>
      );
    }

    return (
      <div className="Container">
        <AddUser
          show={this.state.showAdd}
          clicked={this.onCloseAddUser}
          privateKey={this.props.leaderboard.privateKey}
        />
        <div className="Dashboard">
          <div className="Dashboard__Content">
            <div className="Dashboard__Section">
              <LeaderboardInfo leaderboard={this.props.leaderboard} />
            </div>
            <div className="Dashboard__Section Dashboard__Section--Large  Dashboard__Section--Flex">
              <div className="Dashboard__Header">
                <span className="Header__Title">Dashboard</span>
                {options}
              </div>
              <div className="Dashboard__Table">
                <UserTable
                  leaderboardData={tableData}
                  admin={
                    this.props.leaderboard ? this.props.leaderboard.admin : null
                  }
                  requestKey={
                    this.props.leaderboard
                      ? this.props.leaderboard.privateKey
                      : null
                  }
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

export default connect(mapStateToProps)(Dashboard);
