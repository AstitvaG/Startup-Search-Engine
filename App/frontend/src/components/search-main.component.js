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
            region: '',
            search: '',
            response: ''
        }


        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeSearch = this.onChangeSearch.bind(this);
        this.onChangeRegion = this.onChangeRegion.bind(this);
    }

    componentDidMount() {
        // document.body.style.background='#999 '
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
    listitems = this.myLists.map((mylist) => <option value={mylist} />)

    onChangeSearch(e) {
        this.setState({ search: e.target.value });
    }

    onChangeRegion(e) {
        this.setState({ region: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        if (this.state.search === "School" && this.state.region === "Hyderabad") {
            console.log("email:", window.localStorage.getItem("email"))
            axios.post('http://localhost:4000/schools', {
                userid: window.localStorage.getItem("email")
            })
                .then(response => {
                    window.location = '/showresult';
                    // this.setState({ result: response.data });
                })
                .catch(function (error) {
                    console.log(error);
                })
            // axios.get('http://localhost:4000/schools')
            //     .then(response => {
            //     })
            //     .catch(function (error) {
            //         console.log(error);
            //     })
            // alert(this.state.region + " " + this.state.search);
            // this.setState({
            //     response: this.state.region + ":" + this.state.search
            // })
        } else alert("Invalid input")
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
                                <input className="form-control rounded-pill" list="regionData" id="region" placeholder="Region" onChange={this.onChangeRegion} />
                                <datalist id="regionData">
                                    {this.listitems}
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