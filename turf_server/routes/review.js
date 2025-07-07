const express = require("express");
const { postReview } = require("../controller/reviewController");
const { authenticateJWT } = require("../middleware/authentication");
const router = express.Router();

router.post("/postReview/:turfId/:userId", authenticateJWT, postReview);
module.exports = router;