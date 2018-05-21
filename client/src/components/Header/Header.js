import React from 'react';
import './Header.css';
import { NavLink } from 'react-router-dom';
import { unsetLeaderboard } from '../../actions/leaderboard';
import { connect } from 'react-redux';

const Header = props => {
  let leaderboard = null;

  if (props.leaderboard) {
    leaderboard = (
      <NavLink
        className="Header__Link"
        exact
        to="/dashboard"
        activeClassName="Active"
      >
        CURRENT
      </NavLink>
    );
  }

  return (
    <div className="Header">
      <NavLink className="Header__Logo" to="/" > {/*onClick={props.clearLeaderboard*/}
        <i className="far fa-trophy-alt " />
      </NavLink>
      <div className="Header__Name">Crispy Leaderboards</div>
      <div className="Header__Container Header__Container--Menu">
        <div className="Header__Menu">
          <div className="Header__Menu__Middle" />
        </div>
      </div>

      <div className="Header__Container Header__Container--Link">
        {leaderboard}
        <NavLink className="Header__Link" to="/about" activeClassName="Active">
          ABOUT
        </NavLink>
        <NavLink
          className="Header__Link"
          exact
          to="/create"
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

const mapStateToProps = state => {
  return {
    leaderboard: state.leaderboard.currentLeaderboard
  };
};

export default connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false
})(Header);
