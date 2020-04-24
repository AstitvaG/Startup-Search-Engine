import React, { Component } from 'react';
import axios from 'axios';
import queryString from "query-string";
import SearchLayout from "./search-layout.component";
import Navbar from "./navbar.component";
import bgimage from "./bg4.png"


export default class Allsearchesind extends Component {

    constructor(props) {
        super(props);
        this.state = { result: [], sort_type: "Date" }
    }
    componentDidMount() {
        document.body.style.backgroundImage = `url(${bgimage})`
        document.body.style.backgroundPosition = 'center'
        document.body.style.backgroundSize = 'cover'
        document.body.style.backgroundAttachment = 'fixed'
        document.body.style.backgroundRepeat = 'no-repeat'
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
    Drop() {
        axios.get('http://localhost:4000/drop')
            .then(response => {
                window.location.reload(true);
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    getdomains(alldomains) {
        var temp = [];
        var alldomains = (alldomains + "").split(",")
        if (alldomains[0] == "null" && alldomains.length == 1) alldomains = [""]
        return alldomains;
    }

    sortvalues(products) {
        var sortable = [];
        for (var product in products) {
            sortable.push(products[product]);
        }

        if (window.localStorage.getItem("sort_type") == "Date") {
            return (sortable.sort((a, b) => a.time > b.time ? -1 : (a.time < b.time ? 1 : 0)));
        }
        else if (window.localStorage.getItem("sort_type") == "Size") {
            return (sortable.sort((a, b) => b.size_employees.split("-")[0] - a.size_employees.split("-")[0]));
        }
        else if (window.localStorage.getItem("sort_type") == "Name") {
            return (sortable.sort((a, b) => a.name < b.name ? -1 : (a.name > b.name ? 1 : 0)));
        }

        return products;
    }

    gg(e) {
        window.localStorage.setItem("sort_type",e)
        window.location.reload(true);
    }

    render() {
        return (
            <div className="container container-fluid">
                <Navbar className="acrylic acrylic4" />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <div className="container-fluid m-auto d-block">
                    <p className="display-2 text-light" style={{ textShadow: "3px 3px 100px" }} align="center">
                        <strong><b>Search History</b></strong>
                    </p>
                </div>
                <div className="row justify-content-md-center">

                    <button className="rounded-pill btn btn-dark glogin mx-2" onClick={this.onClick}>
                        Add new Search
                    </button>

                    <div className="dropdown">
                        <button className="rounded-pill btn btn-dark glogin dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Sort by: {window.localStorage.getItem("sort_type")}
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <a className="dropdown-item" href="#" onClick={e => this.gg("Name")}>Name</a>
                            <a className="dropdown-item" href="#" onClick={e => this.gg("Size")}>Number of employees</a>
                            <a className="dropdown-item" href="#" onClick={e => this.gg("Date")}>Date</a>
                        </div>
                    </div>
                    <button className="rounded-pill btn btn-dark glogin mx-2" onClick={this.Drop}>
                        Clear Search History
                    </button>
                </div>
                <br />
                <br />
                <br />
                {
                    this.state.result.length > 0 &&
                    this.sortvalues(this.state.result).map((currentUser, i) => {
                        return (
                            <div>
                                <SearchLayout key={i}
                                    name={currentUser.name}
                                    description={currentUser.description}
                                    image={currentUser.image}
                                    domains={JSON.stringify(this.getdomains(currentUser.domains))}
                                    url={currentUser.website}
                                    className="bg-light" />
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