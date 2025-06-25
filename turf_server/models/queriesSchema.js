const mongoose = require("mongoose");

const queriesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: trusted
    },
    email: {
        type: String,
        required: true
    },
    message: {
        type: String,
        require: true
    }
})

module.exports = mongoose.model('Query', queriesSchema);