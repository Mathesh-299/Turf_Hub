const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: { // Fixed the error here by adding a colon ':'
    type: String,
    default: "admin"
  }
});

module.exports = mongoose.model("Admin", AdminSchema);
