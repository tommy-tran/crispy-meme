import React, { Component } from 'react';
import './KeyInput.css';
import Button from '../UI/Button/Button';

class KeyInput extends Component {
  state = {
    value: '',
    inputting: false
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

  rotateIcon = () => {
    this.setState(oldState => {
      return { inputting: !oldState.inputting };
    });
  };

  render() {
    let keyIcon = <i className="far fa-key KeyInput__Icon" />;

    if (this.state.inputting) {
      keyIcon = <i className="far fa-key KeyInput__Icon fa-spin" />;
    }

    return (
      <div className="KeyInput">
        <span className="KeyInput__Header">
          Have a leaderboard key already?
        </span>
        <div>
          {keyIcon}
          <input className="KeyInput__Input"
            placeholder="Input your key here!"
            value={this.state.value}
            onChange={this.updateKeyInput}
            onFocus={this.rotateIcon}
            onBlur={this.rotateIcon}
          />
        </div>
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
