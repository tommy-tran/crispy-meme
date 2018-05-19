import React, { Component } from 'react';
import './Landing.css';
import KeyInput from '../KeyInput/KeyInput';
import { connect } from 'react-redux';
import { fetchLeaderboard } from '../../actions/leaderboard';

class Landing extends Component {
  render() {
    return (
      <div className="Landing">
        <KeyInput submitKeyHandler={this.props.onFetchLeaderboard} />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchLeaderboard: key => dispatch(fetchLeaderboard(key))
  };
};

export default connect(null, mapDispatchToProps)(Landing);
