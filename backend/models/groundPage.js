const mongoose = require('mongoose');

const GroundSchema = new mongoose.Schema({
    date: { type: String, required: true },
    slots: {
        afternoon: { type: Boolean, default: false },
        evening: { type: Boolean, default: false },
        night: { type: Boolean, default: false }
    }
});

module.exports = mongoose.model('Ground', GroundSchema);
