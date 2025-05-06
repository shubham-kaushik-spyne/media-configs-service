const mongoose = require("mongoose");

module.exports = new mongoose.Schema(
  {
    product_type: {
      type: String,
      required: true
    },
    template_id: {
      type: String,
      required: true
    },
    source: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true }
);

