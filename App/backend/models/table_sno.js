const mongoose = require('mongoose');

let Table_sno = new mongoose.Schema({
    name: {
        type: String
    },
    sno: {
        type: Number
    }
});

module.exports = mongoose.model('Table_sno', Table_sno);