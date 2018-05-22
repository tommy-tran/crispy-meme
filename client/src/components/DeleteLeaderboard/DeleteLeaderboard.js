import React, { Component } from 'react';
import Backdrop from '../UI/Backdrop/Backdrop';
import Button from '../UI/Button/Button';
import { deleteLeaderboard } from '../../actions/leaderboard';
import { connect } from 'react-redux';
import './DeleteLeaderboard.css';

class DeleteLeaderboard extends Component {
  render() {
    let deleteLB = null;

    if (this.props.show) {
      deleteLB = (
        <div className="DeleteLeaderboard">
          <i
            className="fal fa-times DeleteLeaderboard__Close"
            onClick={this.props.clicked}
          />
          <div className="DeleteLeaderboard__Title">
            <strong>Delete Leaderboard</strong>
          </div>
          <div style={{ fontSize: '2em' }}>Are you sure?</div>
          <Button
            className="Button"
            label="Confirm"
            cancel
            handleClick={() => {
              this.props.delete(this.props.privateKey);
            }}
          />
        </div>
      );
    }
    return (
      <div>
        {deleteLB}
        <Backdrop show={this.props.show} clicked={this.props.clicked} />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    delete: key => dispatch(deleteLeaderboard(key))
  };
};

export default connect(null, mapDispatchToProps)(DeleteLeaderboard);
