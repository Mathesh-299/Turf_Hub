const express = require("express");
const { addGround, getGround, deleteGround, updateGround } = require("../controller/groundController");
const { authenticateJWT, adminAccess } = require("../middleware/authentication");
const router = express.Router();


router.post("/addGround/:id", authenticateJWT, adminAccess, addGround);
router.put("/updateGround/:id", authenticateJWT, adminAccess, updateGround)
router.delete("/deleteGround/:id", authenticateJWT, adminAccess, deleteGround);
router.get("/getGround", getGround);

module.exports = router;