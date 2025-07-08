const express = require("express");
const router = express.Router();
const { authenticateJWT } = require('../middleware/authentication.js');
const { bookingData, getSlots, getUserBookingDetails } = require("../controller/bookingController.js");

router.post("/bookTurf/:turfId/:userId", authenticateJWT, bookingData);
router.get("/getSlots/:turfId/:date/:timeOfDay", authenticateJWT, getSlots)
router.get("/getUserBookings/:profileId", authenticateJWT, getUserBookingDetails);
module.exports = router