const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
  marketplace_id: {
    type: String,
    required: false,
  },
  marketplace_img: {
    type: String,
    required: false,
  },
  brand : {
    type: String,
    required: false,
  },
  width : {
    type: String,
    required: false,
  },
  height : {
    type: String,
    required: false,
  },
  dpi : {
    type: String,
    required: false,
  },
  margin : {
    type: String,
    required: false,
  },
  background_color : {
    type: String,
    required: false,
  },
  shadow :{
    type: String,
    required: false,
  },
  hex_code : {
    type: String,
    required: false,
  },
  is_active : {
    type: Boolean,
    default : true
  },
  format : {
    type: String,
    required: false,
  },
  field9 : {
    type: String,
    required: false,
  },
  field11 : {
    type: String,
    required: false,
  },
  prod_cat_id : {
    type: String,
    required: false,
  },
  createdAt:{
    type: Date,
    default:Date.now(),
  },
  updatedAt:{
    type: Date,
    default:Date.now(),
  },
},{ timestamps: true });
