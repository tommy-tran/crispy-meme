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
      <div className="Header__Container Header__Container--Menu">
        <div className="Header__Menu">
          <div class="Header__Menu__Middle" />
        </div>
      </div>

      <div className="Header__Container Header__Container--Link">
        <a
          className="Header__Link"
          href="https://github.com/tommy-tran/crispy-meme"
        >
          <i className="fab fa-github-alt" />
        </a>
        <Link
          className="Header__Link"
          to="/about"
        >
          ABOUT
        </Link>
        <Link
          className="Header__Link"
          to="/create"
          onClick={props.clearLeaderboard}
        >
          CREATE
        </Link>
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

export default connect(null, mapDispatchToProps)(Header);
