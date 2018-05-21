import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { unsetLeaderboard } from '../../actions/leaderboard';
import { connect } from 'react-redux';

const Header = props => {
  return (
    <div className="Header">
      <span className="Header__Logo">
        <i className="far fa-trophy-alt" />
      </span>
      <div className="Header__Name">Crispy Leaderboards</div>
      <div className="Header__Container">
        <div className="Header__Menu">
          <div class="Header__Menu__Middle" />
        </div>
      </div>
      <Link
        className="Header__Menu__Link"
        to="/create"
        onClick={props.clearLeaderboard}
      >
        CREATE
      </Link>
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

export default connect(null, mapDispatchToProps)(Header);
