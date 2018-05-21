import React, { Component } from 'react';
import './Landing.css';
import KeyInput from '../KeyInput/KeyInput';
import { connect } from 'react-redux';
import { fetchLeaderboard } from '../../actions/leaderboard';
import { Redirect } from 'react-router';

class Landing extends Component {
  render() {
    let redirect = null;
    if (this.props.leaderboard) {
      redirect = <Redirect to="/dashboard" />;
    }
    return (
      <div className="Landing">
        {redirect}
        <i className="far fa-trophy-alt fa-10x Landing__Logo" />
        <KeyInput loading={this.props.loading} submitKeyHandler={this.props.onFetchLeaderboard} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    leaderboard: state.leaderboard.currentLeaderboard,
    loading: state.leaderboard.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchLeaderboard: key => dispatch(fetchLeaderboard(key))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
