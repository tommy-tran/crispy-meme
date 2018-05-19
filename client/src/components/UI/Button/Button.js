import React from 'react';
import './Button.css';

const Button = props => (
  <button
    onClick={props.handleClick}
    className={
      props.confirm
        ? 'Button Button--Confirm'
        : props.cancel
          ? 'Button Button--Cancel'
          : 'Button'
    }
  >
    {props.label}
  </button>
);

export default Button;
