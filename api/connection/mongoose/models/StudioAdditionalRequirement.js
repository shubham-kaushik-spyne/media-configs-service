const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
  enterprise_id: {
    type: String,
    required: true,
  },
  background_id: {
    type: String,
    required: false,
  },
  custom_requirement: { type: String, required: true},
  image_url: { type: Array, required: false},
  requested_by:{ type: String, required: true},
  status: {
    type: String,
    required: false,
    default: 'Yet to pick',
    isIn: ['Yet to pick', 'Not delivered', 'In progress', 'Delivered']
  },
  deliveredDate:{
    type: Date,
    required: false,
  },
},{timestamps: true});
