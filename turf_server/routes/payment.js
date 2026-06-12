const express = require("express");
const { createOrder, verifyPayment, handleWebhook } = require("../controller/paymentController");
const { authenticateJWT } = require("../middleware/authentication");
const router = express.Router();

router.post("/createOrder", authenticateJWT, createOrder);
router.post("/create-order", authenticateJWT, createOrder);
router.post("/verifyPayment", authenticateJWT, verifyPayment);
router.post("/verify-payment", authenticateJWT, verifyPayment);
router.post("/webhook", handleWebhook);

module.exports = router;
