const express = require("express");
const {
    addGround,
    getGround,
    deleteGround,
    updateGround,
    getGroundId,
    getOwnerName,
    editTurf,
} = require("../controller/groundController");
const {
    authenticateJWT,
    adminAccess,
    ownerAccess,
} = require("../middleware/authentication");
const upload = require("../middleware/upload");
const router = express.Router();

router.post(
    "/addGround/:id",
    authenticateJWT,
    adminAccess,
    upload.single("image"),
    addGround
);

router.put(
    "/updateGround/:id",
    authenticateJWT,
    adminAccess,
    upload.single("image"),
    updateGround
);

router.delete("/deleteGround/:id", authenticateJWT, adminAccess, deleteGround);
router.get("/getGround", getGround);
router.get("/getGroundId/:id", getGroundId);
router.get("/getOwnerId/:id", getOwnerName)
router.put("/editTurf/:id",authenticateJWT,ownerAccess,editTurf);
module.exports = router;
