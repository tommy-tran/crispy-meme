import React, { Component } from 'react';
import './Landing.css';
import { Redirect } from 'react-router';

import { connect } from 'react-redux';
import { fetchLeaderboard } from '../../actions/leaderboard';

import KeyInput from '../KeyInput/KeyInput';
import addUserHandler from '../../hoc/addErrorHandler/addErrorHandler';

class Landing extends Component {
  render() {
    let redirect = null;
    if (this.props.redirect) {
      redirect = <Redirect to="/dashboard" />;
    }
    return (
      <div className="Landing">
        {redirect}
        <i className="far fa-trophy-alt fa-10x Landing__Logo" />
        <KeyInput
          loading={this.props.loading}
          submitKeyHandler={this.props.onFetchLeaderboard}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    leaderboard: state.leaderboard.currentLeaderboard,
    redirect: state.leaderboard.redirectToDashboard,
    loading: state.leaderboard.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchLeaderboard: key => dispatch(fetchLeaderboard(key))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  addUserHandler(Landing)
);
