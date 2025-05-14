const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const verifyToken = require("../middleware/jwtMiddleware");

const router = express.Router();

// Check Username Availability
router.post("/check-username", async (req, res) => {
  const { username } = req.body;

  try {
    const existingAdmin = await Admin.findOne({ username });
    res.status(200).json({ exists: !!existingAdmin });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Admin Registration
router.post("/register", async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;

    // Validate input fields
    if (!username || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // Check if the username or email already exists
    const existingAdmin = await Admin.findOne({ $or: [{ username }, { email }] });
    if (existingAdmin) {
      return res.status(400).json({ message: "Username or Email is already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({ username, email, password: hashedPassword });
    await newAdmin.save();

    res.status(201).json({ message: "Admin registered successfully" });
  } catch (err) {
    console.error("Error during registration:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Admin Login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ adminId: admin._id }, process.env.JWTPRIVATEKEY, { expiresIn: "1h" });
    res.status(200).json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Protected Route
router.get("/sports", verifyToken, async (req, res) => {
  try {
    const sports = [
      { name: "Football", description: "Play football on premium turfs" },
      { name: "Cricket", description: "Book our cricket grounds for your match" },
      { name: "Basketball", description: "Top basketball courts for games" },
      { name: "Tennis", description: "Book professional tennis courts" },
      { name: "Volleyball", description: "Great volleyball courts to enjoy the game" }
    ];

    res.status(200).json(sports);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching sports data" });
  }
});

module.exports = router;
