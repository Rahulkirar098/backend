const express = require("express");
const app = require("../../app");
const { isAuthorized } = require("../middleware");

const { checkURL } = require("../controllers");

const checkURLRoute = express.Router();

checkURLRoute.route("/check_url").post(checkURL);

const urlChecker = app.use("/", isAuthorized, checkURLRoute);

module.exports = { urlChecker };
