import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import UsersList from './components/users-list.component'
import CreateUser from './components/create-user.component'
import MainSearch from './components/search-main.component'
import MainSearch2 from './components/search-mainnew.component'
import Showresult from './components/showresult.component'
import Viewdetails from './components/viewdetails.component'
import Allsearches_ind from './components/allsearches_ind.component'
import Previoussearches from './components/previoussearches.component'
import Previoussearchesnew from './components/previoussearchesnew.component'
import LoginGoogle from './components/login-google.component'


function App() {


  return (
    <Router>
      <div className="container">
        {/* <Route path="/search" exact component={MainSearch} /> */}
        <Route path="/showresult" exact component={Showresult} />
        <Route path="/previoussearches" exact component={Previoussearchesnew} />
        <Route path="/" exact component={LoginGoogle} />
        <Route path="/users" exact component={UsersList} />
        <Route path="/create" component={CreateUser} />
        <Route path="/allsearches_ind" exact component={Allsearches_ind} />
      </div>
      {/* Keep this out of container only */}
      <Route path="/search" exact component={MainSearch2} />
      <Route path="/viewdetails" exact component={Viewdetails} />
    </Router>
  );
}

export default App;
