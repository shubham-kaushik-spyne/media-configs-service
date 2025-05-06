const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    lres_video_url: {
        type: String,
        required: true
    },
    not_stablize: {
        type: Object,
        required: true
    },
    bg_removed:{
        type : Object,
        required: true
    },
    stablize:{
        type: Object,
        required: true
    },
    demo_bg:{
        type : Object,
        required: true 
    },
    video_url:{
        type : String,
        required: false 
    },
    thumbnail_url:{
        type : String,
        required: false 
    }
}, { timestamps: true, strict: false });