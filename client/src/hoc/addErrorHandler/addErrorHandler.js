import React, { Component } from 'react';
import { connect } from 'react-redux';
import Backdrop from '../../components/UI/Backdrop/Backdrop';
import Button from '../../components/UI/Button/Button';
import { removeError } from '../../actions/leaderboard';

const addErrorHandler = WrappedComponent => {
  return class extends Component {
    closeError = () => {
      this.props.onCloseError();
    };

    render() {
      const error = this.props.leaderboard
        ? this.props.leaderboard.error
        : null;

      const errorModal = errorModal ? (
        <div className="ErrorHandler">
          <div className="ErrorHandler__Message">
            {this.props.leaderboard.error}
          </div>
          <Button confirm handleClick={this.closeError} label="OK" />
        </div>
      ) : null;

      return (
        <div>
          {errorModal}
          <Backdrop show={errorModal ? true : false} />
          <WrappedComponent />
        </div>
      );
    }
  };
};

const mapStateToProps = state => {
  return {
    leaderboard: state.leaderboard.currentLeaderboard
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onCloseError: () => dispatch(removeError)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  addErrorHandler(WrappedComponent)
);
