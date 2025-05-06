const mongoose = require("mongoose");

module.exports = new mongoose.Schema({
    enterprise_id: {
        type: String,
        required: true,
    },
    number_plate_logo_id: {
        type: String,
        required: true
    },
    email_id: {
        type: String,
        required: true
    },
    number_plate_logo_url: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        required: true
    },
    is_default: {
        type: Boolean,
        required: false,
        default: false
    },
    api_source: {
        type: String,
        required: true
    },

        
}, { timestamps: true, strict: false })