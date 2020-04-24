import React, { Component } from 'react';
import basicimage from "./basic.png"
import axios from 'axios';
import { Ripple } from 'react-spinners-css';
import { Collapse } from 'react-collapse';

export default class SearchLayout extends Component {

    constructor(props) {
        super(props);
        // console.log(JSON.parse(props.domain))
        this.state = {
            isHidden: true,
            isFetching: false,
            domains: JSON.parse(props.domains),
            url: encodeURI(props.image),
        }
        this.onViewdetails = this.onViewdetails.bind(this);
    }

    onViewdetails(url, name, domains) {
        this.state.isFetching = true;
        const show = {
            url: url,
            name: name
        }
        axios.post('http://localhost:4000/viewdetails', show)
            .then(function (res) {
                localStorage.setItem("viewdetails", name);
                // this.state.isFetching = false;
                window.location = '/viewdetails/?name=' + encodeURI(name) + '&domains=' + encodeURI(JSON.stringify(domains))

            })
    }
    toggleHidden() {
        this.setState({
            isHidden: !this.state.isHidden
        })
        if (!this.state.isHidden) {
            this.onViewdetails(this.props.url, this.props.name, this.state.domains)
        }
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

    getdomains() {
        var temp = [];
        for (var i = 0; i < this.state.domains.length; i++) {
            if (this.state.domains[i] === "" || this.state.domains[i]===" ") continue;
            temp.push(<div className="rounded-pill p-2 m-1 text-capitalize"
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

    onError = () => {
        if (!this.state.errored) {
            this.setState({
                url: basicimage,
            });
        }
    }

    render() {
        return (
            <div className={"container-fluid rounded-xlg mx-2 my-3 p-4 shadow-lg " + this.props.className}
                onClick={this.toggleHidden.bind(this)}>
                {this.state.isFetching ? (
                    <div className="loading">
                        <Ripple color="#05bd26" />
                    </div>
                ) : (
                        <div style={{cursor:"pointer"}} className="row" >

                            <div className="col-sm" >
                                { /* Image */}
                                <img src={this.state.url}
                                    className="rounded-xlg mx-auto d-block w-50 shadow-lg"
                                    alt={this.props.name}
                                    onError={this.onError} />
                            </div>
                            <div className="w-50 h-100 m-auto d-block" >
                                { /* Company Name */}
                                <p className="h2" align="center">{this.props.name}</p>
                            </div>
                            <div className="col m-auto d-block" >
                                { /* Domain(s) */}
                                <div className="row">
                                    {this.getdomains()}
                                </div>
                            </div>
                        </div>
                    )
                }
                <Collapse isOpened={!this.state.isHidden}>
                    <div>
                        <this.Description />
                    </div>
                </Collapse>
            </div >
        )
    }
    Description = () => (
        <div className="container w-100 m-auto d-block" >
            <br />
            <p className="h4">
                {this.props.description}
            </p>
        </div>
    )
}
