const express = require("express");
const { register, login } = require("../controller/userController");
const { authenticateJWT } = require("../middleware/authentication");
const route = express.Router();

route.post("/register", register);
route.post("/login", login, authenticateJWT);


module.exports = route;