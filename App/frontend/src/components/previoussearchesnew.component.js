import React, { Component } from 'react';
import axios from 'axios';
import queryString from "query-string";
import Navbar from "./navbar.component";
import "./previoussearchesnew.component.css"
import bgimage from "./bg4.png"
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
            window.localStorage.setItem("picture", decodeURI(obj.picture));
            // console.log("picture:",decodeURI(obj.picture))
            this.props.history.push("/previoussearches");
        }
        // document.body.style.background = '#444'
        document.body.style.backgroundImage = `url(${bgimage})`
        document.body.style.backgroundPosition = 'center'
        document.body.style.backgroundSize = 'cover'
        document.body.style.backgroundAttachment = 'fixed'
        document.body.style.backgroundRepeat = 'no-repeat'
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
        window.location = '/showresult?id=' + encodeURI(e) + '&val=' + encodeURI(val)
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
                <Navbar className="acrylic acrylic4"/>
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <button className="rounded-pill btn-lg btn-dark glogin" onClick={this.onClick}>
                    Add new Search <i class="fas fa-search"></i>
                </button>
                <br />
                <br />
                <br />
                {
                    this.state.result.map((currentUser, i) => {
                        return (
                            <div key={i} className={"container-fluid acrylic acrylic4 text-light rounded-xlg m-2 my-3 p-4 parent-cont"}
                                onMouseEnter={() => this.displayitems(true, i)}
                                onMouseLeave={() => this.displayitems(false, i)}>
                                <div className="row" >

                                    <div className="w-50 h-100 mx-3 my-auto" >
                                        { /* Company Name */}
                                        <p className="h2">
                                            {currentUser.searchval.split(":")[1]!=null ? currentUser.searchval.split(":")[1] : "All"} <i class="fas fa-arrow-right"></i>
                                            {currentUser.searchval.split(":")[3]!=null ? currentUser.searchval.split(":")[3] : "All"}
                                        </p>
                                    </div>
                                    <div className="col m-auto d-block" >
                                        <button className="btnx m-auto d-block" onClick={e => this.onShow(currentUser._id, currentUser.searchval)}>
                                            <span className="circle">
                                                <span className="icon arrow"></span>
                                            </span>
                                            <div className="button-text h-100">
                                                <p className="d-block my-auto text-light" align="center">Show Result</p>
                                            </div>
                                        </button>
                                        { /* Domain(s) */}
                                        <div className="row">
                                            {/* {this.getdomains()} */}
                                        </div>
                                    </div>
                                </div>
                                <Collapse isOpened={this.state.display == i}>
                                    <div>
                                        <p>{currentUser.time.split("T")[0]}</p>
                                        <p>{currentUser.count} Matching Results Found</p>
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