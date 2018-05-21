import React from 'react';
import './Header.css';
import { NavLink } from 'react-router-dom';
import { unsetLeaderboard } from '../../actions/leaderboard';
import { connect } from 'react-redux';

const Header = props => {
  return (
    <div className="Header">
      <NavLink className="Header__Logo" to="/" onClick={props.clearLeaderboard}>
        <i className="far fa-trophy-alt " />
      </NavLink>
      <div className="Header__Name">Crispy Leaderboards</div>
      <div className="Header__Container Header__Container--Menu">
        <div className="Header__Menu">
          <div class="Header__Menu__Middle" />
        </div>
      </div>

      <div className="Header__Container Header__Container--Link">
        <NavLink className="Header__Link" to="/about" activeClassName="Active">
          ABOUT
        </NavLink>
        <NavLink
          className="Header__Link"
          exact
          to="/create"
          onClick={props.clearLeaderboard}
          activeClassName="Active"
        >
          CREATE
        </NavLink>
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    clearLeaderboard: () => {
      dispatch(unsetLeaderboard);
    }
  };
};

export default connect(null, mapDispatchToProps, null, { pure: false })(Header);
