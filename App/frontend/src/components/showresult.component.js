import React, { Component } from 'react';
import axios from 'axios';
import queryString from "query-string";
import Navbar from "./navbar.component";
import SearchLayout from "./search-layout.component";

export default class Showresult extends Component {

    constructor(props) {
        super(props);
        this.state = { result: [], searchval: "" }
        // this.onViewdetails = this.onViewdetails.bind(this);

    }
    componentDidMount() {
        document.body.style.background = '#444'
        axios.get('http://localhost:4000/show/showresult')
            .then(response => {
                console.log("response:", response)
                this.setState({ result: response.data.body, searchval: response.data.val });
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
                <div className="container-fluid m-auto d-block">
                    <p className="display-2 text-light" align="center">
                        <strong><b>Search Result</b></strong>
                    </p>
                    <p className="h1 text-light" align="center">
                        <small>
                            {this.state.searchval.split(":")[1]} <i class="fas fa-arrow-right"></i>
                            {this.state.searchval.split(":")[3]}
                        </small>
                    </p>
                </div>
                <br />
                <br />
                {
                    this.state.result.map((currentUser, i) => {
                        if (currentUser.c1)
                            return (
                                <div>
                                    <SearchLayout key={i}
                                        name={currentUser.title}
                                        description={currentUser.c1.split(":")[1]}
                                        image={currentUser.c4.split("@")[1].split("(")[1] ? currentUser.c4.split("@")[1].split("(")[1].split(")")[0]: "  "}
                                        domains={currentUser.c2.split(":")[1]}
                                        url={currentUser.c3.split("@")[1]} />
                                </div>
                            )
                    })
                }
            </div>
        )
    }
}
