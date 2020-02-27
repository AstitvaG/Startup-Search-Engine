import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import UsersList from './components/users-list.component'
import CreateUser from './components/create-user.component'
import MainSearch from './components/search-main.component'
import LoginGoogle from './components/login-google.component'


function App() {
  

  return (
    <Router>
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link to="/" className="navbar-brand">App</Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="navbar-item">
                <Link to="/" className="nav-link">Users</Link>
              </li>
              <li className="navbar-item">
                <Link to="/create" className="nav-link">Create User</Link>
              </li>
            </ul>
          </div>
        </nav>

        <br />
        <Route path="/" exact component={MainSearch} />
        <Route path="/login" exact component={LoginGoogle} />
        <Route path="/users" exact component={UsersList} />
        <Route path="/create" component={CreateUser} />
      </div>
    </Router>
  );
}

export default App;
