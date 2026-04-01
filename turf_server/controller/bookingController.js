const Booking = require("../models/bookingSchema");
const User = require("../models/userSchema");

exports.bookingData = async (req, res) => {
    const { turfId, userId } = req.params;
    const { userName, date, session, timeRange, timeDuration, paymentMethod, paymentOption, status, Amount } = req.body;
    
    try {
        // Log incoming booking attempt (Optional but helpful for debugging)
        // console.log(`Booking attempt: Turf ${turfId} for User ${userId}`);

        const dateIsValid = await Booking.findOne({ turfId, date, timeRange, status: "Booked" });
        if (dateIsValid) {
            return res.status(409).json({ message: "This slot is already booked." }); // 409 Conflict is more appropriate
        }

        const bookingDetails = new Booking({ 
            turfId, 
            userId, 
            userName, 
            date, 
            session, 
            timeRange, 
            timeDuration, 
            Amount: String(Amount), // Ensure it's a string
            paymentMethod, 
            paymentOption, 
            status 
        });

        await bookingDetails.save();
        res.status(201).json({ bookingDetails, message: "Arena successfully booked!" }); // 201 Created
    } catch (error) {
        console.error("CRITICAL_BOOKING_ERROR:", error);
        res.status(500).json({ message: "Server encountered an error while processing your booking. Check logs for details." });
    }
}

exports.getSlots = async (req, res) => {
    const { turfId, date, timeOfDay } = req.params;
    try {
        const booking = await Booking.find({ turfId, date, session: timeOfDay, status: "Booked" });
        const bookedSlots = booking.map(b => ({
            turfId: turfId,
            timeRange: b.timeRange,
            date: b.date,
            session: b.session
        }));
        res.status(200).json({ bookedSlots });
    } catch (error) {
        console.error("GET_SLOTS_ERROR:", error);
        res.status(500).json({ message: "Error retrieving slots." });
    }
}

exports.getUserBookingDetails = async (req, res) => {
    const { profileId } = req.params;
    try {
        const userValid = await User.findById(profileId);
        if (!userValid) {
            return res.status(404).json({ message: "Profile not found." });
        }
        const booking = await Booking.find({ userId: profileId })
            .populate("turfId", "name location price timeRange date")
            .sort({ createdAt: -1 });
        res.status(200).json({ booking, message: "Retrieved successfully." });
    } catch (error) {
        console.error("USER_BOOKING_DETAILS_ERROR:", error);
        res.status(500).json({ message: "Internal Server Error." });
    }
}