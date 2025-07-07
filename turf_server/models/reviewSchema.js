const mongoose = require("mongoose");
const reviewSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    turfId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Turf",
        required: true,
    },
    Name: {
        type: String,
        required: true,
    },
    Rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true,
    },
    Comment: {
        type: String,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Review", reviewSchema);
