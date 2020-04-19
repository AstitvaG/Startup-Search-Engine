const mongoose = require('mongoose');

let View_individual = new mongoose.Schema({
    name:{
        type: String,
        default : null
    },
    website: {
        type: String,
        default : null
    },
    description: {
        type: String,
        default : null
    },
    city: {
        type: String,
        default : null
    },
    country: {
        type: String,
        default : null
    },
    foundingdate: {
        type: String,
        default : null
    },
    size_employees: {
        type: String,
        default : null
    },
    twitter: {
        type: String,
        default : null
    },
    facebook: {
        type: String,
        default : null
    },
    linkedin: {
        type: String,
        default : null
    },
    alexaviews: {
        type: String,
        default : null
    },
    alexarank: {
        type: String,
        default : null
    },
    founders: {
        type: String,
        default : null
    },
    providers: {
        type: String,
        default : null
    },
    time: {
        type: Date,
        default: Date.now
    } 
});

module.exports = mongoose.model('ViewView_individual',View_individual);