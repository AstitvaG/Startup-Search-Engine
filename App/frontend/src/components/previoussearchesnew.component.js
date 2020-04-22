import React, { Component } from 'react';
import axios from 'axios';
import queryString from "query-string";
import Navbar from "./navbar.component";
import "./previoussearchesnew.component.css"
import $ from 'jquery';
import { Collapse } from 'react-collapse';

export default class Previoussearches extends Component {

    constructor(props) {
        super(props);
        this.state = { result: [], display: -1 }
        this.onShow = this.onShow.bind(this);
        this.onClick = this.onClick.bind(this);
    }
    componentDidMount() {
        var query = queryString.parse(this.props.location.search);
        if (query.token) {
            var obj = JSON.parse(query.token)
            window.localStorage.setItem("token", obj.token);
            window.localStorage.setItem("name", obj.name);
            window.localStorage.setItem("email", obj.email);
            this.props.history.push("/previoussearches");
        }
        document.body.style.background = '#444'
        axios.post('http://localhost:4000/previoussearches', {
            userid: window.localStorage.getItem("email"),
        })
            .then(response => {
                this.setState({ result: response.data });
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    onClick() {
        window.location = '/search';
    }
    onShow(e, val) {
        // axios.post('http://localhost:4000/show', show)
        // .then(function (res) {
        window.location = '/showresult?id=' + encodeURI(e) + '&val=' + encodeURI(val)
        // })
    }

    displayitems(boolx, i) {
        if (boolx === true) {
            this.setState({ display: i });
            // $(".panel-collapse-" + i).show();
        }
        else {
            // $(".parent-cont").mouseleave(function () {
            this.setState({ display: -1 });
            // $(".panel-collapse-" + i).hide();
        }
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
                <br />
                {
                    this.state.result.map((currentUser, i) => {
                        return (
                            <div key={i} className={"container-fluid bg-light rounded-xlg m-2 my-3 p-4 parent-cont"}
                                onMouseEnter={() => this.displayitems(true, i)}
                                onMouseLeave={() => this.displayitems(false, i)}>
                                <div className="row" >

                                    <div className="w-50 h-100 mx-3 my-auto" >
                                        { /* Company Name */}
                                        <p className="h2">{currentUser.searchval}</p>
                                    </div>
                                    <div className="col m-auto d-block" >
                                        <button className="btnx m-auto d-block" onClick={e => this.onShow(currentUser._id, currentUser.searchval)}>
                                            <span className="circle">
                                                <span className="icon arrow"></span>
                                            </span>
                                            <div className="button-text h-100">
                                                <p className="d-block my-auto" align="center">Show Result</p>
                                            </div>
                                        </button>
                                        { /* Domain(s) */}
                                        <div className="row">
                                            {/* {this.getdomains()} */}
                                        </div>
                                    </div>
                                </div>
                                <Collapse isOpened={this.state.display==i}>
                                    <div>
                                        {currentUser.time}
                                    </div>
                                </Collapse>
                            </div >)
                    })
                }
                {
                    !this.state.result.length > 0 &&
                    <font color="white">
                        <h3>
                            You have no previous searches !
                            </h3>
                    </font>
                }
            </div>

        )
    }
}