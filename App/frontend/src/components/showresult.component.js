import React, { Component } from 'react';
import axios from 'axios';
import queryString from "query-string";
import Navbar from "./navbar.component";

export default class Showresult extends Component {

    constructor(props) {
        super(props);
        this.state = {result: []}
    }
    componentDidMount() {
        axios.get('http://localhost:4000/showresult')
             .then(response => {
                 this.setState({result: response.data});
             })
             .catch(function(error) {
                 console.log(error);
             })
    }
    render()
    {
        return (
            <div>
                <table className="table table-striped">
                        
                    <Navbar />
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
                                    <td>{currentUser.title}</td>
                                    <td>{currentUser.address}</td>
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
