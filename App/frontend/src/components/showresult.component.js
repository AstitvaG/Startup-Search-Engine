import React, { Component } from 'react';
import axios from 'axios';
import queryString from "query-string";
import Navbar from "./navbar.component";
import bgimage from "./bg4.png"
import SearchLayout from "./search-layout.component";

export default class Showresult extends Component {

    constructor(props) {
        super(props);
        this.state = { result: [], searchval: "" }
        // this.onViewdetails = this.onViewdetails.bind(this);

    }
    componentDidMount() {
        document.body.style.backgroundImage = `url(${bgimage})`
        document.body.style.backgroundPosition = 'center'
        document.body.style.backgroundSize = 'cover'
        document.body.style.backgroundAttachment = 'fixed'
        document.body.style.backgroundRepeat = 'no-repeat'
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const id = decodeURI(urlParams.get('id'))
        axios.post('http://localhost:4000/show/showresult', { id: id })
            .then(response => {
                console.log("response:", response)
                this.setState({ result: response.data.body, searchval: decodeURI(urlParams.get('val')) });
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    count_total = 0;

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
                        <strong><b>Search Result</b></strong>
                    </p>
                    <p className="h1 text-light" align="center">
                        <small>
                            {this.state.searchval.split(":")[1]} <i className="fas fa-arrow-right"></i>
                            {this.state.searchval.split(":")[3]}
                        </small>
                    </p>
                </div>
                <br />
                <br />
                {
                    // {var countnum=0}
                    this.state.result.map((currentUser, i) => {
                        if (currentUser.c1) {
                            var temp = currentUser.c4.split("@")[1].split("(")[1] ? currentUser.c4.split("@")[1].split("(")[1].split(")")[0] : " "
                            if (temp != " ") {
                                temp = temp.substring(1, temp.length - 1)
                            }
                            return (
                                <div>
                                    {
                                        currentUser.title &&
                                        <SearchLayout
                                            name={currentUser.title}
                                            description={currentUser.c1.split(":")[1]}
                                            image={temp}
                                            domains={currentUser.c2.split(":")[1]}
                                            url={currentUser.c3.split("@")[1]}
                                            className="bg-light" />
                                    }
                                </div>
                            )
                        }
                    })
                }
            </div>
        )
    }
}
