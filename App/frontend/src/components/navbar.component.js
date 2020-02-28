import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";


export default class Navbar extends Component {

    constructor(props) {
        super(props);
    }


    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a href="/" className="navbar-brand">App</a>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                    <li className="navbar-item">
                        <a href="/search" className="nav-link">Search</a>
                    </li>
                    <li className="navbar-item">
                        <a href="/" className="nav-link">Log In</a>
                    </li>
                    <li className="navbar-item">
                        <a href="/create" className="nav-link">Create User</a>
                    </li>
                    </ul>
                </div>
            </nav>
        )
    }
}