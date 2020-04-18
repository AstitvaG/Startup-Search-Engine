import React, { Component } from 'react';
import axios from 'axios';
import queryString from "query-string";
import Navbar from "./navbar.component";

export default class Viewdetails extends Component {

    constructor(props) {
        super(props);
        this.state = {}
     }
    componentDidMount() {
        document.body.style.background='#444'
    }
    render() {
        return (
            <div className="container container-fluid">
                <Navbar />
                <p>showing more details</p>
                </div>
        )
    };
}