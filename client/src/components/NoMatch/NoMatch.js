import React from 'react';
import './NoMatch.css';

const NoMatch = props => {
  return (
    <h1 className="NoMatch">
      <i className="fas fa-exclamation-circle" />{' '} 
      Oops.. you shouldn't be here!
    </h1>
  );
};

export default NoMatch;
