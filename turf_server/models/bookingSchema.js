const mongoose = require("mongoose")


const bookingSchema = new mongoose.Schema({
    turfId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Turf",
        require: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true
    },
    userName: {
        type: String,
        require: true
    },
    date: {
        type: String,
        require: true
    },
    session: {
        type: String,
        require: true
    },
    timeRange: {
        type: String,
        require: true
    },
    timeDuration: {
        type: String,
        require: true
    },
    createAt: {
        type: Date,
        default: Date.now,
    }
}, { timestamps: true })

module.exports = mongoose.model("Booking", bookingSchema);