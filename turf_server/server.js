const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const DB = require("./config/db");
app.use(express.json());
const port = process.env.PORT || 9000;
DB()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server running at ${port}`);
        })
    });
