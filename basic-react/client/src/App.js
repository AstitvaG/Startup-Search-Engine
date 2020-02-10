import React, { Component } from 'react';
import ReactDOM from "react-dom";

import './App.css';

class App extends Component {
  state = {
    response: '',
    post: '',
    responseToPost: '',
  };
  
  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  }
  
  callApi = async () => {
    const response = await fetch('/api/hello');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    
    return body;
  };

  searchHandler() {
    ReactDOM.render(document.getElementById("search").value+" "+document.getElementById("region").value,document.getElementById("output"));
  }

  myLists = ["A", "B", "C", "D", "E"]
  listitems = this.myLists.map((mylist)=><option value={mylist} />)
  
  handleSubmit = async e => {
    e.preventDefault();
    const response = await fetch('/api/world', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ post: this.state.post }),
    });
    const body = await response.text();
    
    this.setState({ responseToPost: body });
  };
  
render() {
    return (
      <div className="App">
        <div>
          <ul>
            <li><a href="/auth/google">Google Login</a></li>
            <li><a href="/secret">Secret</a></li>
            <li><a href="/logout">Logout</a></li>
          </ul>
          <input type="text" id="search" placeholder="Search.."></input>
          <br />
          <input list="regionData" id="region" />
          <datalist id="regionData">
            {this.listitems}
          </datalist>
          <br />
          <button onClick={this.searchHandler}>Search</button>
          <div id="output"></div>
	      </div>
        <p>{this.state.response}</p>
        <form onSubmit={this.handleSubmit}>
          <p>
            <strong>Post to Server:</strong>
          </p>
          <input
            type="text"
            value={this.state.post}
            onChange={e => this.setState({ post: e.target.value })}
          />
          <button type="submit">Submit</button>
        </form>
        <p>{this.state.responseToPost}</p>
      </div>
    );
  }
}


export default App;