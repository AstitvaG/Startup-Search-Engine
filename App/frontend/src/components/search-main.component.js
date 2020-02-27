import React, { Component } from 'react';
import axios from 'axios';
import queryString from "query-string";
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
        var query = queryString.parse(this.props.location.search);
        if (query.token) {
            window.localStorage.setItem("jwt", query.token);
            alert(query.token);
            console.log(query.token)
            this.props.history.push("/");
        }
    }

    myLists = ["A", "B", "C", "D", "E"]
    listitems = this.myLists.map((mylist) => <option value={mylist} />)

    onChangeSearch(e) {
        this.setState({ search: e.target.value });
    }

    onChangeRegion(e) {
        this.setState({ region: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        if (this.state.search && this.state.region) {
            alert(this.state.region + " " + this.state.search);
            this.setState({
                response: this.state.region + ":" + this.state.search
            })
        } else alert("Invalid input")
    }

    render() {
        return (
            <div className="App">
                <form onSubmit={this.onSubmit}>
                    <input type="text" id="search" placeholder="Search.." onChange={this.onChangeSearch}></input>
                    <br />
                    <input list="regionData" id="region" placeholder="Region" onChange={this.onChangeRegion} />
                    <datalist id="regionData">
                        {this.listitems}
                    </datalist>
                    <br />
                    <button type="submit">Search</button>
                    <div id="output">
                        {this.state.response}
                    </div>
                </form>
            </div>
        )
    }
}