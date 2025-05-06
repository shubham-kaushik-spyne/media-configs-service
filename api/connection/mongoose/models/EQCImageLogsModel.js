const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    project_id: {
        type: String,
        trim: true,
        required: [true, 'project_id missing or empty']
    },
    sku_id: {
        type: String,
        trim: true,
        required: [true, 'sku_id missing or empty']
    },
    image_id: {
        type: String,
        trim: true,
        required: [true, 'image_id missing or empty']
    },
    enterprise_id: {
        type: String,
        trim: true,
        required: [true, 'enterprise_id missing or empty']
    },
    enterprise_qc_id: {
        type: String,
        trim: true,
        required: [true, 'enterprise_qc_id missing or empty']
    },
    entity_id:{
        type: String,
        trim: true,
        required: [false, 'image entity id missing or empty']
    },
    crm_status:{
        type: String,
        trim: true,
        required: [true, 'crm_status missing or empty']
    },
    last_updated_by_src:{
        type: String,
        trim: true,
        default: 'ai',
        enum: ['eqc', 'qc', 'ai'],
        required: [false, 'last_updated_by_src missing or empty']
    },
    time : {
        'accept': {
            'date-string':{
                type: Date,
                required: false
            },
            'time-ms':{
                type: String,
                required: false
            }
        },
        'reject': {
            'date-string':{
                type: Date,
                required: false
            },
            'time-ms':{
                type: String,
                required: false
            }
        },
        're-edit': {
            'date-string':{
                type: Date,
                required: false
            },
            'time-ms':{
                type: String,
                required: false
            }
        },
        're-shoot': {
            'date-string':{
                type: Date,
                required: false
            },
            'time-ms':{
                type: String,
                required: false
            }
        },
        'refund': {
            'date-string':{
                type: Date,
                required: false
            },
            'time-ms':{
                type: String,
                required: false
            }
        }
    }
},{timestamps: true});
