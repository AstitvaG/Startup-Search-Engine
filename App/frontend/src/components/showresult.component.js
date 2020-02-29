import React, { Component } from 'react';
import axios from 'axios';
import queryString from "query-string";
import Navbar from "./navbar.component";

export default class Showresult extends Component {

    constructor(props) {
        super(props);
        this.state = { result: [] }
    }
    componentDidMount() {
        axios.get('http://localhost:4000/showresult')
            .then(response => {
                this.setState({ result: response.data });
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    render() {
        return (
            <div>
                <Navbar />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <table className="table table-striped">

                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.result.map((currentUser, i) => {
                                return (
                                    <tr>
                                        <td><p class="text-white">{currentUser.title}</p></td>
                                        <td><p class="text-white">{currentUser.address}</p></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}
