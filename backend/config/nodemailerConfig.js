// /config/nodemailerConfig.js
const nodemailer = require('nodemailer');

// Setup for Gmail (or other service)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,  // Use your email from .env
        pass: process.env.EMAIL_PASS,  // Use your password from .env
    },
});

module.exports = transporter;
