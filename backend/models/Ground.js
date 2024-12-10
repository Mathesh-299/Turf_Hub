const mongoose = require("mongoose");

const groundSchema = new mongoose.Schema({
  name: String,
  price: Number,
  location: String,
  contact: String,
  image: String,
});

module.exports = mongoose.model("Ground", groundSchema);
