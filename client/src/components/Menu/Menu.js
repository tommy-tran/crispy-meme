import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import AddUser from '../AddUser/AddUser';
import DeleteLeaderboard from '../DeleteLeaderboard/DeleteLeaderboard';

import Backdrop from '../UI/Backdrop/Backdrop';
import './Menu.css';

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

  render() {
    let menuOptions = null;
    if (!this.props.leaderboard) {
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
    } else {
      menuOptions = (
        <div className="Menu__Options">
          <NavLink className="Menu__Option" to="/" onClick={this.props.clicked}>
            Input another key
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
            to="/dashboard"
            onClick={this.props.clicked}
          >
            Current Leaderboard
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
            <span>
              <strong>Menu</strong>
            </span>
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

export default connect(mapStateToProps)(Menu);
