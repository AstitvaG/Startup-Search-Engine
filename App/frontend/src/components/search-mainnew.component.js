import React, { Component } from 'react';
import axios from 'axios';
import queryString from "query-string";
import Navbar from "./navbar.component";
//import './search-main.component.css';
import {Ripple} from 'react-spinners-css';
import '../App.css';
import './search-mainnew.component.css'
const Loading = require('react-loading-animation');
const { OAuth2Client } = require('google-auth-library');
const client = [];


export default class MainSearch extends Component {

    constructor(props) {
        super(props);

        this.state = {
            country: '',
            search: '',
            response: '',
            dom: '',
            isFetching: false
        }


        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeCountry = this.onChangeCountry.bind(this);
        this.onChangeDomain = this.onChangeDomain.bind(this);
    }

    componentDidMount() {
        // document.body.style.background='#999'
        var query = queryString.parse(this.props.location.search);
        if (query.token) {
            var obj = JSON.parse(query.token)
            window.localStorage.setItem("token", obj.token);
            window.localStorage.setItem("name", obj.name);
            window.localStorage.setItem("email", obj.email);
            this.props.history.push("/search");
        }

        (function () {
            "use strict";

            var card = document.getElementById('card'),
                gloss = card.querySelector('.card__gloss'),
                content = card.querySelector('.card__content'),
                width = window.innerWidth,
                height = window.innerHeight;


            function init() {
                bindMouse();

                // Initial tilt
                light(350, -125);
                tilt(350, -125);
            }

            function bindMouse() {
                document.addEventListener('mousemove', (event) => {
                    let x = event.clientX - (width / 2),
                        y = event.clientY - (height / 2);

                    light(x, y);
                    tilt(x, y);
                });
            }


            function light(x, y) {
                let angle = (Math.atan2(y, x) * 180) / Math.PI - 90;

                gloss.style.background = 'linear-gradient(' + angle + 'deg, rgba(255, 255, 255,' + y / height * .9 + ') 0%, rgba(255, 255, 255, 0) 80%)';
            }

            function tilt(x, y) {
                let force = 80,
                    rx = (x / width) * force,
                    ry = (y / height) * -force;

                card.style.transform = 'rotateY(' + (rx) + 'deg) rotateX(' + (ry) + 'deg)';
                // content.style.transform = 'translateX(' + (rx * .75) + 'px) translateY(' + (ry * .75) + 'px)';
            }




            init();

        })();
    }



