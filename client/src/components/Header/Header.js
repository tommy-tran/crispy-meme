import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

const Header = props => {
  return (
    <div className="Header">
      <span className="Header__Logo"><i className="far fa-trophy-alt" /></span>
      <div className="Header__Name">Crispy Leaderboards</div>
      <ul className="Header__Options">
        <Link style={{textDecoration: 'none', color: 'white', marginRight: '20px'}} to="/create">CREATE</Link>
        {/* <li>Logout</li> */}
      </ul>
    </div>
  );
};

export default Header;
