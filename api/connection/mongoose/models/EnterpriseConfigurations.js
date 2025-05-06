const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
  enterprise_id: {
    type: String,
    required: true
  },
  category:{
    type: Object,
    required: true
  }
},{timestamps: true, strict: false});
