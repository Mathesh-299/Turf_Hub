const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
    },
    Email: {
        type: String,
        required: true
    },
    Message: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    status: {
        type: String,
        enum: ["pending", "resolved", "replied"],
        default: "pending"
    }
}, { timestamps: true })

module.exports = mongoose.model('ContactUs', contactSchema);