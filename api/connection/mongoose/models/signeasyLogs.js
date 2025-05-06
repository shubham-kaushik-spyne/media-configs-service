const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
  enterprise_id: {
    required: true,
    type: String,
  },
  status_code: {
    required: true,
    type: String,
  },
  data: {
    type: Object,
  },
}, { timestamps: true });
