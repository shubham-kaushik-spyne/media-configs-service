const mongoose = require("mongoose");

module.exports = new mongoose.Schema(
  {
    enterprise_id: {
      type: String,
      required: true,
    },
    key_changed: {
      type: String,
      required: true,
    },
    old_value: {
      type: String,
    },
    new_value: {
      type: String,
    },
  },
  { timestamps: true, strict: false }
);

