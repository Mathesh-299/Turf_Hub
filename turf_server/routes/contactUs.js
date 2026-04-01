const express = require("express");
const { postQuery, getQuery, deleteQuery, updateQueryStatus } = require("../controller/contactUsController");
const { authenticateJWT, adminAccess } = require("../middleware/authentication");

const router = express.Router();

router.post("/postQuery", authenticateJWT, postQuery);

router.get("/getQuery", authenticateJWT, adminAccess, getQuery);

router.delete("/deleteQuery/:id", authenticateJWT, adminAccess, deleteQuery);

router.patch("/updateStatus/:id", authenticateJWT, adminAccess, updateQueryStatus);


module.exports = router;