import React, { Component } from 'react';
import './Dashboard.css';
import { connect } from 'react-redux';
import LeaderboardInfo from './LeaderboardInfo/LeaderboardInfo';
import UserTable from './UserTable/UserTable';
import AddUser from '../AddUser/AddUser';
import DeleteLeaderboard from '../DeleteLeaderboard/DeleteLeaderboard';
import addErrorHandler from '../../hoc/addErrorHandler/addErrorHandler';
import { loadLeaderboard } from '../../actions/leaderboard';
import { Redirect } from 'react-router-dom';

class Dashboard extends Component {
  state = {
    showAdd: false,
    showDeleteLB: false,
    hasLocalLeaderboard: true
  };

  componentDidMount() {
    const localLeaderboard = localStorage.getItem('leaderboard');
    if (!localLeaderboard) {
      this.setState({
        hasLocalLeaderboard: false
      });
    } else {
      this.props.loadLocal();
    }
  }

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

  onDeleteLeaderboard = () => {
    this.setState({
      showDeleteLB: true
    });
  };

  onCloseDeleteLeaderboard = () => {
    this.setState({
      showDeleteLB: false
    });
  };

  render() {
    let tableData = [];
    let redirect = null;

    if (!this.state.hasLocalLeaderboard && !this.props.leaderboard) {
      redirect = <Redirect to="/" />;
    }

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
          <i
            className="fal fa-ban Header__Options__Icon Red"
            onClick={this.onDeleteLeaderboard}
          />
        </div>
      );
    }

    return (
      <div className="Container">
        {redirect}
        {this.props.leaderboard ? (
          <div>
            <AddUser
              show={this.state.showAdd}
              clicked={this.onCloseAddUser}
              privateKey={this.props.leaderboard.privateKey}
            />
            <DeleteLeaderboard
              show={this.state.showDeleteLB}
              clicked={this.onCloseDeleteLeaderboard}
              privateKey={this.props.leaderboard.privateKey}
            />
          </div>
        ) : null}
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

const mapDispatchToProps = dispatch => {
  return {
    loadLocal: () => dispatch(loadLeaderboard)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  addErrorHandler(Dashboard)
);
