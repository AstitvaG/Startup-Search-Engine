import React, { Component } from 'react';
import axios from 'axios';
import queryString from "query-string";
import Navbar from "./navbar.component";
// import './search-main.component.css';

const { OAuth2Client } = require('google-auth-library');
const client = [];


export default class MainSearch extends Component {

    constructor(props) {
        super(props);

        this.state = {
            country: '',
            search: '',
            response: '',
            dom: ''
        }


        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeSearch = this.onChangeSearch.bind(this);
        this.onChangeCountry = this.onChangeCountry.bind(this);
        this.onChangeDomain = this.onChangeDomain.bind(this);
    }

    componentDidMount() {
        // document.body.style.background='#999'
        var query = queryString.parse(this.props.location.search);
        if (query.token) {
            var obj = JSON.parse(query.token)
            window.localStorage.setItem("token", obj.token);
            window.localStorage.setItem("name", obj.name);
            window.localStorage.setItem("email", obj.email);
            this.props.history.push("/search");
        }
    }

    myLists = ["Hyderabad"]
    myCountries = ["India", "Cannada"]
    listCountries = this.myCountries.map((mylist) => <option value={mylist} />)
    myDomains = ["AI", "Health"]
    listDomains = this.myDomains.map((mylist) => <option value={mylist} />)
    

    onChangeSearch(e) {
        this.setState({ search: e.target.value });
    }

    onChangeCountry(e) {
        this.setState({ country: e.target.value });
    }

    onChangeDomain(e) {
        this.setState({ dom: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        if (this.state.search === "School" && this.state.region === "Hyderabad") {
            axios.post('http://localhost:4000/schools', {
                userid: window.localStorage.getItem("email"),
                searchval: this.state.search + ":" + this.state.dom + ":" + this.state.country
            })
                .then(response => {
                    window.location = '/previoussearches';
                    // this.setState({ result: response.data });
                })
                .catch(function (error) {
                    console.log(error);
                })
            }
                else if(this.state.search === "Startups" && this.state.region === "India") {
                    axios.post('http://localhost:4000/startups', {
                        userid: window.localStorage.getItem("email"),
                        searchval: this.state.search + ":" + this.state.region
                    })
                        .then(response => {
                            window.location = '/previoussearches';
                            // this.setState({ result: response.data });
                        })
                        .catch(function (error) {
                            console.log(error);
                        })
                }
           
         else alert("Invalid input")
    }

    render() {
        return (
            <div className="App" >
                <Navbar />
                <div className="row h-100">
                    <div className="col-sm-12 mx-auto my-auto">
                        <form onSubmit={this.onSubmit} style={{ display: "block", position: "absolute", top: 450, left: 500 }}>
                            <div className="form-group">
                                <input className="form-control rounded-pill" type="text" id="search" placeholder="Search.." onChange={this.onChangeSearch}></input>
                            </div>
                            <div className="form-group">
                                <input className="form-control rounded-pill" list="domainData" id="domain" placeholder="Domain" onChange={this.onChangeDomain} />
                                <datalist id="domainData">
                                    {this.listDomains}
                                </datalist>
                            </div>
                            <div className="form-group">
                                <input className="form-control rounded-pill" list="countryData" id="country" placeholder="Country" onChange={this.onChangeCountry} />
                                <datalist id="countryData">
                                    {this.listCountries}
                                </datalist>
                            </div>
                            <div className="form-group">
                                <button className="rounded-pill btn btn-dark" type="submit">Search</button>
                                <div id="output">
                                    {this.state.response}
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}