import React, { Component } from 'react';
import axios from 'axios';
import queryString from "query-string";
import Navbar from "./navbar.component";
import SearchLayout from "./search-layout.component";

export default class Showresult extends Component {

    constructor(props) {
        super(props);
        this.state = { result: [] }
        this.onViewdetails = this.onViewdetails.bind(this);

    }
    componentDidMount() {
        document.body.style.background = '#444'
        axios.get('http://localhost:4000/show/showresult')
            .then(response => {
                this.setState({ result: response.data });
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    onViewdetails(e,f) {
        const show = {
            id: e
        }
        axios.post('http://localhost:4000/viewdetails', show)
            .then(function (res) {
              //  console.log(res.data)
                localStorage.setItem("viewdetails",f);
                //console.log("ok cool fine yes")
    
              window.location = '/viewdetails'

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
                    <p className="display-1 text-light" align="center">
                        <strong><b>Search Result</b></strong>
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
                                    image={currentUser.c4.split("@")[1].split("(")[1].split(")")[0]}
                                    domains={currentUser.c2.split(":")[1]} />
                                   <div>
                                   <button class="btn glogin btn-outline-success my-2 my-sm-0" onClick={e => this.onViewdetails(currentUser.c3.split(":")[1],currentUser._id)}>
                                    View Details
                        </button>
                        </div>
                            </div>
                            )}
                    )}
            </div>
        )
    }
}
