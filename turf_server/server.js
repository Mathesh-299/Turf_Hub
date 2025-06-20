const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");

app.use(express.json());

const port = process.env.PORT || 9000;

app.listen(port, () => {
    console.log(`Server running at ${port}`);
})



