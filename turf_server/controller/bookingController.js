const Booking = require("../models/bookingSchema");


exports.bookingData = async (req, res) => {
    const { userName, date, session, timeRange, timeDuration } = req.body;
    try {
        const dateIsValid = await Booking.findOne({ date });
        if (!dateIsValid) {
            return res.status(404).json({ message: "Already booked" });
        }
        const bookingDetails = new Booking({ userName, date, session, timeRange, timeDuration });
        await bookingDetails.save();
        res.status(200).json({ bookingDetails, message: "Successfully Booked" });
    } catch (error) {
        res.status(501).json({ message: "Internal Server Error" });
    }
}