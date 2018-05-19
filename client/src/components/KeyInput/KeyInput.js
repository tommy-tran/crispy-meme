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
        <span className="KeyInput__Header">Input your key here!</span>
        <input value={this.state.value} onChange={this.updateKeyInput} />
        <div className="KeyInput__ButtonBox">
          <Button
            handleClick={() => {
              this.props.submitKeyHandler(this.state.value);
            }}
            label="Confirm"
            confirm
          />
          <Button handleClick={this.clearInput} label="Clear" cancel />
        </div>
      </div>
    );
  }
}

export default KeyInput;
