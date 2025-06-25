const Turf = require("../models/turfSchema")

exports.addGround = async (req, res) => {
    const { name, location, price, slots, image } = req.body;
    const id = req.params.id;
    try {
        const turfName = await Turf.findOne({ name, location });
        if (turfName) {
            return res.status(404).json({ message: "Turf already exists at this location" });
        }
        const turf = new Turf({ name, location, price, slots, image, ownerId: id });
        await turf.save();
        res.status(201).json({ turf, message: "Turf Successfully added" });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}


exports.getGround = async (req, res) => {
    try {
        const turfs = await Turf.find();
        res.status(201).json({ turfs, message: "Successfully fetched" });
    } catch (e) {
        res.status(404).json({ message: "Error to fetch" });
    }
}


exports.deleteGround = async (req, res) => {
    const id = req.params.id;
    try {
        const validId = await Turf.findById(id);
        if (!validId) {
            return res.status(404).json({ message: "Turf not found" });
        }
        await Turf.findByIdAndDelete(id);
        res.status(200).json({ message: "Deleted Successfully" });
    } catch (error) {
        res.status(505).json({ message: "Internal Error" });
    }
}


exports.updateGround = async (req, res) => {
    try {
        const id = req.params.id;
        const { name, location, price, image, slots } = req.body;
        const validId = await Turf.findById(id);
        if (!validId) {
            return res.status(404).json({ message: "Turf not found" });
        }
        validId.name = name || validId.name;
        validId.location = location || validId.location;
        validId.price = price || validId.price;
        validId.image = image || validId.image;
        validId.slots = slots || validId.slots;
        await validId.save();
        res.status(200).json({ message: "Updated Successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error updating turf", error: err.message });
    }
}