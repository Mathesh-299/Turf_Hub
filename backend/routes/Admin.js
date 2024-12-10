const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin"); // Assuming the Admin model exists
const verifyToken = require("../middleware/jwtMiddleware"); // For protecting routes

const router = express.Router();

// Admin Registration Route
router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  
  try {
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create and save new admin
    const newAdmin = new Admin({
      username,
      password: hashedPassword
    });

    await newAdmin.save();
    res.status(201).json({ message: "Admin registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Admin Login Route
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find admin by username
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { adminId: admin._id },
      process.env.JWTPRIVATEKEY,
      { expiresIn: "1h" }
    );

    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Protected Route: Admin Sports Page
router.get("admin/sports", verifyToken, async (req, res) => {
  try {
    // Simulating a dynamic sports page with sports data
    const sports = [
      { name: "Football", description: "Play football on premium turfs" },
      { name: "Cricket", description: "Book our cricket grounds for your match" },
      { name: "Basketball", description: "Top basketball courts for games" },
      { name: "Tennis", description: "Book professional tennis courts" },
      { name: "Volleyball", description: "Great volleyball courts to enjoy the game" }
    ];

    res.status(200).json(sports);
  } catch (err) {
    res.status(500).json({ message: "Error fetching sports data" });
  }
});

module.exports = router;
