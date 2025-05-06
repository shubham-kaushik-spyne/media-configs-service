const mongoose = require('mongoose');

module.exports = new mongoose.Schema(
  {
    enterprise_id: {
      type: String,
      required: true
    },
    user_id: {
      type: String,
    },
    old_stage: {
      type: String,
    },
    new_stage: {
      type: String,
    },
    reason: {
      type: String,
    },
    is_active:{
      type: Boolean,
      default: true
    },
    source: {
      type: String,
    },
    is_outsider: {
      type: Boolean,
      default: false
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true }
);
