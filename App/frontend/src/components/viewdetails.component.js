import React, { Component } from 'react';
import Navbar from "./navbar.component"
import basicimage from "./basic.png"
import bgimage from "./bg3.png"
import blackcircle from "./black-circle.png"
import detailsimg from "./details.png"
import ownersimg from "./owners.png"


export default class Viewdetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            domains: [
                "Accounts",
                "Class"
            ]
        }
    }
    componentDidMount() {
        document.body.style.backgroundImage = `url(${bgimage})`
        document.body.style.backgroundPosition = 'center'
        document.body.style.backgroundSize = 'cover'
        document.body.style.backgroundAttachment = 'fixed'
        document.body.style.backgroundRepeat = 'no-repeat'
        // document.body.style.fontFamily =
    }

    hashCode(str) { // java String#hashCode
        var hash = 0;
        for (var i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        return hash;
    }

    intToRGB(i) {
        var c = (i & 0x00FFFFFF)
            .toString(16)
            .toUpperCase();

        return "#" + "00000".substring(0, 6 - c.length) + c;
    }

    textcolor(bgColor, lightColor, darkColor) {
        var color = (bgColor.charAt(0) === '#') ? bgColor.substring(1, 7) : bgColor;
        var r = parseInt(color.substring(0, 2), 16); // hexToR
        var g = parseInt(color.substring(2, 4), 16); // hexToG
        var b = parseInt(color.substring(4, 6), 16); // hexToB
        return (((r * 0.299) + (g * 0.587) + (b * 0.114)) > 186) ?
            darkColor : lightColor;
    }

    onError = () => {
        if (!this.state.errored) {
            this.setState({
                url: basicimage,
            });
        }
    }

    getdomains() {
        var temp = [];
        for (var i = 0; i < this.state.domains.length; i++) {
            temp.push(<div className="rounded-pill p-2 m-1 text-capitalize fontx"
                style={
                    {
                        backgroundColor: this.intToRGB(this.hashCode(this.state.domains[i])),
                        color: this.textcolor(this.intToRGB(this.hashCode(this.state.domains[i])), '#FFFFFF', '#000000')
                    }
                } >
                <small>
                    {this.state.domains[i].toLowerCase()}
                </small>
            </div>)
        }
        return temp;
    }

    render() {
        return (
            <div className="w-100 container-fluid" >
                <Navbar />
                <br />
                <br />
                <br />
                <div class="container-fluid text-center">
                    <div class="row content rounded-xlg p-3" >

                        <div class="col-sm-3 acrylic rounded-xlg py-5 m-5 shadow-lg">
                            <img src={blackcircle} className="w-100 ovf"></img>
                            <div className="w-75 mx-auto d-block">
                                {/* Image here */}
                                <img src={basicimage}
                                    className="rounded-xlg mx-auto d-block w-75 shadow-lg"
                                    alt={this.props.name}
                                    onError={this.onError} />
                            </div>
                            {/* <div className="w-75 mx-auto my-3" >
                                <p className="h2" align="center">Select your university today</p>
                            </div> */}
                            <fieldset className="scheduler-border rounded-xlg w-75 mx-auto mb-3 mt-5" >
                                <legend class="scheduler-border">Location</legend>
                                <p align="center">Delhi <i class="fas fa-location-arrow"></i> India <i class="fas fa-globe-americas"></i></p>
                            </fieldset>
                            <fieldset className="scheduler-border rounded-xlg w-75 mx-auto mb-3" >
                                <legend class="scheduler-border">Foundation Date</legend>
                                <p align="center">Feb 20 2019 <i class="fas fa-birthday-cake"></i></p>
                            </fieldset>
                            <fieldset className="scheduler-border rounded-xlg w-75 mx-auto mb-3" >
                                <legend class="scheduler-border">Members</legend>
                                <p align="center">20m <i class="fas fa-users"></i></p>
                            </fieldset>
                            <fieldset className="scheduler-border rounded-xlg w-75 mx-auto mb-3" >
                                <legend class="scheduler-border">Ranking and Views</legend>
                                <p align="center">2.2m <i class="fas fa-medal"></i> and 2.2m <i class="fab fa-searchengin"></i></p>
                            </fieldset>

                            {/* <p><a href="#">Link</a></p>
                            <p><a href="#">Link</a></p>
                            <p><a href="#">Link</a></p> */}
                        </div>
                        <div class="col-sm-8 text-left align-items-end">
                            <div className="acrylic p-3 my-5 rounded-xlg shadow-lg">
                                <img src={detailsimg} className="w-25 ovfx"></img>
                                <div className="w-75 mx-auto d-block" >
                                    { /* Company Name */}
                                    <p className="display-4 fontx" align="center">Select your university</p>
                                </div>
                                <div className="mx-auto d-block" >
                                    { /* Domain(s) */}
                                    <div className="row justify-content-md-center">
                                        {this.getdomains()}
                                    </div>
                                </div>
                                <div className="container w-100 m-auto d-block" >
                                    <br />
                                    <p className="h4">
                                        {this.props.description}
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                    </p>
                                    <div className="w-100" align="center">
                                        <button type="button" class="btn btn-primary btn-circle btn-xl m-1">
                                            <p className="text-center h1">
                                                <i className="fab fa-facebook-f m-auto"></i>
                                            </p>
                                        </button>
                                        <button type="button" class="btn btn-primary btn-circle btn-xl m-1">
                                            <p className="text-center h1">
                                                <i className="fab fa-facebook-f m-auto"></i>
                                            </p>
                                        </button>
                                        <button type="button" class="btn btn-primary btn-circle btn-xl m-1">
                                            <p className="text-center h1">
                                                <i className="fab fa-facebook-f m-auto"></i>
                                            </p>
                                        </button>
                                        <button type="button" class="btn btn-primary btn-circle btn-xl m-1">
                                            <p className="text-center h1">
                                                <i className="fab fa-facebook-f m-auto"></i>
                                            </p>
                                        </button>
                                    </div>

                                </div>
                                {/* <h1>Welcome</h1>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p> */}

                            </div>
                            {/* <br /> */}
                            <div className="acrylic my-5 rounded-xlg p-3  shadow-lg">
                                <img src={ownersimg} className="w-25 ovfx"></img>
                                <div className="w-75 mx-auto d-block" >
                                    { /* Company Name */}
                                    <p className="display-4 fontx" align="center">Founders / Team</p>
                                </div>
                                <div className="container w-100 m-auto d-block" >
                                    {/* <div className="row">
                                        <div className="col-md-4 row bg-dark">
                                            <div className="cod-md-1 bg-primary">
                                                <img className="w-25" src="https://pbs.twimg.com/profile_images/1181179727723126784/wUyjuOeq.png" />
                                            </div>
                                            <div className="cod-md-1 bg-primary">
                                                <img className="w-25" src="https://pbs.twimg.com/profile_images/1181179727723126784/wUyjuOeq.png" />
                                            </div>
                                            <div className="cod-md-1 bg-primary">
                                                <img className="w-25" src="https://pbs.twimg.com/profile_images/1181179727723126784/wUyjuOeq.png" />
                                            </div>
                                        </div>
                                    </div> */}
                                    <div class="row">
                                        <div class="col-sm-4 p-2">
                                            <div className=" bg-light rounded-xlg shadow m-2">

                                                <div class="row p-3">
                                                    <div class="col-8 col-sm-6 m-auto d-block">
                                                        {/* Level 2: .col-8 .col-sm-6 */}
                                                        <img className="w-75 mx-auto d-block " src="https://pbs.twimg.com/profile_images/1181179727723126784/wUyjuOeq.png" />
                                                    </div>
                                                    <div className="col-4 col-sm-6 m-auto d-block">
                                                        <strong><bold><p className="h3 m-auto d-block" align="center">LeadMi</p></bold></strong>
                                                        <a href={"https://twitter.com/" + "GetLeadMi"} target="_blank">
                                                            <p className="m-auto d-block text-dark" align="center">GetLeadMi <i class="text-primary fab fa-twitter"></i></p>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        {/* <div class="col-sm-2 text-left">
                            <h3>Test</h3>
                            <p>Lorem ipsum...</p>
                        </div> */}
                        {/* <div class="col-sm-2 sidenav">
                            <div class="well">
                                <p>ADS</p>
                            </div>
                            <div class="well">
                                <p>ADS</p>
                            </div>
                        </div> */}
                    </div>
                </div>

                {/* <footer class="container-fluid text-center">
                    <p>Footer Text</p>
                </footer> */}
            </div>
        )
    };
}