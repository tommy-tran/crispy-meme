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
      label = 'Enter your name: ';
      break;
    case 'gameName':
      label = "Enter the game/competition: ";
      break;
    case 'email':
      label = 'Enter your email: ';
      break;
    default:
  }

  const fullInput = (
    <label className="Label">
      {label}
      {input}
    </label>
  );

  return fullInput;
};

export default Input;
