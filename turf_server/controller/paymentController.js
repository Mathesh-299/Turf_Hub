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
    const { amount, turfId, date, timeRange, currency, receipt } = req.body;

    try {
        // Validate inputs
        if (!amount) {
            return res.status(400).json({ message: "Amount parameter is required." });
        }

        let amountInPaise;
        if (turfId) {
            // Turf booking flow (amount in rupees from existing frontend)
            if (!date || !timeRange) {
                return res.status(400).json({ message: "Missing required order parameters: date, timeRange." });
            }
            // Double check slot availability before creating order
            const slotBooked = await Booking.findOne({ turfId, date, timeRange, status: "Booked" });
            if (slotBooked) {
                return res.status(409).json({ message: "This slot is already booked by another user." });
            }
            amountInPaise = Math.round(Number(amount) * 100);
        } else {
            // General order flow (amount in paise)
            amountInPaise = Number(amount);
        }

        if (isNaN(amountInPaise) || amountInPaise < 100) {
            return res.status(400).json({ message: "Amount must be at least 100 paise." });
        }

        const razorpay = getRazorpayInstance();
        const options = {
            amount: amountInPaise,
            currency: currency || "INR",
            receipt: receipt || `receipt_booking_${Date.now()}`
        };

        const order = await razorpay.orders.create(options);
        res.status(201).json({
            id: order.id,
            order_id: order.id,
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

    // Validate missing fields
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
        return res.status(400).json({ message: "Missing required verification fields." });
    }

    try {
        // Validate signature
        const shasum = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);
        shasum.update(`${razorpay_order_id}|${razorpay_payment_id}`);
        const digest = shasum.digest("hex");

        if (digest !== razorpay_signature) {
            return res.status(400).json({ message: "Transaction signature mismatch. Payment verification failed." });
        }

        // If bookingDetails is not provided, return generic success
        if (!bookingDetails) {
            return res.status(200).json({
                message: "Payment verified successfully!",
                status: "success"
            });
        }

        // Proceed to save booking in DB
        const { turfId, userId, userName, date, session, timeRange, timeDuration, Amount, paymentMethod, paymentOption } = bookingDetails;

        if (!turfId || !userId || !date || !timeRange) {
            return res.status(400).json({ message: "Missing required booking details." });
        }

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

exports.handleWebhook = async (req, res) => {
    const signature = req.headers["x-razorpay-signature"];
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;

    if (!signature) {
        return res.status(400).json({ message: "Missing webhook signature header." });
    }

    try {
        const shasum = crypto.createHmac("sha256", webhookSecret);
        shasum.update(JSON.stringify(req.body));
        const digest = shasum.digest("hex");

        if (digest !== signature) {
            console.warn("Webhook signature verification failed.");
            return res.status(400).json({ message: "Invalid webhook signature." });
        }

        const event = req.body.event;
        console.log(`Razorpay Webhook Verified. Event: ${event}`);

        // Return 200 OK to Razorpay so it knows the webhook was received
        res.status(200).json({ status: "ok" });
    } catch (error) {
        console.error("Webhook processing failed:", error);
        res.status(500).json({ message: "Webhook handler failed." });
    }
};
