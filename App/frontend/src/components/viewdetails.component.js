import React, { Component } from 'react';
import Navbar from "./navbar.component"
import basicimage from "./basic.png"
import bgimage from "./bg3.png"
import blackcircle from "./black-circle.png"
import detailsimg from "./details.png"
import ownersimg from "./owners.png"
import axios from 'axios'
// import customerprofile from localStorage.getItem("viewdetails_img")

export default class Viewdetails extends Component {

    customerprofile = "";

    constructor(props) {
        super(props);
        this.state = {
            domains: [
                "Accounts",
                "className"
            ],
            result: {}
        }

        this.customerprofile = localStorage.getItem("viewdetails_img")


    }
    componentDidMount() {
        document.body.style.backgroundImage = `url(${bgimage})`
        document.body.style.backgroundPosition = 'center'
        document.body.style.backgroundSize = 'cover'
        document.body.style.backgroundAttachment = 'fixed'
        document.body.style.backgroundRepeat = 'no-repeat'
        // document.body.style.fontFamily =

        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);

        const h = {
            name: decodeURI(urlParams.get('name'))
        }
        axios.post('http://localhost:4000/get_ind_details', h)
            .then(response => {
                //   console.log("response:", response)

                this.setState({ result: response.data[0], domains: response.data[0].domains });
                //  console.log("response:", this.state.result.twitter.handle)

            })
            .catch(function (error) {
                console.log(error);
            })
    }

    converttoHuman(num) {
        if (num > 1e9) return (num / 1e9 + '').slice(0, 5) + 'B'
        if (num > 1e6) return (num / 1e6 + '').slice(0, 5) + 'B'
        if (num > 1e3) return (num / 1e3 + '').slice(0, 5) + 'K'
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
        var alldomains = (this.state.domains + "").split(",")
        console.log(alldomains)
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const page_type = urlParams.get('domains')
        //    console.log("Domains:", decodeURI(page_type));
        if (alldomains[0] == "null" && alldomains.length == 1) alldomains = JSON.parse(decodeURI(page_type))
        else {
            alldomains = alldomains.map(function (x) { return x.toUpperCase() })
            var final = new Set(alldomains)
            var newx = JSON.parse(decodeURI(page_type))
            for (var i in newx) {
                final.add(newx[i].toUpperCase())
            }
            alldomains = Array.from(final)
            console.log("Final:", alldomains)

        }

        for (var i = 0; i < alldomains.length; i++) {
            if (alldomains[i] === "") continue;
            temp.push(<div key={i} className="rounded-pill p-2 m-1 text-capitalize fontx"
                style={
                    {
                        backgroundColor: this.intToRGB(this.hashCode(alldomains[i])),
                        color: this.textcolor(this.intToRGB(this.hashCode(alldomains[i])), '#FFFFFF', '#000000')
                    }
                } >
                <small>
                    {alldomains[i].toLowerCase()}
                </small>
            </div>)
        }
        return temp;
    }

    getMembers() {
        var temp = []
        try {
            for (var i = 0; i < this.state.result.contactlist.length; i++) {
                var person = this.state.result.contactlist[i]
                var sp = this.state.result.founders.handles[i]
                temp.push(
                    <div key={i} className="col-sm-4 p-2">
                        <div className=" bg-light rounded-xlg shadow m-2">
                            <div className="row p-3">
                                <div className="col-8 col-sm-6 m-auto">
                                    {/* Level 2: .col-8 .col-sm-6 */}
                                    <img className="w-75 mx-auto rounded-circle" src={person.properties.profile_image_url} />
                                </div>
                                <div className="col-4 col-sm-6 m-auto">
                                    <strong><p className="h4 m-auto" align="center" style={{ wordWrap: "break-word" }}>{person.properties.first_name + " " + person.properties.last_name}</p></strong>
                                    <weak><p className="h5 m-auto" align="left" style={{ wordWrap: "break-word" }}>{person.properties.title}</p></weak>
                                    <a href={person.properties.linkedin_url} target="_blank">
                                        <p className="m-auto text-dark" align="center" style={{ wordWrap: "break-word" }}>{} <i className="text-primary fab fa-linkedin"></i></p>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
            for (var i = 0; i < this.state.result.founders.handles.length; i++) {
                var person = this.state.result.founders.handles[i]
                temp.push(
                    <div key={i} className="col-sm-4 p-2">
                        <div className=" bg-light rounded-xlg shadow m-2">
                            <div className="row p-3">
                                <div className="col-8 col-sm-6 m-auto">
                                    {/* Level 2: .col-8 .col-sm-6 */}
                                    <img className="w-75 mx-auto rounded-circle" src={person.profileImage} />
                                </div>
                                <div className="col-4 col-sm-6 m-auto">
                                    <strong><p className="h4 m-auto" align="center" style={{ wordWrap: "break-word" }}>{person.name}</p></strong>
                                    {/* <weak><p className="h5 m-auto" align="left" style={{ wordWrap: "break-word" }}>{person.properties.title}</p></weak> */}
                                    <a href={"https://twitter.com/" + person.handle} target="_blank">
                                        <p className="m-auto text-dark" align="center" style={{ wordWrap: "break-word" }}>{person.handle} <i className="text-primary fab fa-twitter"></i></p>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
            return temp
        }
        catch{
            return;
        }
    }

    getButtons(e) {
        var temp = []
        try {
            if (e === "all" && this.state.result.twitter.handle != null) {
                temp.push(
                    <a className="mx-2" href={"https://twitter.com/" + this.state.result.twitter.handle} target="_blank">
                        <p className="text-center h1">
                            <i className="fab fa-twitter-square m-auto"></i>
                        </p>
                    </a>
                )
            }
            if (e === "all") {
                if (this.state.result.facebook.page !== null) {
                    temp.push(
                        <a className="mx-2" href={"https://facebook.com/" + this.state.result.facebook.page} target="_blank">
                            <p className="text-center h1">
                                <i className="fab fa-facebook-square m-auto"></i>
                            </p>
                        </a>
                    )
                }
                else if (this.state.result.facebook.url !== null) {
                    temp.push(
                        <a className="mx-2" href={this.state.result.facebook.url} target="_blank">
                            <p className="text-center h1">
                                <i className="fab fa-facebook-square m-auto"></i>
                            </p>
                        </a>
                    )
                }
            }
            if (e === "all") {
                if (this.state.result.linkedin.url !== null) {
                    temp.push(
                        <a className="mx-2" href={this.state.result.linkedin.url} target="_blank">
                            <p className="text-center h1">
                                <i className="fab fa-linkedin m-auto"></i>
                            </p>
                        </a>
                    )
                }
                else if (this.state.result.linkedin.page !== null) {
                    temp.push(
                        <a className="mx-2" href={"https://www.linkedin.com/company/" + this.state.result.linkedin.page} target="_blank">
                            <p className="text-center h1">
                                <i className="fab fa-linkedin m-auto"></i>
                            </p>
                        </a>
                    )
                }

            }
            if (this.state.result.website !== null) {
                temp.push(
                    <a className="mx-2" href={this.state.result.website} target="_blank">
                        <p className="text-center h1">
                            <i class="fas fa-horse m-auto"></i>
                        </p>
                    </a>
                )
            }
            return temp
        }
        catch{
            return;
        }
    }
    checkAlexa(){
        var temp = []
        try {
            if (this.converttoHuman(this.state.result.alexarank) != null) {
                temp.push(
                    <fieldset className="scheduler-border rounded-xlg w-75 mx-auto mb-3" >
                    <legend className="scheduler-border">Ranking and Views</legend>
                    <p align="center">{this.converttoHuman(this.state.result.alexarank)} <i className="fas fa-medal"></i> and {this.converttoHuman(this.state.result.alexaviews)} <i className="fab fa-searchengin"></i></p>
                </fieldset>
                )
            }
            return temp
        }
        catch{
            return;
        }
    }

    render() {
        var k = this.state.result;
        console.log("k", k);
        return (
            <div className="w-100 container-fluid" >
                <Navbar />
                <br />
                <br />
                <br />
                <div className="container-fluid text-center">
                    <div className="row content rounded-xlg p-3" >

                        <div className="col-sm-3 acrylic acrylic3 rounded-xlg py-5 m-5 shadow-lg">
                            <img src={blackcircle} className="w-100 ovf"></img>
                            <div className="w-75 mx-auto d-block">
                                {/* Image here */}
                                <img src={k.image}
                                    className="rounded-xlg mx-auto d-block w-75 shadow-lg"
                                    alt={this.props.name}
                                    onError={this.onError} />
                            </div>
                            <fieldset className="scheduler-border rounded-xlg w-75 mx-auto mb-3 mt-5" >
                                <legend className="scheduler-border">Location </legend>
                                <p align="center">{k.city} <i className="fas fa-location-arrow"></i> India <i className="fas fa-globe-americas"></i></p>
                            </fieldset>
                            <fieldset className="scheduler-border rounded-xlg w-75 mx-auto mb-3" >
                                <legend className="scheduler-border">Foundation Date</legend>
                                <p align="center">{k.foundingdate} <i className="fas fa-birthday-cake"></i></p>
                            </fieldset>
                            <fieldset className="scheduler-border rounded-xlg w-75 mx-auto mb-3" >
                                <legend className="scheduler-border">Members</legend>
                                <p align="center">{k.size_employees} <i className="fas fa-users"></i></p>
                            </fieldset>
                           {this.checkAlexa()}
                        </div>
                        <div className="col-sm-8 text-left align-items-end">
                            <div className="acrylic acrylic3 p-3 my-5 rounded-xlg shadow-lg">
                                <img src={detailsimg} className="w-25 ovfx"></img>
                                <div className="w-75 mx-auto d-block" >
                                    { /* Company Name */}
                                    <p className="display-4 fontx" align="center">{k.name}</p>
                                </div>
                                <div className="mx-auto d-block" >
                                    { /* Domain(s) */}
                                    <div className="row justify-content-md-center">
                                        {this.getdomains()}
                                    </div>
                                </div>
                                <div className="container w-100 m-auto d-block" >
                                    <br />
                                    <p className="h4 mx-4 my-3" align="center">
                                        {k.description}
                                    </p>

                                    <div className="w-100 row justify-content-md-center" align="center">
                                        {this.getButtons("all")}
                                    </div>
                                </div>
                            </div>
                            <div className="acrylic acrylic3 my-5 rounded-xlg p-3  shadow-lg">
                                <img src={ownersimg} className="w-25 ovfx"></img>
                                <div className="w-75 mx-auto d-block" >
                                    { /* Company Name */}
                                    <p className="display-4 fontx" align="center">Founders / Team</p>
                                </div>
                                <div className="container w-100 m-auto d-block" >
                                    <div className="row d-flex align-items-center justify-content-center" align="center">
                                        {this.getMembers()}
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    };
}