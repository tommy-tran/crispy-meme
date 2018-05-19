import React, { Component } from 'react';
import './App.css';

import Landing from './components/Landing/Landing';
import Header from './components/Header/Header';
import Login from './components/Login/Login';

class App extends Component {
  render() {
    /**
     * Landing, Header, Login page, Profile page(reset password, change email)
     * Panel(create lb, delete lbs, view lbs(add,delete,modify users)), Userlist(User)
     */
    return(
      <div>
        <Header />
        <Landing />
        <Login />
      </div>
    )
    
  }
}

export default App;
