import React, { Component } from 'react';
import axios from 'axios';
import queryString from "query-string";
import Navbar from "./navbar.component";

export default class Previoussearches extends Component {

    constructor(props) {
        super(props);
        this.state = { result: [] }
    }
    componentDidMount() {
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
            <table className="table">
                <thead>
                    {
                                    <tr >
                                        <th className="fit w-0"><p className="text-white">S.No</p></th>
                                        <th className="fit w-0"><p className="text-white">Search</p></th>
                                    </tr>
                                
                        
                    }
                </thead>
                <tbody>
                    {
                        this.state.result.map((currentUser, i) => {
                                return (
                                    <tr key={i}>
                                        <td className="fit w-0"><p className="text-white">{i+1}</p></td>
                                        <td className="fit w-0"><p className="text-white">{currentUser.searchval}</p></td>
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