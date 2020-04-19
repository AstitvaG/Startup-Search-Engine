import React, { Component } from 'react';
import axios from 'axios';
import queryString from "query-string";
import Navbar from "./navbar.component";

export default class Previoussearches extends Component {

    constructor(props) {
        super(props);
        this.state = { result: [] }
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
    onShow(e,val) {
        const show = {
            id: e,
            val: val
        }
        axios.post('http://localhost:4000/show', show)
            .then(function (res) {
                window.location = '/showresult'
            })
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
                    this.state.result.length > 0 &&
                    <table className="table">
                        <thead>
                            {
                                <tr >
                                    <th className="fit w-0"><p className="text-white">S.No</p></th>
                                    <th className="fit w-0"><p className="text-white">Search</p></th>
                                    <th className="fit w-0"><p className="text-white">Show Search Result</p></th>
                                </tr>
                            }
                        </thead>
                        <tbody>
                            {
                                this.state.result.map((currentUser, i) => {
                                    return (
                                        <tr key={i}>
                                            <td className="fit w-0"><p className="text-white">{i + 1}</p></td>
                                            <td className="fit w-0"><p className="text-white">{currentUser.searchval}</p></td>
                                            <td className="fit w-0"><p className="text-white">
                                                <button class="btn glogin btn-outline-success my-2 my-sm-0" onClick={e => this.onShow(currentUser._id,currentUser.searchval)}>
                                                    Show Result
                                                </button>
                                            </p>
                                            </td>

                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
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