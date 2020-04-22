import React, { Component } from 'react';
import axios from 'axios';
import queryString from "query-string";
import SearchLayout from "./search-layout.component";
import Navbar from "./navbar.component";

export default class Allsearchesind extends Component {

    constructor(props) {
        super(props);
        this.state = { result: [] }
    }
    componentDidMount() {
        document.body.style.background = '#444'

        axios.get('http://localhost:4000/allsearches_ind')
        .then(response => {
            console.log(response);
            this.setState({ result: response.data });
        })
        .catch(function (error) {
            console.log(error);
        })
    
    }
    onClick() {
        window.location = '/search';
    }
    Drop(){
        axios.get('http://localhost:4000/drop')
        .then(response => {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        })
    }
    render() {
        return (
            <div className="container container-fluid">
                <Navbar />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <button className="rounded-pill btn btn-dark glogin" onClick={this.onClick}>
                    Add new Search
                                </button>
                <br />
                <br />
                <button className="rounded-pill btn btn-dark glogin" onClick={this.Drop}>
                    Clear Search History
                                </button>
                <br />
                <br />
                <br />
                {
                    this.state.result.length > 0 &&
                    this.state.result.map((currentUser, i) => {
                            return (
                                <div>
                                    <SearchLayout key={i}
                                        name={currentUser.name}
                                        description={currentUser.description}
                                        image={currentUser.image}
                                        domains='[]'
                                        url={currentUser.website} />
                                </div>
                            )
                    })
                   
                }
                {
                    !this.state.result.length > 0 &&
                    <p>
                        <font color="white">
                            <h3>
                                You have no previous searches !
                            </h3>
                        </font>
                    </p>
                }
            </div>

        )
    }
}