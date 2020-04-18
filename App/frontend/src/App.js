import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import UsersList from './components/users-list.component'
import CreateUser from './components/create-user.component'
import MainSearch from './components/search-main.component'
import Showresult from './components/showresult.component'
import Previoussearches from './components/previoussearches.component'
import LoginGoogle from './components/login-google.component'
import SearchLayout from './components/search-layout.component'


function App() {
  

  return (
    <Router>
      <div className="container">
      <Route path="/search" exact component={MainSearch} />
        <Route path="/showresult" exact component={Showresult} />
        <Route path="/previoussearches" exact component={Previoussearches} />
        <Route path="/" exact component={LoginGoogle} />
        <Route path="/users" exact component={UsersList} />
        <Route path="/create" component={CreateUser} />
        <Route path="/ls" component={SearchLayout} />
      </div>
    </Router>
  );
}

export default App;
