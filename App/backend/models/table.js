const mongoose = require('mongoose');

let Table = new mongoose.Schema({
    // sno: {
    //     type: Number
    // },
    title: {
        type: String,
        default : null
    },
    address: {
        type: Object,
        default : null
    }
});

module.exports = mongoose.model('Table', Table);