import React, { Component } from 'react';
import axios from 'axios';
import queryString from "query-string";
import Navbar from "./navbar.component";
import SearchLayout from "./search-layout.component";

export default class Showresult extends Component {

    constructor(props) {
        super(props);
        this.state = { result: [] }
    }
    componentDidMount() {
        document.body.style.background = '#444'
        axios.get('http://localhost:4000/show/showresult')
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
                {/* <table className="table">
                    <thead>
                        {
                            this.state.result.map((currentUser, i) => {
                                if (currentUser.c1 && i==0)
                                    return (
                                        <tr key={i}>
                                            <th className="fit w-0"><p className="text-white">Title</p></th>
                                            {
                                                currentUser.c1 &&
                                                <th className="fit w-0"><p className="text-white">{currentUser.c1.split(":")[0]}</p></th>
                                            }
                                            {
                                                currentUser.c2 &&
                                                <th className="fit w-0"><p className="text-white">{currentUser.c2.split(":")[0]}</p></th>
                                            }
                                            {
                                                currentUser.c3 &&
                                                <th className="fit w-0"><p className="text-white">{currentUser.c3.split(":")[0]}</p></th>
                                            }
                                            {
                                                currentUser.c4 &&
                                                <th className="fit w-0"><p className="text-white">{currentUser.c4.split(":")[0]}</p></th>
                                            }
                                            {
                                                currentUser.c5 &&
                                                <th className="fit w-0"><p className="text-white">{currentUser.c5.split(":")[0]}</p></th>
                                            }
                                            {
                                                currentUser.c6 &&
                                                <th className="fit w-0"><p className="text-white">{currentUser.c6.split(":")[0]}</p></th>
                                            }
                                            {
                                                currentUser.c7 &&
                                                <th className="fit w-0"><p className="text-white">{currentUser.c7.split(":")[0]}</p></th>
                                            }
                                            {
                                                currentUser.c8 &&
                                                <th className="fit w-0"><p className="text-white">{currentUser.c8.split(":")[0]}</p></th>
                                            }
                                            {
                                                currentUser.c9 &&
                                                <th className="fit w-0"><p className="text-white">{currentUser.c9.split(":")[0]}</p></th>
                                            }
                                            {
                                                currentUser.c10 &&
                                                <th className="fit w-0"><p className="text-white">{currentUser.c10.split(":")[0]}</p></th>
                                            }
                                        </tr>
                                    )
                            })
                        } */}
                {/* <tr>
                            <th>Title</th>
                            <th>Title</th>
                            <th>Title</th>
                            <th>Title</th>
                            <th>Title</th>
                            <th>Title</th>
                            <th>Title</th>
                            <th>Title</th>
                            <th>Title</th>
                            <th>Title</th>
                            <th>Title</th>
                            <th>Title</th>
                            <th>Title</th>
                        </tr> */}
                {/* </thead> */}
                {/* </table> */}
                {/* <tbody> */}
                <div className="container-fluid m-auto d-block">
                    <p className="display-1 text-light" align="center">
                        <strong><b>SearchLayout</b></strong>
                    </p>
                </div>
                <br />
                <br />
                {
                    this.state.result.map((currentUser, i) => {
                        if (currentUser.c1)
                            return (
                                <SearchLayout key={i}
                                    name={currentUser.title}
                                    description={currentUser.c1.split(":")[1]}
                                    image={currentUser.c4.split("@")[1].split("(")[1].split(")")[0]}
                                    domains={currentUser.c2.split(":")[1]} />
                                // <tr key={i}>
                                //     <td className="fit w-0"><p className="text-white">{currentUser.title}</p></td>
                                //     {
                                //         currentUser.c1 && currentUser.c1.split(":")[1] &&
                                //         <td className="fit w-0"><p className="text-white">{currentUser.c1.split(":")[1]}</p></td>
                                //     }
                                //     {
                                //         currentUser.c2 && currentUser.c2.split(":")[1] &&
                                //         <td className="fit w-0"><p className="text-white">{currentUser.c2.split(":")[1]}</p></td>
                                //     }
                                //     {
                                //         currentUser.c3 && currentUser.c3.split(":")[1] &&
                                //         <td className="fit w-0"><p className="text-white">{currentUser.c3.split(":")[1]}</p></td>
                                //     }
                                //     {
                                //         currentUser.c4 && currentUser.c4.split(":")[1] &&
                                //         <td className="fit w-0"><p className="text-white">{currentUser.c4.split(":")[1]}</p></td>
                                //     }
                                //     {
                                //         currentUser.c5 && currentUser.c5.split(":")[1] &&
                                //         <td className="fit w-0"><p className="text-white">{currentUser.c5.split(":")[1]}</p></td>
                                //     }
                                //     {
                                //         currentUser.c6 && currentUser.c6.split(":")[1] &&
                                //         <td className="fit w-0"><p className="text-white">{currentUser.c6.split(":")[1]}</p></td>
                                //     }
                                //     {
                                //         currentUser.c7 && currentUser.c7.split(":")[1] &&
                                //         <td className="fit w-0"><p className="text-white">{currentUser.c7.split(":")[1]}</p></td>
                                //     }
                                //     {
                                //         currentUser.c8 && currentUser.c8.split(":")[1] &&
                                //         <td className="fit w-0"><p className="text-white">{currentUser.c8.split(":")[1]}</p></td>
                                //     }
                                //     {
                                //         currentUser.c9 && currentUser.c9.split(":")[1] &&
                                //         <td className="fit w-0"><p className="text-white">{currentUser.c9.split(":")[1]}</p></td>
                                //     }
                                //     {
                                //         currentUser.c10 && currentUser.c10.split(":")[1] &&
                                //         <td className="fit w-0"><p className="text-white">{currentUser.c10.split(":")[1]}</p></td>
                                //     }
                                // </tr>
                            )
                    })
                }
                {/* </tbody> */}
                {/* </table> */}
            </div>
        )
    }
}
