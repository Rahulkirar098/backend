const express = require("express");
const app = require("../../app");
const { isAuthorized } = require("../middleware");

const {
  signupController,
  loginController,
  generateOTPController,
  verifyOTPController,
  userDetails,
  getUserById
} = require("../controllers");

const authUserRoute = express.Router();

authUserRoute.route("/signup").post(signupController);
authUserRoute.route("/login").post(loginController);
authUserRoute.route("/generateOTP").post(generateOTPController);
authUserRoute.route("/verifyOTP").post(verifyOTPController);
authUserRoute.route("/user").get(isAuthorized, userDetails);
authUserRoute.route("/user/:id").get(isAuthorized, getUserById);

const authUser = app.use("/", authUserRoute);

module.exports = { authUser };
