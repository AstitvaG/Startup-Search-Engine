const mongoose = require('mongoose');

let Table = new mongoose.Schema({
    sno: {
        type: Number
    },
    column1: {
        type:String
    },
    column2: {
        type:String
    },
    column3: {
        type:String
    },
    column4: {
        type:String
    },
    column5: {
        type:String
    },
    column6: {
        type:String
    },
    column7: {
        type:String
    },
    column8: {
        type:String
    },
    column9: {
        type:String
    },
    column10: {
        type:String
    }
});

module.exports = mongoose.model('Table', Table);