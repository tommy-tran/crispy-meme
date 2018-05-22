import React, { Component } from 'react';
import Backdrop from '../UI/Backdrop/Backdrop';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
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
          <Input inputType="userName" changed={this.onNameChange} />
          <Input inputType="score" changed={this.onScoreChange} />
          <Button className="Button" label="Confirm" confirm />
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

export default AddUser;
