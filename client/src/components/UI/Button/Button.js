import React from 'react';
import './Button.css';

const Button = props => {
  const btnType = props.confirm
    ? 'Button Button--Confirm'
    : props.cancel
      ? 'Button Button--Cancel'
      : props.clear
        ? 'Button Button--Clear'
        : props.logout
          ? 'Button Button--Logout'
          : 'Button';

  return (
    <button onClick={props.handleClick} className={btnType}>
      {props.children}
      {props.label}
    </button>
  );
};

export default Button;
