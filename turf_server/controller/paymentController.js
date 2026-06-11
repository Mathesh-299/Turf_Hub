const Razorpay = require("razorpay");
const crypto = require("crypto");
const Booking = require("../models/bookingSchema");

// Initialize Razorpay
const getRazorpayInstance = () => {
    return new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET
    });
};

exports.createOrder = async (req, res) => {
    const { amount, turfId, date, timeRange } = req.body;

    try {
        // Validate inputs
        if (!amount || !turfId || !date || !timeRange) {
            return res.status(400).json({ message: "Missing required order parameters." });
        }

        // Double check slot availability before creating order
        const slotBooked = await Booking.findOne({ turfId, date, timeRange, status: "Booked" });
        if (slotBooked) {
            return res.status(409).json({ message: "This slot is already booked by another user." });
        }

        const razorpay = getRazorpayInstance();
        const options = {
            amount: Math.round(Number(amount) * 100), // amount in paisa
            currency: "INR",
            receipt: `receipt_booking_${Date.now()}`
        };

        const order = await razorpay.orders.create(options);
        res.status(201).json({
            id: order.id,
            currency: order.currency,
            amount: order.amount
        });
    } catch (error) {
        console.error("Razorpay order creation failed:", error);
        res.status(500).json({ message: "Failed to initiate transaction with payment gateway." });
    }
};

exports.verifyPayment = async (req, res) => {
    const {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        bookingDetails
    } = req.body;

    try {
        // Validate signature
        const shasum = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);
        shasum.update(`${razorpay_order_id}|${razorpay_payment_id}`);
        const digest = shasum.digest("hex");

        if (digest !== razorpay_signature) {
            return res.status(400).json({ message: "Transaction signature mismatch. Payment verification failed." });
        }

        // Proceed to save booking in DB
        const { turfId, userId, userName, date, session, timeRange, timeDuration, Amount, paymentMethod, paymentOption } = bookingDetails;

        // Final sanity check of slot
        const slotBooked = await Booking.findOne({ turfId, date, timeRange, status: "Booked" });
        if (slotBooked) {
            return res.status(409).json({ message: "Payment succeeded but slot was already taken." });
        }

        const newBooking = new Booking({
            turfId,
            userId,
            userName,
            date,
            session,
            timeRange,
            timeDuration,
            Amount: String(Amount),
            paymentMethod: paymentMethod || "UPI",
            paymentOption: paymentOption || "Razorpay",
            status: "Booked"
        });

        await newBooking.save();

        res.status(200).json({
            message: "Payment verified and booking confirmed successfully!",
            booking: newBooking
        });
    } catch (error) {
        console.error("Payment verification failed:", error);
        res.status(500).json({ message: "Server encountered an error while verifying payment." });
    }
};
