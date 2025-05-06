const mongoose = require("mongoose");

module.exports = new mongoose.Schema(
  {
    capital: {
      type: String,
    },
    currency: {
      type: String,
    },
    currency_name: {
      type: String,
    },
    currency_symbol: {
      type: String,
    },
    emoji: {
      type: String,
    },
    emojiU: {
      type: String,
    },
    id: {
      type: Number,
    },
    iso2: {
      type: String,
    },
    iso3: {
      type: String,
    },
    latitude: {
      type: String,
    },
    longitude: {
      type: String,
    },
    name: {
      type: String,
    },
    nationality: {
      type: String,
    },
    native: {
      type: String,
    },
    numeric_code: {
      type: String,
    },
    phone_code: {
      type: String,
    },
    region: {
      type: String,
    },
    region_id: {
      type: String,
    },
    states: {
      type: Object,
    },
    subregion: {
      type: String,
    },
    subregion_id: {
      type: String,
    },
    timezones: {
      type: Object,
    },
    tld: {
      type: String,
    },
    // translations: {
    //   type: String,
    // },
  },
  { timestamps: true }
);
