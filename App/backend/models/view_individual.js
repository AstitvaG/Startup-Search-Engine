const mongoose = require('mongoose');

let View_individual = new mongoose.Schema({
    name: {
        type: String,
        default: null
    },
    website: {
        type: String,
        default: null
    },
    description: {
        type: String,
        default: null
    },
    city: {
        type: String,
        default: null
    },
    country: {
        type: String,
        default: null
    },
    image: {
        type: String,
        default: null
    },
    domains: {
        type: String,
        default: null
    },
    foundingdate: {
        type: String,
        default: null
    },
    size_employees: {
        type: String,
        default: null
    },
    twitter: {
        type: Object,
        default: null
    },
    tweets: {
        type: Object,
        default: null
    },
    contactlist: {
        type: Object,
        default: null
    },
    facebook: {
        type: Object,
        default: null
    },
    linkedin: {
        type: Object,
        default: null
    },
    alexaviews: {
        type: Number,
        default: null
    },
    alexarank: {
        type: String,
        default: null
    },
    founders: {
        type: Object,
        default: null
    },
    providers: {
        type: Array,
        default: null
    },
    time: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('View_individual', View_individual);