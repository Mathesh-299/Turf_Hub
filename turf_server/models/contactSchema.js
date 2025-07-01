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
        // required: true
    }
})

module.exports = mongoose.model('ContactUs', contactSchema);