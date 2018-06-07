import React, { Component } from 'react';
import './Menu.css';
import { NavLink } from 'react-router-dom';

import AddUser from '../AddUser/AddUser';
import DeleteLeaderboard from '../DeleteLeaderboard/DeleteLeaderboard';
import Backdrop from '../UI/Backdrop/Backdrop';

import { connect } from 'react-redux';
import { unsetLeaderboard } from '../../actions/leaderboard';

class Menu extends Component {
  state = {
    showAdd: false,
    showDeleteLB: false
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
    this.props.clicked();
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
    this.props.clicked();
  };

  onLogout = () => {
    this.props.logout();
    this.props.clicked();
  };

  render() {
    let menuOptions = null;
    if (this.props.leaderboard && this.props.leaderboard.admin) {
      menuOptions = (
        <div className="Menu__Options">
          <NavLink className="Menu__Option" to="/" onClick={this.props.clicked}>
            Input another Leaderboard key
          </NavLink>
          <NavLink
            className="Menu__Option"
            to="/dashboard"
            onClick={this.props.clicked}
          >
            View current Leaderboard
          </NavLink>
          <NavLink
            className="Menu__Option"
            to="/create"
            onClick={this.props.clicked}
          >
            Create a new Leaderboard
          </NavLink>
          <div className="Menu__Option" onClick={this.onAddUser}>
            Add User
          </div>
          <div className="Menu__Option" onClick={this.onDeleteLeaderboard}>
            Delete Leaderboard
          </div>
          <NavLink
            className="Menu__Option"
            to="/about"
            onClick={this.props.clicked}
          >
            About
          </NavLink>
          <div className="Menu__Option" onClick={this.onLogout}>
            Logout
          </div>
        </div>
      );
    } else {
      menuOptions = (
        <div className="Menu__Options">
          <NavLink className="Menu__Option" to="/" onClick={this.props.clicked}>
            Input a leaderboard key
          </NavLink>
          <NavLink
            className="Menu__Option"
            to="/create"
            onClick={this.props.clicked}
          >
            Create a new Leaderboard
          </NavLink>
          <NavLink
            className="Menu__Option"
            to="/about"
            onClick={this.props.clicked}
          >
            About
          </NavLink>
        </div>
      );
    }

    const display = this.props.show ? (
      <div>
        {this.props.leaderboard ? (
          <div className="_Container">
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
        <div className="MenuContainer">
          <div className="Menu">
            <span className="Menu__Header">Menu</span>
            {menuOptions}
          </div>
          <Backdrop show={this.props.show} clicked={this.props.clicked} />
        </div>
      </div>
    ) : null;

    return <div>{display}</div>;
  }
}

const mapStateToProps = state => {
  return {
    leaderboard: state.leaderboard.currentLeaderboard
  };
};

const mapDispatchToProps = dispatch => {
  return { logout: () => dispatch(unsetLeaderboard) };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu);
