const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    enterprise_id: {
        type: String,
        required: false,
        unique: true
    },
    billingDetails: {
        enterpriseBillingName: {
            type: String,
            required: false
        },
        billingAddress: {
            type: String,
            required: false
        },
        country: {
            type: String,
            required: false
        },
        city: {
            type: String,
            required: false
        },
        pinCode: {
            type: Number,
            required: false
        }
    },
    subscriptionDetails: {
        subscriptionPlan: {
            type: Boolean,
            required: false
        },

        subscriptionType: {
            type: String,
            required: false,
            isIn: ["one_time", "monthly", "quarterly", "half_yearly", "annually"]
        },
        paymentAmmount: {
            type: Number,
            required: false
        }
    },
    additionalCharges: {
        existingStockCharges: {
            type: Number,
            required: false
        },
        additionalStudioFee: {
            type: Number,
            required: false
        },
        integrationFee: {
            type: Number,
            required: false
        },
        spyneAssuredFee: {
            type: Number,
            required: false
        }
    },
    totalPayableAmount: {
        type: Number,
        required: false
    },
    potentialArrPdfUrl: {
        type: String,
        required: false
    },
    arrAmount: {
        type: Number,
        required: false
    }
}, { timestamps: true, strict: false });
