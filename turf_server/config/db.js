const mongoose = require("mongoose");

const db = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("DB connect");
    } catch (error) {
        console.log("DB error");
    }
}


module.exports = db;