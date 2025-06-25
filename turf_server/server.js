const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const DB = require("./config/db");
app.use(express.json());
app.use(cors())

// const ground = 
const port = process.env.PORT || 9000;
DB()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server running at ${port}`);
        })
    });

app.use('/api/users', require("./routes/user"));
app.use('/api/ground', require("./routes/ground"));
// app.use("/api/booking", require("./routes/booking"));