const mongoose = require('mongoose');

module.exports = new mongoose.Schema(
  {
    enterprise_id: {
      type: String,
      required: true,
    },
    data: {
      type: Object,
      required: true,
    },
    user_id: {
      type: Object,
      required: true,
    },
  },
  { timestamps: true, strict: false }
);

