const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const DB = require("./config/db");
const path = require("path");

app.use(express.json());
app.use(cors());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const port = process.env.PORT;
DB().then(() => {
    app.listen(port, () => {
        console.log(`Server running at ${port}`);
    });
});

app.use("/api/users", require("./routes/user"));
app.use("/api/ground", require("./routes/ground"));
app.use("/api/contactUs", require("./routes/contactUs"));
// app.use("/api/booking", require("./routes/booking"));
