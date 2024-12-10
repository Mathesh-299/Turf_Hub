const router = require("express").Router();
const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  try {
    // Validate request body data
    const { error } = validate(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(409).send({ message: "User with the given email already exists!" });
    }

    // Hash the password using bcrypt
    const saltRounds = Number(process.env.SALT) || 10; // Default to 10 rounds if not set
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Save the new user with hashed password
    const newUser = new User({ ...req.body, password: hashedPassword });
    await newUser.save();

    // Return success response
    const userResponse = {
      fullName: newUser.fullName,
      email: newUser.email,
      _id: newUser._id,
    };

    res.status(201).send({
      message: "Registration is successfully completed",
      user: userResponse,
    });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;
