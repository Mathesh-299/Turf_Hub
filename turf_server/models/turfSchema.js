const mongoose = require("mongoose")

const turfSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    location: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: String,
        required: true,
        min: 0,
    },
    slots: {
        type: [String],
        required: true,
        enum: ["Morning", "Afternoon", "Evening", "Night"],
    },
    image: {
        type: String,
        default: '',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model('Turf', turfSchema);
