const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    role: {
        type: String,
        enum: ["user", "admin", "owner"],
        default: "user",
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    lastName: {
        type: String,
    },
    country: {
        type: String,
    },
    city: {
        type: String,
    },
    postalCode: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true })

module.exports = mongoose.model("User", userSchema);