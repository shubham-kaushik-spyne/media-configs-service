const mongoose = require("mongoose");

module.exports = new mongoose.Schema(
    {
        _id: {
            type: mongoose.Schema.Types.ObjectId, // Set type to ObjectId for primary key
            auto: true, // This ensures that Mongoose generates a unique ID for each document
        },
        enterprise_id: {
            required: true,
            type: String,
        },
        team_id: {
            required: true,
            type: String,
        },
        current_website_url: {
            required: true,
            type: String,
        },
        domain_expiry_date: {
            required: false,
            type: Date,
        },
        domain_provider: {
            required: false,
            type: String,
        },
        login_info_available: {
            required: true,
            type: Boolean,
        },
        need_migration_help: {
            required: true,
            type: Boolean,
        },
        cname_status: {
            required: false,
            type: String,
            enum: ["yet_to_start", "in_progress", "done"],
            default: "yet_to_start"
        }
    },
    { timestamps: true, strict: false }
);
