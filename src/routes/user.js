const express = require("express");
const app = require("../../app");
const { isAuthorized } = require("../middleware");

const {
  signupController,
  loginController,
  generateOTPController,
  verifyOTPController,
  userDetailsController,
  getUserByIdController,
  userUpdateController,
  verifyOTPForResetPasswordController,
  resetPasswordController
} = require("../controllers");

const authUserRoute = express.Router();

authUserRoute.route("/signup").post(signupController);
authUserRoute.route("/login").post(loginController);
authUserRoute.route("/generateOTP").post(generateOTPController);
authUserRoute.route("/verifyOTP").post(verifyOTPController);
authUserRoute.route("/user").get(isAuthorized, userDetailsController);
authUserRoute.route("/user/:id").get(isAuthorized, getUserByIdController);
authUserRoute.route("/user").put(isAuthorized, userUpdateController);
authUserRoute.route("/resetOTPVerify").post(verifyOTPForResetPasswordController);
authUserRoute.route("/resetPassword").post(resetPasswordController);



const authUser = app.use("/", authUserRoute);

module.exports = { authUser };
