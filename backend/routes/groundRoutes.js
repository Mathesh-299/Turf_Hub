const express = require('express');
const { getGrounds, addGround } = require('../controllers/groundController');
const { verifyAdmin } = require('../middleware/authMiddleware');
const router = express.Router();

// Route to get all grounds (visible to all users)
router.get('/', getGrounds);

// Route to add a new ground (admin only)
router.post('/', verifyAdmin, addGround);

module.exports = router;
