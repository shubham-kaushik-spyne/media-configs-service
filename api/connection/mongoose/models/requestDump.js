const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    enterpriseId:{
        type: String,
    },
    teamId:{
        type: String,
    },
    requestDetails:{
        type: Object
    }
}, { timestamps: true });
