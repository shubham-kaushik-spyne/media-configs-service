const mongoose = require("mongoose");

module.exports = new mongoose.Schema(
  {
    ae_name: {
      type: String,
    },
    ae_email: {
      type: String,
    },
    deal_stage: {
      type: String,
    },
    deal_id: {
      type: String,
    },
    enterprise_id: {
      type: String,
    },
    contract_id: {
      type: String,
    },
    contact_details: {
      no_of_cars: {
        type: String,
      },
      client_type: {
        type: String,
      },
      poc_contact_name: {
        type: String,
      },
      poc_contact_number: {
        type: String,
      },
      poc_contact_email: {
        type: String,
      },
    },
    additional_details: {
      type: String,
    },
    signatory_authority: {
      signatory_authority_name: { type: String },
      signatory_authority_email: { type: String },
      signatory_authority_designation: { type: String },
      signatory_authority_contact: { type: String },
    },
    product_availed: { type: String },
    platform_required: { type: String },
    partner_integration: { type: Boolean },
    inventory_provider: {
      type: Object,
    },
    views: [
      {
        viewer_email: { type: String },
        view_count: { type: Number},
        last_seen: {type: Date}
      },
    ],
    exception: {
      exception_raised: { type: Boolean },
      is_accepted: { type: Boolean },
      ae_comment: { type: String },
      finance_comment: { type: String },
      finance_email: { type: String },
      contract_url: { type: String }
    },
    signeasy_id: { type: String },
    contract_pdf_url: { type: String },
    certificate_pdf_url: { type: String },
    cc_email: [{ type: Object}],
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true }
);
