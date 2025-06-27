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
        type: Number,
        required: true,
        min: 0,
    },
    slots: {
        type: [String],
        required: true,
        enum: ["Morning", "Afternoon", "Evening", "Night"],
    },
    address: {
        type: String,
        default: ""
    },
    contactNumber: {
        type: String,
        trim: true,
        default: '',
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
    reviews: [
        {
            userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            comment: { type: String, trim: true },
            rating: { type: Number, min: 1, max: 5 },
            createdAt: { type: Date, default: Date.now },
        }
    ],
}, { timestamps: true });

module.exports = mongoose.model('Turf', turfSchema);
