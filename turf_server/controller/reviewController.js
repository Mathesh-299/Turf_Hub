const Review = require("../models/reviewSchema");
const Turf = require("../models/turfSchema");
const User = require("../models/userSchema");

exports.postReview = async (req, res) => {
    const { Name, Rating, Comment } = req.body;
    const { turfId, userId } = req.params;
    try {
        const turfValid = await Turf.findById(turfId);
        if (!turfValid) {
            return res.status(404).json({ message: "Turf Not found" });
        }
        const userValid = await User.findById(userId);
        if (!userValid) {
            return res.status(404).json({ message: "User not found" });
        }
        const storedReview = new Review({ Name, Rating, Comment, turfId, userId });
        await storedReview.save();
        res.status(200).json({ message: "Rating Received" })
    } catch (error) {
        res.status(501).json({ message: "Internal Error" });
    }
}


exports.getReview = async (req, res) => {
    const { turfId } = req.params.id;

    try {
        const isValid = await Turf.findById(turfId);
        if (!isValid) {
            res.status(404).json({ message: "Turf Not Found" });
        }
        res.status(202).json({ isValid, message: "Rating Retrieved" });
    } catch (e) {
        res.status(501).json({ message: "Internal Server Error" });
    }
}