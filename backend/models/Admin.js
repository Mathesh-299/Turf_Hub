const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true, // Ensure username is unique
  },
  email: {
    type: String,
    required: false,
    unique: true, // Ensure email is unique if you're using email too
  },
  password: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model("Admin", adminSchema);
