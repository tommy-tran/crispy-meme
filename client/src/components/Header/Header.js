import React from 'react';
import './Header.css';

const Header = props => {
  return (
    <div className="Header">
      <span className="Header__Logo"><i className="far fa-trophy-alt" /></span>
      <div className="Header__Name">Crispy Leaderboards</div>
      <ul className="Header__Options">
        <li style={{padding: '0 1em'}}>CREATE</li>
        {/* <li>Logout</li> */}
      </ul>
    </div>
  );
};

export default Header;
