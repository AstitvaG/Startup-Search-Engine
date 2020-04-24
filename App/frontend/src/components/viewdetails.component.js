import React, { Component } from 'react';
import Navbar from "./navbar.component"
import basicimage from "./basic.png"
import bgimage from "./bg3.png"
import blackcircle from "./black-circle.png"
import detailsimg from "./details.png"
import ownersimg from "./owners.png"
import newsimg from "./news.png"
import axios from 'axios'
import { TwitterTweetEmbed } from 'react-twitter-embed';
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

        }

        for (var i = 0; i < alldomains.length; i++) {
            if (alldomains[i] === "" || alldomains[i]===" ") continue;
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
                    <div key={i + this.state.result.contactlist.length} className="col-sm-4 p-2">
                        <div className=" bg-light rounded-xlg shadow-lg m-2">
                            <div className="row p-3">
                                <div className="col-8 col-sm-6 m-auto">
                                    {/* Level 2: .col-8 .col-sm-6 */}
                                    <img className="w-75 mx-auto rounded-circle" src={person.properties.profile_image_url != null ? person.properties.profile_image_url : ownersimg} />
                                </div>
                                <div className="col-4 col-sm-6 m-auto">
                                    <strong><p className="h4 m-auto" align="center" style={{ wordWrap: "break-word" }}>{person.properties.first_name + " " + person.properties.last_name}</p></strong>
                                    {/* <p className="h5 m-auto" align="left" style={{ wordWrap: "break-word" }}>{person.properties.title}</p> */}
                                    <a href={person.properties.linkedin_url} target="_blank">
                                        <p className="m-auto text-dark" align="center" style={{ wordWrap: "break-word" }}>{person.properties.title} {person.properties.linkedin_url != null ? < i className="text-primary fab fa-linkedin"></i> : ""}
                                        </p>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        }
        catch{ }
        try {
            for (var i = 0; i < this.state.result.founders.handles.length; i++) {
                console.log("len", this.state.result.founders.handles.length)
                var person = this.state.result.founders.handles[i]
                temp.push(
                    <div key={i} className="col-sm-4 p-2">
                        <div className=" bg-light rounded-xlg shadow m-2">
                            <div className="row p-3">
                                <div className="col-8 col-sm-6 m-auto">
                                    {/* Level 2: .col-8 .col-sm-6 */}
                                    <img className="w-75 mx-auto rounded-circle" src={person.profileImage != null ? person.profileImage : ownersimg} onError={this.onError} />
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
        }
        catch{
            return;
        }
        return temp
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
        } catch{ } try {
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
        } catch{ } try {
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
        } catch{ } try {
            for (var i = 0; i < this.state.result.providers.length; i++) {
                var pk = this.state.result.providers[i];
                if (pk.name == "CRUNCHBASE" && pk.url != null && pk.name != "") temp.push(
                    <a className="mx-2" href={pk.url} target="_blank">
                        <img style={{ width: "40px" }} src="data:image/png;base64,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">
                        </img>
                    </a>)
                if (pk.name == "ANGELLIST" && pk.url != null && pk.name != "") temp.push(
                    <a className="mx-2" href={pk.url} target="_blank">
                        <img style={{ width: "40px" }} src="https://www.logolynx.com/images/logolynx/1e/1e51189385d832bf388af8ffefed5a48.jpeg"></img>
                    </a>)

                if (pk.name == "PRODUCT_HUNT" && pk.url != null && pk.name != "") temp.push(
                    <a className="mx-2" href={pk.url} target="_blank">
                        <img style={{ width: "40px" }} src="https://images.squarespace-cdn.com/content/5894b4bf3a0411ca447910a4/1556715453623-9NNB3ZHEKS8N1YEGM2G0/image-asset.png?content-type=image%2Fpng"></img>
                    </a>)
                if (pk.name == "FEDGER" && pk.url != null && pk.name != "") temp.push(
                    <a className="mx-2" href={pk.url} target="_blank">
                        <img style={{ width: "40px" }} src="https://res-3.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_256,w_256,f_auto,q_auto:eco/v1490174142/pvl6b0urvdbsqrd3b4ft.png"></img>
                    </a>)
                // https://res-3.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_256,w_256,f_auto,q_auto:eco/v1490174142/pvl6b0urvdbsqrd3b4ft.png
                // console.log("gg:", this.state.result.providers[i].name)
            }
        } catch{ } try {
            if (this.state.result.website !== null) {
                temp.push(
                    <a className="mx-2" href={this.state.result.website} target="_blank">
                        <p className="text-center h1">
                            <i className="fas fa-horse m-auto"></i>
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
    checkAlexa() {
        // var temp = []
        try {
            if (this.converttoHuman(this.state.result.alexarank) != null) {
                return (
                    <fieldset className="scheduler-border rounded-xlg w-75 mx-auto mb-3" >
                        <legend className="scheduler-border">Ranking and Views</legend>
                        <p align="center">{this.converttoHuman(this.state.result.alexarank)} <i className="fas fa-medal"></i> and {this.converttoHuman(this.state.result.alexaviews)} <i className="fab fa-searchengin"></i></p>
                    </fieldset>
                )
            }
            // return temp
        }
        catch{
            return;
        }
    }
    gettweets() {
        var temp = []
        try {
            for (var i = 0; i < this.state.result.tweets.length; i++) {
                var t = this.state.result.tweets[i].text
                temp.push(
                    <div key={i} className="bg-light rounded-xlg shadow-lg m-3">
                        {/* <p>{t}</p> */}
                        {/* <br /> */}
                        <TwitterTweetEmbed
                            tweetId={this.state.result.tweets[i].tweetId}
                        />
                    </div>
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
                        <div className="col-sm-12 px-2">
                            <div className="acrylic acrylic3 m-5 rounded-xlg shadow-lg">
                                <img src={newsimg} className="w-25 ovfx"></img>
                                <div className="w-75 mx-auto d-block" >
                                    { /* Tweets */}
                                    <p className="display-4 fontx" align="center">News</p>
                                </div>
                                <div className="container w-100 m-auto d-block" >
                                    <div className="row align-items-center justify-content-center" align="center">
                                        {this.gettweets()}
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