//Require
const express = require("express");
const cors = require("cors");
const app = express();

//ENV
require("dotenv").config({ path: "src/config/config.env" });

//Middleware
app.use(express.json());
app.use(cors());

app.get("/", (_, response) => {
  response.send("Welcome to the API!");
});

module.exports = app;
