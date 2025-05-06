const mongoose = require('mongoose');

const bgConfigSchema = new mongoose.Schema({
  bgs:{
    type: [Number],
    default: []
  },
  user_configurable:{
    type: Boolean,
    default: true
  },
  default_bg:{
    type: Number,
    default: null,
  }
}, { _id: false });

const numberplateConfigSchema = new mongoose.Schema({
  numberplates:{
    type: [Number],
    default: []
  },
  user_configurable:{
    type: Boolean,
    default: true
  },
  default_numberplate:{
    type: Number,
    default: null,
  }
}, { _id: false });

const bannerConfigSchema = new mongoose.Schema({
  banners:{
    type: [String],
    default: []
  },
  user_configurable:{
    type: Boolean,
    default: true
  },
  default_banner:{
    type: String,
    default: null,
  }
}, { _id: false });


module.exports = new mongoose.Schema({
  enterprise_id:{
    type : String,
    required: true
  },
  team_id : {
    type : String,
    required: true
  },
  bg_config: {
    type: bgConfigSchema,
    required: false,
  },
  numberplate_config: {
    type: numberplateConfigSchema,
    required: false,
  },
  banner_config: {
    type: bannerConfigSchema,
    required: false,
  },
  last_updated_by: {
    type: String,
    default: null,
    required: false
  },
  updated_at: {
    type: Date,
    default: null,
    required: false,
    default: Date.now
  },
  created_at: {
    type: Date,
    default: null,
    required: false,
    default: Date.now
  }
}, {  strict: false });


