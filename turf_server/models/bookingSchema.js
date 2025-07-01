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
    createAt: {
        type: Date,
        default: Date.now,
    }
}, { timestamps: true })

module.exports = mongoose.model("Booking", bookingSchema);