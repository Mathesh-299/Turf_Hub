const express = require("express");
const { postQuery, getQuery } = require("../controller/contactUsController");
const { authenticateJWT, adminAccess, ownerAccess } = require("../middleware/authentication");

const router = express.Router();

router.post("/postQuery", authenticateJWT, postQuery)

router.get("/getQuery", authenticateJWT, adminAccess,  getQuery)

module.exports = router;