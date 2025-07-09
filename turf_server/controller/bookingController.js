const Booking = require("../models/bookingSchema");
const User = require("../models/userSchema");
exports.bookingData = async (req, res) => {
    const { turfId, userId } = req.params;
    const { userName, date, session, timeRange, timeDuration, paymentMethod, paymentOption, status, Amount } = req.body;
    try {
        const dateIsValid = await Booking.findOne({ turfId, date, timeRange, status });
        if (dateIsValid) {
            return res.status(404).json({ message: "Already booked" });
        }
        const bookingDetails = new Booking({ turfId, userId, userName, date, session, timeRange, timeDuration, Amount, paymentMethod, paymentOption, status });
        await bookingDetails.save();
        res.status(200).json({ bookingDetails, message: "Successfully Booked" });
    } catch (error) {
        res.status(501).json({ message: "Internal Server Error" });
    }
}


exports.getSlots = async (req, res) => {
    const { turfId, date, timeOfDay } = req.params;
    try {
        const booking = await Booking.find({ turfId, date, session: timeOfDay });
        if (!booking) {
            res.status(404).json({ message: "Not Found" });
        }
        const bookedSlots = booking.map(b => ({
            turfId: turfId,
            timeRange: b.timeRange,
            date: b.date,
            session: b.session
        }));
        res.status(200).json({ bookedSlots });
    } catch (error) {
        res.status(501).json({ message: "Internal Server Error" });
    }
}


exports.getUserBookingDetails = async (req, res) => {
    const { profileId } = req.params;
    try {
        const userValid = await User.findById(profileId);
        if (!userValid) {
            return res.status(404).json({ message: "User Not found" });
        }
        const booking = await Booking.find({ userId: profileId }).populate("turfId", "name location price timeRange date").sort({ createdAt: -1 })
        res.status(200).json({ booking, message: "Retrived Successfully" });
    } catch (error) {
        res.status(501).json({ message: "Internal Server Error" });
    }
}