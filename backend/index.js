require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./db"); // Ensure the file exists in the correct path
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");
const socketIo = require("socket.io"); // Import Socket.io

// Import the Booking model
const Booking = require("./models/bookingschema");

const app = express();
const port = process.env.PORT || 8000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

// Database connection
db();

// Create server and listen for connections
const server = app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Set up Socket.io for real-time communication
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:8000",  // Allow connection from frontend's URL
    methods: ["GET", "POST"],
  }
});

// Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes); // Admin routes

app.get('/api/ground/available', async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});

// API to handle bookings
app.post('/api/ground/book', async (req, res) => {
  const { date, session } = req.body;

  console.log('Received booking request:', req.body);  // Log the incoming data

  try {
    // Check if the booking for the specified date already exists
    let booking = await Booking.findOne({ date });

    if (booking && booking[session]) {
      return res.status(400).json({ error: `${session} slot is already booked.` });
    }

    // If no booking exists for this date, create a new one
    if (!booking) {
      booking = new Booking({ date });
    }

    // Book the session
    booking[session] = true;
    await booking.save();

    res.json({ message: `${session} slot booked successfully.` });
  } catch (error) {
    console.error('Error during booking:', error);  // Log the error
    res.status(500).json({ error: 'Failed to book session' });
  }
});