const mongoose = require('mongoose');

module.exports = new mongoose.Schema(
  {
    approved_by: {
      type: String,
      trim: true,
      required: [false, 'approved_by missing or empty'],
    },
    email_id: {
      type: String,
      trim: true,
      required: [false, 'email_id missing or empty'],
    },
  },
  { timestamps: true }
);
