const express = require("express");
const app = require("../../app");

const {
  signupController,
  loginController,
  generateOTPController,
  verifyOTPController,
} = require("../controllers");

const authUserRoute = express.Router();

authUserRoute.route("/signup").post(signupController);
authUserRoute.route("/login").post(loginController);
authUserRoute.route("/generateOTP").post(generateOTPController);
authUserRoute.route("/verifyOTP").post(verifyOTPController);


const authUser = app.use("/", authUserRoute);

module.exports = { authUser };
