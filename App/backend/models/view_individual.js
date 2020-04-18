const mongoose = require('mongoose');

let View_individual = new mongoose.Schema({
    name:{
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

module.exports = mongoose.model('ViewView_individual',View_individual);