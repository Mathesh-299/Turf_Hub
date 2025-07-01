const ContactUs = require("../models/contactSchema");


exports.postQuery = async (req, res) => {
    const { Name, Email, Message } = req.body;
    try {
        if (!Name || !Email || !Message) {
            return res.status(400).json({ message: "Please Fill the all details" });
        }
        const note = new ContactUs({ Name, Email, Message });
        await note.save();
        res.status(200).json({ note, message: "Successfully posted" });
    } catch (error) {
        res.status(500).json({ message: "Internal Sever Error" });
    }
}


exports.getQuery = async (req, res) => {
    try {
        const queries = await ContactUs.find();
        if (queries.length === 0) {
            return res.status(404).json({ message: "Not found" });
        }
        res.status(200).json({ queries, message: "Retrieved Successfully" })
    } catch (error) {
        res.status(501).json({ message: "Internal Server Error" });
    }
}