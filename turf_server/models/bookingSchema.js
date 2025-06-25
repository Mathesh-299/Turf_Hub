import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    turfId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Turf',
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    slot: {
        type: String,
        enum: ["Morning", "Afternoon", "Evening", "Night"],
        required: true,
    },
    totalAmount: {
        type: Number,
        required: true,
        min: 0,
    },
    paymentMode: {
        type: String,
        enum: ["Cash", "UPI", "Card"],
        required: true,
    },
    transactionId: {
        type: String,
        default: null,
    },
    isPaid: {
        type: Boolean,
        default: false,
    },
    status: {
        type: String,
        enum: ["Pending", "Confirmed", "Cancelled"],
        default: "Pending",
    },
    cancelReason: {
        type: String,
        default: null,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
});

bookingSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

export default mongoose.model('Booking', bookingSchema);
