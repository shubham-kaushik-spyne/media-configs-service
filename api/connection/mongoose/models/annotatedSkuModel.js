const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    sku_id : {
        type: String,
        trim: true,
        required: [true, 'sku_id missing or empty']
    },
    is_active : {
        type: Boolean,
        default: true,
    },
    exterior_tagged_images : [
        {
            image_id : {
                type: String,
                trim: true,
                required: [true, 'image_id missing or empty']
            },
            hotspots: [
                {
                    hotspot_id : {
                        type: String,
                        trim: true,
                        required: [false, 'hotspot_id missing or empty']
                    },
                    coordinates : {
                        x: {
                            type: Number,
                            min: [0, 'xAxis property cannot be -ve'],
                            required: [true, 'x1 property missing']
                        },
                        y: {
                            type: Number,
                            min: [0, 'yAxis property cannot be -ve'],
                            required: [true, 'y1 property missing']
                        }
                    },
                    type : {
                        type: String,
                        trim: true,
                        enum: ['hotspot', 'tag'],
                        required: [false, 'type missing or empty']
                    },
                    hotspot_icon : {
                        type: String,
                        trim: true,
                        required: [true, 'hotspot_icon missing or empty']
                    },
                    reasons : {
                        type: Array,
                        required: [false]
                    },
                    description : {
                        type: String,
                        trim: true,
                        required: [false, 'description missing or empty']
                    },
                    focus_image_url : {
                        type: String,
                        trim: true,
                        required: [false, 'focus_image_url missing or empty']
                    }
                }
            ],
        }
    ]
},{ timestamps: true, strict: false });