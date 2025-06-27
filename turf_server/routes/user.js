const express = require("express");
const { register, login, getUserCount, getUserDetails, updateUserDetails } = require("../controller/userController");
const { authenticateJWT, adminAccess } = require("../middleware/authentication");
const route = express.Router();

route.post("/register", register);
route.post("/login", login);
route.get("/getUserCount", authenticateJWT, adminAccess, getUserCount);
route.get("/getUserDetails/:id", authenticateJWT, getUserDetails);
route.patch("/updateUserDetails/:id", authenticateJWT, updateUserDetails);
module.exports = route;