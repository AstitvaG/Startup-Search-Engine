import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";


export default class Navbar extends Component {

    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
        if (window.localStorage.getItem('name') == "null" && !window.location.href.includes('token')) this.logout();
    }

    logout() {
        window.localStorage.setItem('name', null);
        window.localStorage.setItem('email', null);
        window.localStorage.setItem('token', null);
        window.location.replace("/");
    }

    render() {
        return (
            <nav id="main_nav" className={"navbar navbar-expand-lg navbar-dark fixed-top rounded-pill m-2 mx-5 mt-4 p-2 shadow-lg h5 bg-dark " + this.props.className}>
                <div className="container-fluid">
                    <ul className="navbar-nav mr-auto navbar-left  my-auto form-inline">
                        <li className="nav-item active">
                            <a href="/previoussearches" className="nav-link h2" style={{ fontFamily: "qb" }}><strong>Stealth Mode</strong><span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item">
                            <a href="/allsearches_ind" className="nav-link">My Search History<span className="sr-only">(current)</span></a>
                        </li>
                    </ul>
                    <button className="navbar-toggler" type="button" onClick={this.toggle} data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="navbar collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto navbar-left"></ul>
                        <ul className="navbar-nav navbar-right my-auto form-inline">
                            <li className="nav-item">
                                <a className="nav-link" href="/previoussearches">Hey <strong>{window.localStorage.getItem('name')}</strong>!</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/previoussearches">
                                    <img style={{
                                        width: "30px",
                                        borderRadius: "50%"
                                    }} src={window.localStorage.getItem('picture')}></img>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#" onClick={this.logout}>Logout</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}