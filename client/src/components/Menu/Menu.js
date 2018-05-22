import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import Backdrop from '../UI/Backdrop/Backdrop';
import './Menu.css';

class Menu extends Component {
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
          <div className="Menu__Option">Input another key</div>
          <div className="Menu__Option">Create a new leaderboard</div>
          <div className="Menu__Option">Current Leaderboard</div>
          <div className="Menu__Option">Delete Leaderboard</div>
          <div className="Menu__Option">Add User</div>
          <div className="Menu__Option">About</div>
        </div>
      );
    }

    const display = this.props.show ? (
      <div className="MenuContainer">
        <div className="Menu">
          <span>
            <strong>Menu</strong>
          </span>
          {menuOptions}
        </div>
        <Backdrop show={this.props.show} clicked={this.props.clicked} />
      </div>
    ) : null;

    return display;
  }
}

const mapStateToProps = state => {
  return {
    leaderboard: state.leaderboard.currentLeaderboard
  };
};

export default connect(mapStateToProps)(Menu);
