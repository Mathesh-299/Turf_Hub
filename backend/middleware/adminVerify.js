const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Middleware to verify if the user is an admin
const verifyAdmin = async (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    // Decode the token and verify the user
    const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);

    // Find the user from the database
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Check if the user is an admin
    if (user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. You are not an admin.' });
    }

    // Attach the user to the request object
    req.user = user;
    next();
  } catch (err) {
    return res.status(400).json({ message: 'Invalid token.' });
  }
};

module.exports = verifyAdmin;
