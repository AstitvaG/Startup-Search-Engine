import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import UsersList from './components/users-list.component'
import CreateUser from './components/create-user.component'
import MainSearch from './components/search-main.component'
import Showresult from './components/showresult.component'
import LoginGoogle from './components/login-google.component'

function checkLogin() {
  if (window.localStorage.getItem("username")!=="null")
    return MainSearch;
  else return LoginGoogle;
}

function App() {
  return (
    <Router>
      <div className="container">
        <Route path="/search" exact component={MainSearch} />
        <Route path="/showresult" exact component={Showresult} />
        <Route path="/" exact component={checkLogin()} />
        <Route path="/users" exact component={UsersList} />
        <Route path="/create" component={CreateUser} />
      </div>
    </Router>
  );
}

export default App;
