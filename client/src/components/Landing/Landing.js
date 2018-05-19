import React, { Component } from 'react';
import './Landing.css';
import KeyInput from '../KeyInput/KeyInput';
import { connect } from 'react-redux';
import { fetchLeaderboard } from '../../actions/leaderboard';
import { Redirect } from 'react-router';
import Card from '../Card/Card';

class Landing extends Component {
  render() {
    let redirect = null;
    if (this.props.leaderboard) {
      redirect = <Redirect to="/dashboard" />;
    }
    return (
      <div className="Landing">
        {redirect}
        <Card>
          <KeyInput submitKeyHandler={this.props.onFetchLeaderboard} />
        </Card>
        <Card />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    leaderboard: state.leaderboard.currentLeaderboard
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchLeaderboard: key => dispatch(fetchLeaderboard(key))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
