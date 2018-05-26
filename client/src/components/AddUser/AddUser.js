import React, { Component } from 'react';
import Backdrop from '../UI/Backdrop/Backdrop';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import { addUser } from '../../actions/user';
import { connect } from 'react-redux';
import './AddUser.css';

class AddUser extends Component {
  state = {
    score: null,
    userName: null
  };

  onNameChange = event => {
    this.setState({
      userName: event.target.value
    });
  };

  onScoreChange = event => {
    this.setState({
      score: event.target.value
    });
  };

  render() {
    let addUser = null;

    if (this.props.show) {
      addUser = (
        <div className="AddUser">
          <i
            className="fal fa-times AddUser__Close"
            onClick={this.props.clicked}
          />
          <div className="AddUser__Title">
            <strong>Adding User</strong>
          </div>
          <div className="AddUser__Inputbox">
            <Input inputType="userName" changed={this.onNameChange} />
            <Input inputType="score" changed={this.onScoreChange} />
          </div>
          <Button
            className="Button"
            label="Confirm"
            confirm
            handleClick={() => {
              this.props.addUserSubmit(
                this.props.privateKey,
                this.state.userName,
                this.state.score
              );
              this.props.clicked();
            }}
          />
        </div>
      );
    }
    return (
      <div>
        {addUser}
        <Backdrop show={this.props.show} clicked={this.props.clicked} />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addUserSubmit: (key, username, score) =>
      dispatch(addUser(key, username, score))
  };
};

export default connect(null, mapDispatchToProps)(AddUser);
