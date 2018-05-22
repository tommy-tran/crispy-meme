import React, { Component } from 'react';
import './Header.css';
import Menu from '../Menu/Menu';
import { NavLink } from 'react-router-dom';
import { unsetLeaderboard } from '../../actions/leaderboard';
import { connect } from 'react-redux';

class Header extends Component {
  state = {
    showingMenu: false
  };

  toggleMenu = () => {
    this.setState(oldState => {
      return {
        showingMenu: !oldState.showingMenu
      };
    });
  };

  hideMenu = () => {
    this.setState({
      showingMenu: false
    });
  };

  render() {
    let leaderboard = null;
    let menuIcon = this.state.showingMenu ? (
      <div
        className="Header__MenuIcon Header__MenuIcon--X"
        onClick={this.toggleMenu}
      >
        <div className="Header__MenuIcon__Middle" />
      </div>
    ) : (
      <div className="Header__MenuIcon" onClick={this.toggleMenu}>
        <div className="Header__MenuIcon__Middle" />
      </div>
    );

    if (this.props.leaderboard) {
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
        <Menu clicked={this.hideMenu} show={this.state.showingMenu} />
        <NavLink className="Header__Logo" to="/">
          {/*onClick={props.clearLeaderboard*/}
          <i className="far fa-trophy-alt " />
        </NavLink>
        <div className="Header__Name">Crispy Leaderboards</div>
        <div className="Header__Container Header__Container--Menu">
          {menuIcon}
        </div>
        <div className="Header__Container Header__Container--Link">
          {leaderboard}
          <NavLink
            className="Header__Link"
            to="/about"
            activeClassName="Active"
          >
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
  }
}

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
