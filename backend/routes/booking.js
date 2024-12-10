const express = require('express');
const Ground = require('../models/groundPage');

module.exports = (io) => {
    const router = express.Router();

    // Get all ground availability
    router.get('/availability', async (req, res) => {
        try {
            const grounds = await Ground.find();
            res.json(grounds);
        } catch (err) {
            res.status(500).send('Server Error');
        }
    });

    // Book a slot
    router.post('/book', async (req, res) => {
        const { date, slot } = req.body;
        try {
            const ground = await Ground.findOne({ date });
            if (ground && ground.slots[slot] === false) {
                ground.slots[slot] = true;
                await ground.save();

                // Emit booking update in real-time
                io.emit('slotBooked', { date, slot });
                return res.status(200).json({ message: 'Booking successful' });
            }
            return res.status(400).json({ message: 'Slot is already booked or invalid' });
        } catch (err) {
            res.status(500).send('Server Error');
        }
    });

    return router;
};
