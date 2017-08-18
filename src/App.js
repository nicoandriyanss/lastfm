import React, { Component } from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import Navbar from './components/navbar';
import Home from './containers/home';
import Page1 from './containers/page1';
import Page2 from './containers/page2';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
      <Router>
      <div>
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Last FM Artists Finder</h2>
        </div>
          <Navbar />
          <Switch>
              <Route exact path="/" component={Page1} />
              <Route path="/artist" component={Page2} />
              <Route component={Comp404} />
            </Switch>
        </div>
      </Router>
      </div>
    );
  }
}

function Comp404() {
  return (
    <div>
      Page not found
    </div>
  );
}

export default App;
