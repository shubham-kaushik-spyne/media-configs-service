const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    enterprise_id: {
        type: String,
        required: true
    },
    team_id: {
        type: String,
        required: true
    },
    partner_id:{
        type: String,
        required: false
    },
    partner_name:{
        type: String,
        required: true
    },
    user_email_id:{
        type: String,
        required: true
    }
}, { timestamps: true, strict: false });
