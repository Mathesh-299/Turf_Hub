const express = require("express");
const { postQuery, getQuery, deleteQuery } = require("../controller/contactUsController");
const { authenticateJWT, adminAccess, ownerAccess } = require("../middleware/authentication");

const router = express.Router();

router.post("/postQuery", authenticateJWT, postQuery);

router.get("/getQuery", authenticateJWT, adminAccess, getQuery);

router.delete("/deleteQuery/:id", authenticateJWT, adminAccess, deleteQuery);


module.exports = router;