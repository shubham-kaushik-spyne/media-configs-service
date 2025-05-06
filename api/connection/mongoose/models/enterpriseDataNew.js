const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    replacebg_ip: {
        type: String,
        required: true,
    },
    removebg_ip: {
        type: String,
        required: true,
    },
    enterprise_id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    retry_time_constraint: {
        type: Number,
        required: true,
    },
    to_be_retried_count_constraint:{
        type: Number,
        required: true,
    },
    retry_time_type:{
        type: String,
        required: true,
    },
    interior_processing:{
        type: Number,
        required: true,
    },
    fail_done_marking:{
        type: Number,
        required: true,
    },
    cumulative_processing:{
        type: Number,
        required: true,
    },
    combo_processing_ip:{
        type: String,
        required: true,
    },
    retry_time_type:{
        type: String,
        required: true,
    },
    interior_processing:{
        type: String,
        required: true,
    },
    fail_done_marking:{
        type: String,
        required: true,
    },
    cumulative_processing:{
        type: String,
        required: true,
    },
    combo_processing_ip:{
        type: String,
        required: true,
    },
    window_tint:{
        type: String,
        required: true,
    },
    see_through:{
        type: String,
        required: true,
    },
    seat_generation:{
        type: Number,
        required: true,
    },
    status: {
      type: String,
      enum: ['PENDING', 'UPDATED'],
      default: 'PENDING'
    },
    reseller_config: {
        is_active: {type: Boolean},
        website_data: {
            term_condition_html: {
               type: Object
            },
        }
    },
    image_to_video: {
        type: Boolean,
        required: false,
    },
    download: { 
        format: {
            type: String,
            required: false,
        }
    },
    hotspot: { 
        interior: {
            type: Boolean,
            required: false
        }
    },
    is_360_config_available: {
        type: Boolean,
        required: false
    },
    config_360: {
        exterior_360_type: {
            type: String,
            enum: ['original', 'studio', 'both'],
            required: false
        },
        exterior_frame_count: {
            type: Number,
            required: false
        },
        sequence_object: {
            first_frame_angle: {
                type: Number,
                required: false
            },
            rotation: {
                type: String,
                enum: ['clockwise', 'anticlockwise'],
                required: false
            },
            is_active: {
                type: Boolean,
                required: false
            }
        },
        exterior_hotspot: {
            type: Boolean,
            required: false
        },
        output_video: {
            is_active: {
                type: Boolean,
                required: false
            },
            format: {
                type: String,
                enum: ['.mp4', '.mov'],
                required: false
            },
            video_speed: {
                type: String,
                required: false,
                enum: ['slow', 'medium', 'fast']
            }
        },
        interior_360_type: {
            is_active: {
                type: Boolean,
                required: false
            },
            interior_type: {
                type: String,
                enum: ['original', 'studio'],
                required: false
            },
        },
        interior_hotspot: {
            type: Boolean,
            required: false
        },
        book_test_drive: {
            type: Boolean,
            required: false
        },
        analytics: {
            type: Boolean,
            required: false
        },
        delivery: {
            qc_enabled: {
                type: Boolean,
                required: false
            }
        },
    }
},{timestamps: true, strict: false});
