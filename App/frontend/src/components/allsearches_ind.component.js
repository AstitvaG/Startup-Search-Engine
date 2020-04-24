import React, { Component } from 'react';
import axios from 'axios';
import queryString from "query-string";
import SearchLayout from "./search-layout.component";
import Navbar from "./navbar.component";
import bgimage from "./bg4.png"


export default class Allsearchesind extends Component {

    constructor(props) {
        super(props);
        this.state = { result: [] }
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
        //    console.log("Domains:", decodeURI(page_type));
        if (alldomains[0] == "null" && alldomains.length == 1) alldomains = [""]
        // else {
        //     alldomains = alldomains.map(function (x) { return x.toUpperCase() })
        //     var final = new Set(alldomains)
        //     var newx = JSON.parse(decodeURI(page_type))
        //     for (var i in newx) {
        //         final.add(newx[i].toUpperCase())
        //     }
        //     alldomains = Array.from(final)
        // }
        return alldomains;
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
                    <p className="display-2 text-light" style={{textShadow:"3px 3px 100px"}} align="center">
                        <strong><b>Search History</b></strong>
                    </p>
                </div>
                <div className="row justify-content-md-center">

                    <button className="rounded-pill btn btn-dark glogin mx-2" onClick={this.onClick}>
                        Add new Search
                </button>
                    <button className="rounded-pill btn btn-dark glogin mx-2" onClick={this.Drop}>
                        Clear Search History
                </button>
                </div>
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