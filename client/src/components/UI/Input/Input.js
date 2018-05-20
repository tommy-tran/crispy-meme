import React from 'react';
import './Input.css';

const Input = props => {
  const input = (
    <input className="Input"
      name={props.inputType}
      type={props.inputType === 'email' ? 'email' : 'text'}
      onChange={props.changed}
    />
  );

  let label = null;

  switch (props.inputType) {
    case 'ownerName':
      label = <span className="Label">Enter your name: </span>;
      break;
    case 'gameName':
      label = <span className="Label">Enter game's name: </span>;
      break;
    case 'email':
      label = <span className="Label">Enter your email: </span>;
      break;
    default:
  }

  const fullInput = (
    <label className="InputBox">
      {label}
      {input}
    </label>
  );

  return fullInput;
};

export default Input;
