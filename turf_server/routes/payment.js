const express = require("express");
const { createOrder, verifyPayment } = require("../controller/paymentController");
const { authenticateJWT } = require("../middleware/authentication");
const router = express.Router();

router.post("/createOrder", authenticateJWT, createOrder);
router.post("/verifyPayment", authenticateJWT, verifyPayment);

module.exports = router;
