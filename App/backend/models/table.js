const mongoose = require('mongoose');

let Table = new mongoose.Schema({
    userid: {
        type: String,
        default: null
    },
    searchid :{
        type: String
    },
    title: {
        type: String,
        default : null
    },
    c1: {
        type: String,
        default : null
    },
    c2: {
        type: String,
        default : null
    },
    c3: {
        type: String,
        default : null
    },
    c4: {
        type: String,
        default : null
    },
    c5: {
        type: String,
        default : null
    },
    c6: {
        type: String,
        default : null
    },
    c7: {
        type: String,
        default : null
    },
    c8: {
        type: String,
        default : null
    },
    c9: {
        type: String,
        default : null
    },
    c10: {
        type: String,
        default : null
    },
    time: {
        type: Date,
        default: Date.now
    } 
});

module.exports = mongoose.model('Table', Table);