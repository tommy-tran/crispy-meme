import React, { Component } from 'react';
import './KeyInput.css';

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
    let input = (
      <input
        className="KeyInput__Input"
        placeholder="Input your key here!"
        value={this.state.value}
        onChange={this.updateKeyInput}
        onFocus={this.rotateIcon}
        onBlur={this.rotateIcon}
      />
    );

    if (this.state.inputting) {
      keyIcon = <i className="far fa-key KeyInput__Icon fa-spin" />;
      input = (
        <input
          className="KeyInput__Input"
          value={this.state.value}
          onChange={this.updateKeyInput}
          onFocus={this.rotateIcon}
          onBlur={this.rotateIcon}
        />
      );
    }

    return (
      <div className="KeyInput">
        <span className="KeyInput__Header">
          Have a leaderboard key already?
        </span>
        <div>
          {keyIcon}
          {input}
        </div>
        <div className="KeyInput__ButtonBox">
          {/* <Button
            handleClick={() => {
              this.props.submitKeyHandler(this.state.value);
            }}
            label="Confirm"
            confirm
          /> */}
          <i
            className="fal fa-check-circle fa-4x confirm"
            onClick={() => {
              this.props.submitKeyHandler(this.state.value);
            }}
          />
          {/* <Button handleClick={this.clearInput} label="Clear" cancel /> */}
          <i
            className="fal fa-times-circle fa-4x clear"
            onClick={this.clearInput}
          />
        </div>
      </div>
    );
  }
}

export default KeyInput;
