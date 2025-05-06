const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    enterprise_id: {
        type: String,
        required: true
    },
    banner_id: {
        type: String,
        required: true
    },
    is_default:{
        type : Boolean,
        required: true
    },
    banner_urls:{
        type: Object,
        required: true
    },
    is_active:{
        type : Boolean,
        required: true 
    },
    user_id:{
        type : String,
        required: true
    },
    team_id : {
        type : String,
        required: true
    }
}, { timestamps: true, strict: false });
