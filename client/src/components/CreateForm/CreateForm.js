import React, { Component } from 'react';
import './CreateForm.css';
import Input from '../UI/Input/Input';
import { Link } from 'react-router-dom';

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

  render() {
    return (
      <div className="CreateForm">
        <i className="far fa-trophy-alt fa-10x Logo" />
        <Input inputType="gameName" changed={this.gameNameHandler} />
        <Input inputType="ownerName" changed={this.ownerNameHandler} />
        <Input inputType="email" changed={this.emailHandler} />
        <div className="CreateForm__ButtonBox">
          <i className="fal fa-check-circle fa-5x confirm" />
          <Link to="/">
            <i className="fal fa-times-circle fa-5x clear" />
          </Link>
        </div>
      </div>
    );
  }
}

export default CreateForm;
