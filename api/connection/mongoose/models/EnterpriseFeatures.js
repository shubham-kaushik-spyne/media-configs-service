const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    enterprise_id: {
        type: String,
        required: true,
        unique: true
    },
    features: {
        type: Object,
        required: true,
    },
    createdAt:{
        type: Date,
        default:Date.now(),
    },
    updatedAt:{
        type: Date,
        default:Date.now(),
    },
},{ timestamps: true })