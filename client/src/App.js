import React, { Component } from 'react';
import './App.css';

import Dashboard from './components/Dashboard/Dashboard';
import Landing from './components/Landing/Landing';
import Header from './components/Header/Header';
import Login from './components/Login/Login';


import { Route, Switch } from 'react-router-dom';

class App extends Component {
  render() {
    /**
     * Landing, Header, Login page, Profile page(reset password, change email)
     * Panel(create lb, delete lbs, view lbs(add,delete,modify users)), Userlist(User)
     */
    return (
      <div>
        <Header />
        <Switch>
          <Route path="/" exact component={Landing} />
          <Route path="/login" component={Login} />
          <Route path="/dashboard" component={Dashboard} />
        </Switch>
      </div>
    );
  }
}

export default App;
