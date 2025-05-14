// /controllers/userController.js
const transporter = require('../config/nodemailerConfig');

const registerUser = async (req, res) => {
    const { fullName, email, password } = req.body;

    // Logic to save the user in the database goes here (you can use your existing user model)

    try {
        // Send an email upon successful registration
        const mailOptions = {
            from: process.env.EMAIL_USER,  // Sender address
            to: email,  // Recipient email
            subject: 'Registration Successful',
            text: 'Congratulations! You have successfully registered.',
            html: '<p>Congratulations! You have successfully registered on our platform.</p>',
        };

        await transporter.sendMail(mailOptions);  // Send email

        res.status(200).json({ message: 'Registration successful! Please check your email.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Registration failed. Please try again.' });
    }
};

module.exports = { registerUser };
