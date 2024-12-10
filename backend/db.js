const mongoose = require("mongoose");

module.exports = () => {
    const connectionURI = process.env.MONGOURL;

    if (!connectionURI) {
        console.error("MongoDB URI not found in environment variables.");
        return;
    }

    mongoose.connect(connectionURI)
        .then(() => console.log("DB connected successfully"))
        .catch((error) => console.error("DB connection error:", error));
};