    // myCountries = ["India", "Cannada"]
    myCountries = ["AF: Afghanistan", "AX: Aland Islands", "AL: Albania", "DZ: Algeria", "AS: American Samoa", "AD: Andorra", "AO: Angola", "AI: Anguilla", "AQ: Antarctica", "AG: Antigua and Barbuda", "AR: Argentina", "AM: Armenia", "AW: Aruba", "AU: Australia", "AT: Austria", "AZ: Azerbaijan", "BS: Bahamas", "BH: Bahrain", "BD: Bangladesh", "BB: Barbados", "BY: Belarus", "BE: Belgium", "BZ: Belize", "BJ: Benin", "BM: Bermuda", "BT: Bhutan", "BO: Bolivia", "BQ: Bonaire", "BA: Bosnia and Herzegovina", "BW: Botswana", "BV: Bouvet Island", "BR: Brazil", "IO: British Indian Ocean Territory", "VG: British Virgin Islands", "BN: Brunei", "BG: Bulgaria", "BF: Burkina Faso", "BI: Burundi", "KH: Cambodia", "CM: Cameroon", "CA: Canada", "CV: Cape Verde", "KY: Cayman Islands", "CF: Central African Republic", "TD: Chad", "CL: Chile", "CN: China", "CX: Christmas Island", "CC: Cocos (Keeling) Islands", "CO: Colombia", "KM: Comoros", "CG: Congo", "CK: Cook Islands", "CR: Costa Rica", "HR: Croatia", "CU: Cuba", "CW: Curaçao", "CY: Cyprus", "CZ: Czech Republic", "CI: Côte d'Ivoire", "CD: Democratic Republic of the Congo", "DK: Denmark", "DJ: Djibouti", "DM: Dominica", "DO: Dominican Republic", "EC: Ecuador", "EG: Egypt", "SV: El Salvador", "GQ: Equatorial Guinea", "ER: Eritrea", "EE: Estonia", "ET: Ethiopia", "FK: Falkland Islands", "FO: Faroe Islands", "FJ: Fiji", "FI: Finland", "FR: France", "GF: French Guiana", "PF: French Polynesia", "TF: French Southern Territories", "GA: Gabon", "GM: Gambia", "GE: Georgia", "DE: Germany", "GH: Ghana", "GI: Gibraltar", "GR: Greece", "GL: Greenland", "GD: Grenada", "GP: Guadeloupe", "GU: Guam", "GT: Guatemala", "GG: Guernsey", "GN: Guinea", "GW: Guinea-Bissau", "GY: Guyana", "HT: Haiti", "HM: Heard Island and McDonald Islands", "HN: Honduras", "HK: Hong Kong", "HU: Hungary", "IS: Iceland", "IN: India", "ID: Indonesia", "IR: Iran", "IQ: Iraq", "IE: Ireland", "IM: Isle of Man", "IL: Israel", "IT: Italy", "JM: Jamaica", "JP: Japan", "JE: Jersey", "JO: Jordan", "KZ: Kazakhstan", "KE: Kenya", "KI: Kiribati", "KW: Kuwait", "KG: Kyrgyzstan", "LA: Laos", "LV: Latvia", "LB: Lebanon", "LS: Lesotho", "LR: Liberia", "LY: Libya", "LI: Liechtenstein", "LT: Lithuania", "LU: Luxembourg", "MO: Macao", "MK: Macedonia", "MG: Madagascar", "MW: Malawi", "MY: Malaysia", "MV: Maldives", "ML: Mali", "MT: Malta", "MH: Marshall Islands", "MQ: Martinique", "MR: Mauritania", "MU: Mauritius", "YT: Mayotte", "MX: Mexico", "FM: Micronesia", "MD: Moldova", "MC: Monaco", "MN: Mongolia", "ME: Montenegro", "MS: Montserrat", "MA: Morocco", "MZ: Mozambique", "MM: Myanmar", "NA: Namibia", "NR: Nauru", "NP: Nepal", "NL: Netherlands", "NC: New Caledonia", "NZ: New Zealand", "NI: Nicaragua", "NE: Niger", "NG: Nigeria", "NU: Niue", "NF: Norfolk Island", "KP: North Korea", "MP: Northern Mariana Islands", "NO: Norway", "OM: Oman", "PK: Pakistan", "PW: Palau", "PS: Palestine", "PA: Panama", "PG: Papua New Guinea", "PY: Paraguay", "PE: Peru", "PH: Philippines", "PN: Pitcairn", "PL: Poland", "PT: Portugal", "PR: Puerto Rico", "QA: Qatar", "RO: Romania", "RU: Russia", "RW: Rwanda", "RE: Réunion", "BL: Saint Barthélemy", "SH: Saint Helena, Ascension and Tristan da Cunha", "KN: Saint Kitts and Nevis", "LC: Saint Lucia", "MF: Saint Martin", "PM: Saint Pierre and Miquelon", "VC: Saint Vincent and the Grenadines", "WS: Samoa", "SM: San Marino", "ST: Sao Tome and Principe", "SA: Saudi Arabia", "SN: Senegal", "RS: Serbia", "SC: Seychelles", "SL: Sierra Leone", "SG: Singapore", "SX: Sint Maartenf", "SK: Slovakia", "SI: Slovenia", "SB: Solomon Islands", "SO: Somalia", "ZA: South Africa", "GS: South Georgia and the South Sandwich Islands", "KR: South Korea", "SS: South Sudan", "ES: Spain", "LK: Sri Lanka", "SD: Sudan", "SR: Suriname", "SJ: Svalbard and Jan Mayen", "SZ: Swaziland", "SE: Sweden", "CH: Switzerland", "SY: Syria", "TW: Taiwan", "TJ: Tajikistan", "TZ: Tanzania", "TH: Thailand", "TL: Timor-Leste", "TG: Togo", "TK: Tokelau", "TO: Tonga", "TT: Trinidad and Tobago", "TN: Tunisia", "TR: Turkey", "TM: Turkmenistan", "TC: Turks and Caicos Islands", "TV: Tuvalu", "VI: U.S Virgin Islands", "UG: Uganda", "UA: Ukraine", "AE: United Arab Emirates", "GB: United Kingdom", "US: United States", "UM: United States Minor Outlying Islands", "UY: Uruguay", "UZ: Uzbekistan", "VU: Vanuatu", "VA: Vatican", "VE: Venezuela", "VN: Vietnam", "WF: Wallis and Futuna", "EH: Western Sahara", "YE: Yemen", "ZM: Zambia", "ZW: Zimbabwe"]

