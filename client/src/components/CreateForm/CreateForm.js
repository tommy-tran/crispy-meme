import React, { Component } from 'react';
import './CreateForm.css';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { createLeaderboard } from '../../actions/leaderboard';

import Input from '../UI/Input/Input';
import addErrorHandler from '../../hoc/addErrorHandler/addErrorHandler';

class CreateForm extends Component {
  state = {
    gameName: '',
    ownerName: '',
    email: ''
  };

  gameNameHandler = event => {
    this.setState({
      gameName: event.target.value
    });
  };

  ownerNameHandler = event => {
    this.setState({
      ownerName: event.target.value
    });
  };

  emailHandler = event => {
    this.setState({
      email: event.target.value
    });
  };

  createRequest = () => {
    if (!this.props.loading) {
      this.props.sendCreateRequest(
        this.state.gameName,
        this.state.ownerName,
        this.state.email
      );
    }
  };

  keyPressHandler = event => {
    if (event.keyCode === 13) {
      this.createRequest();
    }
  };

  render() {
    let redirect = null;
    if (this.props.redirect) {
      redirect = <Redirect to="/dashboard" />;
    }

    return (
      <div className="CreateForm" onKeyDown={this.keyPressHandler}>
        {redirect}
        <div className="CreateForm__Header">
          <strong>Creating Leaderboard</strong>
        </div>
        <i className="far fa-trophy-alt fa-10x Logo" />
        <Input inputType="gameName" changed={this.gameNameHandler} />
        <Input inputType="ownerName" changed={this.ownerNameHandler} />
        <Input inputType="email" changed={this.emailHandler} />
        <div className="CreateForm__ButtonBox">
          <i
            className="fal fa-check-circle fa-5x confirm"
            onClick={this.createRequest}
          />
          <Link to="/">
            <i className="fal fa-times-circle fa-5x clear" />
          </Link>
        </div>
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
    sendCreateRequest: (gameName, ownerName, email) => {
      dispatch(createLeaderboard(gameName, ownerName, email));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(addErrorHandler(CreateForm));
