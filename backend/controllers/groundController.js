const Ground = require('../models/Ground');

// Get all grounds (accessible by users)
exports.getGrounds = async (req, res) => {
    try {
        const grounds = await Ground.find();
        res.json(grounds);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create a new ground (accessible only by admin)
exports.addGround = async (req, res) => {
    const { groundName, price, address, contactNumber } = req.body;

    const newGround = new Ground({
        groundName,
        price,
        address,
        contactNumber,
        createdBy: req.user.id, // Admin who created it
    });

    try {
        const savedGround = await newGround.save();
        res.status(201).json(savedGround);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
