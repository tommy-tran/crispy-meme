import React from 'react';
import './Header.css';

const Header = props => {
  return (
    <div className="Header">
      <div className="Header__Logo">Crispy Leaderboards</div>
      <ul className="Header__Options">
        <li style={{padding: '0 10px'}}>Login</li>
        {/* <li>Logout</li> */}
        <li style={{padding: '0 10px'}}>Create</li>
      </ul>
    </div>
  );
};

export default Header;
