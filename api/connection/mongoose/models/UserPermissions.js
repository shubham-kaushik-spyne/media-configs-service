const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
    unique: true
  },
  user_role: {
    type: String,
    required: true
  },
  active_roles:{
    type: Object,
    required: true
  }
},{timestamps: true, strict: false});
