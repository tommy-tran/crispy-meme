import React, { Component } from 'react';
import './KeyInput.css';
import Button from '../UI/Button/Button';

class KeyInput extends Component {
  state = {
    value: ''
  };

  updateKeyInput = event => {
    this.setState({
      value: event.target.value
    });
  };

  clearInput = () => {
    this.setState({
      value: ''
    });
  };

  render() {
    return (
      <div className="KeyInput">
        <h3>Input your key here!</h3>
        <input value={this.state.value} onChange={this.updateKeyInput} />
        <Button
          handleClick={() => {
            this.props.submitKeyHandler(this.state.value);
          }}
          label="Confirm"
          confirm
        />

        <Button handleClick={this.clearInput} label="Clear" cancel />
      </div>
    );
  }
}

export default KeyInput;
