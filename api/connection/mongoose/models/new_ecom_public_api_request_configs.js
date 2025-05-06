const mongoose = require("mongoose");

module.exports = new mongoose.Schema({
    config_name: {
        type: String,
        required: true,
    },
    enterprise_id: {
        type: String,
        required: true
    },
    __v: {
        type: Number,
        required: false
    },
    classification: {
        type: Object,
        required: true
    },
    transformation: {
        type: Object,
        required: true
    },
    properties: {
        type: Object,
        required: true
    }
}, { timestamps: true, strict: false })