import React from 'react';

const Input = (props) => {
  const input = <input name={props.inputType} type={props.inputType === 'email' ? 'email' : 'text'} onChange={props.changed} /> 

  let label = null;

  switch(props.inputType) {
    case 'ownerName':
      label = 'Enter your name:';
      break;
    case 'gameName':
      label = "Enter the game or the competition's name";
      break;
    case 'email':
      label = 'Enter your email:'
      break;
    default: 
  }

  const fullInput = <label>{label}{input}</label>

  return (
    {fullInput}
  )
}

export default Input;