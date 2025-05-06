const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
  plan_title: {
    type: String,
    required: true
  },
  plan_price: {
    type: Number,
    required: true
  },
  plan_currency: {
    type: String,
    required: true
  },
  is_spyne_assured: {
    type: Boolean,
    required: true
  },
  co_brand: {
    type: Boolean,
    required: true
  },
  features: {
    image_shoot: {
      active: {
        type: Boolean,
        required: true
      }
    },
    image_upload: {
      active: {
        type: Boolean,
        required: true
      }
    },
    video_shoot: {
      active: {
        type: Boolean,
        required: true
      }
    },
    hotspot: {
      active: {
        type: Boolean,
        required: true
      }
    }
  },
  bg_id: {
    type: [String],
    required: true
  },
  description:{
    type:[String],
    required:true
  }
}, { timestamps: true, strict: false });
