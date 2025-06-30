const express = require("express");
const router = express.Router();
const { authenticateJWT } = require('../middleware/authentication.js');
const { bookingData } = require("../controller/bookingController.js");

router.post("/bookTurf", authenticateJWT, bookingData);