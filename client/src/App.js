import React, { Component } from 'react';
import { withRouter, Route, Switch } from 'react-router-dom';

import CreateForm from './components/CreateForm/CreateForm';
import Dashboard from './components/Dashboard/Dashboard';
import Landing from './components/Landing/Landing';
import NoMatch from './components/NoMatch/NoMatch';
import Header from './components/Header/Header';
import About from './components/About/About';
// import Login from './components/Login/Login';

import { connect } from 'react-redux';
import { loadLeaderboard } from './actions/leaderboard';

class App extends Component {
  componentDidMount() {
    this.props.loadLocal();
  }

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
          <Route path="/about" exact component={About} />
          <Route path="/create" exact component={CreateForm} />
          <Route path="/dashboard" exact component={Dashboard} />
          <Route component={NoMatch} />
          {/* <Route path="/login" component={Login} /> */}
        </Switch>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadLocal: () => dispatch(loadLeaderboard)
  };
};

export default withRouter(connect(null, mapDispatchToProps)(App));
