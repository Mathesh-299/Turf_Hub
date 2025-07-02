const mongoose = require("mongoose")


const bookingSchema = new mongoose.Schema({
    turfId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Turf",
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    session: {
        type: String,
        required: true
    },
    timeRange: {
        type: String,
        required: true
    },
    timeDuration: {
        type: String,
        required: true
    },
    paymentMethod: {
        type: String,
        enum: ["UPI", "Credit / Debit Card", "Cash on Arrival"],
        required: false
    },
    paymentOption: {
        type: String,
        required: false
    },
    Amount: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["Booked", "Cancelled"],
        default: "Booked"
    },
    createAt: {
        type: Date,
        default: Date.now,
    }
}, { timestamps: true })

module.exports = mongoose.model("Booking", bookingSchema);