const mongoose = require('mongoose');

let Table_sno = new mongoose.Schema({
    userid: {
        type: String
    },
    searchval: {
        type: String
    },
    time: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Table_sno', Table_sno);