import React, { Component } from 'react';
import './addErrorHandler.css';

import { connect } from 'react-redux';
import { removeError } from '../../actions/error';

import Backdrop from '../../components/UI/Backdrop/Backdrop';
import Button from '../../components/UI/Button/Button';

const addErrorHandler = WrappedComponent => {
  class ErrorHandledComponent extends Component {
    closeError = () => {
      this.props.onCloseError();
    };

    keyDownHandler = event => {
      console.log(event.keyCode);
    };

    render() {
      const error = this.props.error ? this.props.error : null;

      const errorModal = error ? (
        <div className="ErrorContainer">
          <div className="ErrorHandler">
            <h1 style={{ margin: '0' }}>Error</h1>
            <div>
              <div className="ErrorHandler__Status">{error.status}</div>
              <div className="ErrorHandler__Message">{error.message}</div>
            </div>
            <div style={{ margin: '0 auto' }}>
              <Button
                className="ErrorHandler__Button"
                confirm
                handleClick={this.closeError}
                label="OK"
              />
            </div>
          </div>
          <Backdrop show={error ? true : false} />
        </div>
      ) : null;

      return (
        <div>
          {errorModal}
          <WrappedComponent {...this.props} />
        </div>
      );
    }
  }

  const mapStateToProps = state => {
    return {
      error: state.leaderboard.error
    };
  };

  const mapDispatchToProps = dispatch => {
    return {
      onCloseError: () => dispatch(removeError)
    };
  };

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(ErrorHandledComponent);
};

export default addErrorHandler;
