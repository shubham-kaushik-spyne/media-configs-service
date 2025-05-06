const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
  enterprise_id: {
    type: String,
    required: true
  },
  is_active: {
    type: Boolean,
    required: false
  },
  display_thumbnail: {
    type: String,
    required: false
  },
  color_code: {
    type: String,
    required: false
  },
  description: {
    type: String,
    required: false
  },
  is_threeSixty: {
    type: Boolean,
    required: false
  },
  enable_background_selection: {
    type: Boolean,
    required: false
  },
  fetch_background: {
    type: Boolean,
    required: false
  },
  change_sku_background_after_shoot: {
    type: String,
    required: false
  },
  orientation: {
    type: String,
    required: false
  },
  switch_orientation: {
    type: String,
    required: false
  },
  is_video_shoot_allowed: {
    type: String,
    required: false
  },
  tutorials: {
    type: Array,
    required: false
  },
  case_studies: {
    type: Array,
    required: false
  },
  crousel: {
    type: Array,
    required: false
  },
  video_shoot : {
    type: Object,
    required: false
  },
  image_categories : {
    type: Array,
    required: false
  },
  shoot_experience : {
    type: Object,
    required: false
  },
  process_params : {
    type: Array,
    required: false
  },
  specificData : {
    type: Array,
    required: false
  },
  prod_cat_id : {
    type: String,
    required: false
  },
  enable_single_processing: {
    type: Boolean,
    required: false
  },
  subcat_label : {
    type: String,
    required: false
  },
  category_name: {
    type: String,
    required: false
  },
},{timestamps: true, strict: false});
