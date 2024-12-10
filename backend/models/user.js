const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

// Define User Schema
const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensure email uniqueness in the database
  },
  password: {
    type: String,
    required: true,
  },
});

// Hash password before saving it
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    console.error("Error hashing password:", err.message);
    next(err);
  }
});

// JWT token generation method
userSchema.methods.generateAuthToken = function () {
  try {
    const token = jwt.sign(
      { _id: this._id },
      process.env.JWTPRIVATEKEY,  // Ensure JWTPRIVATEKEY is in your .env
      { expiresIn: "7d" }
    );
    return token;
  } catch (err) {
    console.error("Error generating JWT:", err.message);
    throw new Error("JWT generation failed.");
  }
};

// Method to compare password for login
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);  // Compare hashed password
};

// Create the User Model
const User = mongoose.model("User", userSchema);

// Joi validation schema
const validate = (data) => {
  const schema = Joi.object({
    fullName: Joi.string().required().label("Full Name"),
    email: Joi.string().email().required().label("Email"),
    password: passwordComplexity().required().label("Password"), // Enforces password complexity
  });

  return schema.validate(data);
};

module.exports = { User, validate };
