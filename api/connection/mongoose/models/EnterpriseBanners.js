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
  is_sample:{
    type : Boolean,
    required: false
  }
}, { timestamps: true, strict: false });
