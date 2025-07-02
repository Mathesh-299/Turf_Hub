const express = require("express");
const router = express.Router();
const { authenticateJWT } = require('../middleware/authentication.js');
const { bookingData, getSlots } = require("../controller/bookingController.js");

router.post("/bookTurf/:turfId/:userId", authenticateJWT, bookingData);
router.get("/getSlots/:turfId/:date/:timeOfDay", authenticateJWT, getSlots)
module.exports = router