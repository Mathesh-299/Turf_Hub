const express = require("express");
const { postReview, getReview, getOverAllReviews } = require("../controller/reviewController");
const { authenticateJWT } = require("../middleware/authentication");
const router = express.Router();

router.post("/postReview/:turfId/:userId", authenticateJWT, postReview);
router.get("/getReviews/:turfId", getReview);
router.get("/overAllReviews/:turfId", getOverAllReviews)
module.exports = router;