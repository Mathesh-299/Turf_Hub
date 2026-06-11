const Turf = require("../models/turfSchema")
const User = require("../models/userSchema");
const path = require("path");

exports.addGround = async (req, res) => {
    const { name, location, price, contactNumber } = req.body;
    const id = req.params.id;
    const slots = Array.isArray(req.body.slots) ? req.body.slots : [req.body.slots];
    
    // Auth Check: Only matching user or admin can create turf
    if (req.user.role !== 'admin' && id !== req.user.userId) {
        return res.status(403).json({ message: "Access denied: Unauthorized operation" });
    }

    const images = req.files ? req.files.map(file => "uploads/" + path.basename(file.path)) : [];
    const image = images.length ? images[0] : "";

    try {
        const turfName = await Turf.findOne({ name, location });
        if (turfName) {
            return res.status(400).json({ message: "Turf already exists at this location" });
        }

        const turf = new Turf({ name, location, price, slots, image, images, contactNumber, ownerId: id });
        await turf.save();
        res.status(201).json({ turf, message: "Turf Successfully added" });
    } catch (error) {
        console.error("addGround error:", error);
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

        // Owner check: Only owner of this turf or admin can delete it
        if (req.user.role !== 'admin' && validId.ownerId.toString() !== req.user.userId) {
            return res.status(403).json({ message: "Access denied: You do not own this turf" });
        }

        await Turf.findByIdAndDelete(id);
        res.status(200).json({ message: "Deleted Successfully" });
    } catch (error) {
        console.error("deleteGround error:", error);
        res.status(505).json({ message: "Internal Error" });
    }
}


exports.updateGround = async (req, res) => {
    try {
        const id = req.params.id;
        const { name, location, price, contactNumber } = req.body;
        const slots = Array.isArray(req.body.slots) ? req.body.slots : [req.body.slots];
        const images = req.files ? req.files.map(file => "uploads/" + path.basename(file.path)) : undefined;

        const turf = await Turf.findById(id);
        if (!turf) {
            return res.status(404).json({ message: "Turf not found" });
        }

        // Owner check: Only owner of this turf or admin can update it
        if (req.user.role !== 'admin' && turf.ownerId.toString() !== req.user.userId) {
            return res.status(403).json({ message: "Access denied: You do not own this turf" });
        }

        turf.name = name || turf.name;
        turf.location = location || turf.location;
        turf.price = price || turf.price;
        if (contactNumber !== undefined) turf.contactNumber = contactNumber;
        turf.slots = slots.length ? slots : turf.slots;
        if (images && images.length) {
            turf.images = images;
            turf.image = images[0];
        }

        await turf.save();
        res.status(200).json({ message: "Updated Successfully", turf });
    } catch (err) {
        console.error("updateGround error:", err);
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

        // Owner check: Only the owner who created this turf or admin can edit it
        if (req.user.role !== 'admin' && turf.ownerId.toString() !== req.user.userId) {
            return res.status(403).json({ message: "Access denied: You do not own this turf" });
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
