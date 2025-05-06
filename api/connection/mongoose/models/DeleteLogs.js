const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
  enterpriseId: {
    required: true,
    type: String,
  },
  teamId: {
    type: String,
    required: true,
  },
  userId: {
    required: true,
    type: String,
  },
  skuList: {
    required: false,
    type: Array
  },
  projectList: {
    required: false,
    type: Array
  },
  is_delete: {
    required: true,
    type: Number
  }

}, { timestamps: true });
