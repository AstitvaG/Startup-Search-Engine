import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";


export default class Navbar extends Component {

    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }

    logout() {
        window.localStorage.setItem('name', null);
        window.localStorage.setItem('email', null);
        window.localStorage.setItem('token', null);
        window.location.replace("/");
    }

    render() {
        return (
            <nav id="main_nav" className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top rounded-pill m-2 mt-4 p-4 shadow-lg h3">
                <div className="container-fluid">
                    <ul className="navbar-nav mr-auto navbar-left">
                        <li className="nav-item active">
                            <a href="/" className="nav-link">Stealth Mode<span className="sr-only">(current)</span></a>
                        </li>
                    </ul>
                    <button className="navbar-toggler" type="button" onClick={this.toggle} data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="navbar collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto navbar-left">
                        </ul>
                        <ul className="navbar-nav navbar-right">
                            <li className="nav-item">
                                <a href="/search" className="nav-link" href="/enter">Hey <strong>{window.localStorage.getItem('name')}</strong> !</a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Account
                            </a>
                                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                                    <a className="dropdown-item" href="#" onClick={this.logout}>Logout</a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}