    listCountries = this.myCountries.map((mylist) => <option value={mylist} />)
    myDomains = ["Accounting and Legal", "Advertising", "AI", "Analytics", "AR/VR", "Automotive", "Big Data", "Biotech", "Blockchain", "Bots", "Communication", "Consulting", "Content", "Data", "Design", "E Commerce", "Education", "Energy", "Entertainment", "Events", "Fashion", "Finance", "Food and Beverages", "Gaming", "Governmental", "Hardware", "Health", "Hospitality", "HR and Recruitment", "Insurance", "IoT", "Manufacturing", "Marketing", "Media", "Medical", "Messaging", "Music", "Productivity", "Real Estate", "Retail", "Robotics", "Sales", "Security", "Sharing Economy", "Social Networks", "Software Dev", "Startups", "Travel", "Other"]
    listDomains = this.myDomains.map((mylist) => <option value={mylist} />)

    onChangeCountry(e) {
        this.setState({ country: e.target.value });
    }

    onChangeDomain(e) {
        this.setState({ dom: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        this.state.isFetching = true;
        console.log("made true", this.state.isFetching);
        this.setState({ state: this.state });
        this.forceUpdate();

        axios.post('http://localhost:4000/startups', {
            userid: window.localStorage.getItem("email"),
            searchval: "Startups" + ":" + this.state.dom + ":" + this.state.country,
            country: this.state.country.toString().split(":")[0],
            domain: this.state.dom.toString().toUpperCase()
        })
            .then(response => {
                this.state.isFetching = false;
                console.log("made false", this.state.isFetching);
                axios.post('http://localhost:4000/sendmail', {
                    email: window.localStorage.getItem("email"),
                    dom: this.state.dom,
                    con: this.state.country,
                })
                window.location = '/previoussearches';
                // this.setState({ result: response.data });
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    render() {
        return (
            <div className="parentgg" >
                < Navbar/>
                <p className="instruction new">Search <i class="fas fa-search"></i></p>
                <p className="instruction">Begin a new startup search here!</p>
                {/* <Navbar /> */}
                {this.state.isFetching ? (
                    <div className="loading">
                        <Ripple color=" #770992" />
                    </div>
                ) : (
                        <div className="containerx">
                            <div id="card" className="card">

                                <div className="card__content">
                                    <div className="card__image"></div>
                                    <br />
                                    <form onSubmit={this.onSubmit}>
                                        <div className="form-group">
                                            <input className="form-control rounded-pill w-50 mx-auto" list="domainData" id="domain" placeholder="Domain" onChange={this.onChangeDomain} />
                                            <datalist id="domainData">
                                                {this.listDomains}
                                            </datalist>
                                        </div>
                                        <div className="form-group">
                                            <input className="form-control rounded-pill w-50 mx-auto" list="countryData" id="country" size={5} placeholder="Country" onChange={this.onChangeCountry} />
                                            <datalist id="countryData" size={5}>
                                                {this.listCountries}
                                            </datalist>
                                        </div>
                                        {/* <div className="form-group">
                                            <button className="rounded-pill btn btn-dark" type="submit">Search</button>
                                            <div id="output">
                                                {this.state.response}
                                            </div>
                                        </div> */}
                                        {/* <br /> */}
                                        <button className="btnx mt-4 mx-auto d-block" type="submit">
                                            <span className="circle">
                                                <span className="icon arrow"></span>
                                            </span>
                                            <div className="button-text h-100">
                                                <p className="d-block my-auto" align="center">Show Result</p>
                                            </div>
                                        </button>
                                    </form>
                                    {/* <p className="card__name">Parallax Card</p> */}
                                </div>
                                <div className="card__name__image"></div>
                                <div className="card__f1__image"></div>
                                <div className="card__f2__image"></div>
                                <div className="card__sub__image"></div>
                                <p className="card__name__shadow">Show Result</p>

                                <div className="card__gloss"></div>

                            </div>
                        </div>
                    )
                }
            </div>
        )
    }
}