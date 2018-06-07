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

  clearPlaceholder = () => {
    this.setState(oldState => {
      return { inputting: !oldState.inputting };
    });
  };

  keyPressHandler = event => {
    if (event.keyCode === 13) {
      this.props.submitKeyHandler(this.state.value);
    }
  };

  render() {
    let keyIcon = <i className="far fa-key KeyInput__Icon" />;
    let input = (
      <input
        className="KeyInput__Input"
        placeholder={this.state.inputting ? '' : 'Input your key here!'}
        value={this.state.value}
        onChange={this.updateKeyInput}
        onFocus={this.clearPlaceholder}
        onBlur={this.clearPlaceholder}
      />
    );

    if (this.props.loading) {
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
      <div className="KeyInput" onKeyDown={this.keyPressHandler}>
        <span className="KeyInput__Header">
          Have a leaderboard key already?
        </span>
        <div className="KeyInput__InputBox">
          {keyIcon}
          {input}
          <div className="_Balancer" />
        </div>
        <div className="KeyInput__ButtonBox">
          <i
            className="fal fa-check-circle fa-4x confirm"
            onClick={() => {
              this.props.submitKeyHandler(this.state.value);
            }}
          />
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
