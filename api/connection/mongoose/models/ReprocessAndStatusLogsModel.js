const mongoose = require("mongoose");

module.exports = new mongoose.Schema(
  {
    email_id: {
      type: String,
      trim: true,
      required: [false, "email_id missing or empty"],
    },
    enterprise_id: {
        type: String,
        trim: true,
        required: [false, "enterprise_id missing or empty"],
      },
    tool_type: {
      type: String,
      trim: true,
      enum: ["CRM", "REPROCESS", "RESEQUENCE"],
      required: [false, "toot_type missing or empty"],
    },
    sku_Count: {
      type: String,
      trim: true,
      required: [true, "sku_Count missing or empty"],
    },
    skuList: {
      required: false,
      type: Array,
    },
    date_range: {
      startDate: {
      type: String,
      trim: true,
      required: [false, "startDate missing or empty"],
      },
      endDate: {
        type: String,
        trim: true,
        required: [false, "endDate missing or empty"],
      },
    },
    approved_by: {
      type: String,
      trim: true,
      required: [false, "approved_by missing or empty"],
    },
  },
  { timestamps: true , strict: false}
);
