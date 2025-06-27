const Turf = require("../models/turfSchema")
const User = require("../models/userSchema");
exports.addGround = async (req, res) => {
    const { name, location, price } = req.body;
    const id = req.params.id;
    const slots = Array.isArray(req.body.slots) ? req.body.slots : [req.body.slots];
    const image = req.file ? req.file.path : "";

    try {
        const turfName = await Turf.findOne({ name, location });
        if (turfName) {
            return res.status(400).json({ message: "Turf already exists at this location" });
        }

        const turf = new Turf({ name, location, price, slots, image, ownerId: id });
        await turf.save();
        res.status(201).json({ turf, message: "Turf Successfully added" });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};



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
        const { name, location, price } = req.body;
        const slots = Array.isArray(req.body.slots) ? req.body.slots : [req.body.slots];
        const image = req.file ? req.file.path : undefined;

        const turf = await Turf.findById(id);
        if (!turf) {
            return res.status(404).json({ message: "Turf not found" });
        }

        turf.name = name || turf.name;
        turf.location = location || turf.location;
        turf.price = price || turf.price;
        turf.slots = slots.length ? slots : turf.slots;
        if (image) turf.image = image;

        await turf.save();
        res.status(200).json({ message: "Updated Successfully", turf });
    } catch (err) {
        res.status(500).json({ message: "Error updating turf", error: err.message });
    }
};



exports.getGroundId = async (req, res) => {
    const turfId = req.params.id;
    try {
        const turfValid = await Turf.findById(turfId);
        if (!turfValid) {
            return res.status(404).json({ message: "Turf not found" });
        }
        res.status(201).json({ turfValid, message: "Turf Details" });
    } catch (error) {
        res.status(505).json({ message: "Internal Server error" });
    }

}



exports.getOwnerName = async (req, res) => {
    const ownerId = req.params.id;
    try {
        const user = await User.findById(ownerId);
        if (!user) {
            return res.status(404).json({ message: "Owner Not found" });
        }
        res.status(200).json({ name: user.name, message: "Successful" });
    } catch (error) {
        res.status(505).json({ message: "Internal Server Error" });
    }
}

exports.editTurf = async (req, res) => {
    try {
        const id = req.params.id;
        const { name, location, price, contactNumber, address, slots } = req.body;

        const turf = await Turf.findById(id);
        if (!turf) {
            return res.status(404).json({ message: "Turf not found" });
        }

        turf.name = name || turf.name;
        turf.location = location || turf.location;
        turf.price = price || turf.price;
        turf.contactNumber = contactNumber || turf.contactNumber;
        turf.address = address || turf.address;

        const validSlots = ["Morning", "Afternoon", "Evening", "Night"];
        let updatedSlots = [];

        if (Array.isArray(slots)) {
            updatedSlots = slots.filter(slot => validSlots.includes(slot));
        } else if (slots && validSlots.includes(slots)) {
            updatedSlots = [slots];
        }

        if (updatedSlots.length > 0) {
            turf.slots = updatedSlots;
        }

        await turf.save();

        res.status(200).json({ message: "Updated Successfully", turf });
    } catch (error) {
        console.error("Update error:", error);
        res.status(500).json({ error: "Update failed" });
    }
};
