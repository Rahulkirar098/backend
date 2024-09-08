const {
  loginController,
  signupController,
  generateOTPController,
  verifyOTPController,
  userDetailsController,
  getUserByIdController,
  userUpdateController,
  verifyOTPForResetPasswordController,
  resetPasswordController
} = require("./userController");

const {
  checkURL
} = require("./urlChecker");

module.exports = {
  signupController,
  loginController,
  generateOTPController,
  verifyOTPController,
  userDetailsController,
  getUserByIdController,
  userUpdateController,
  verifyOTPForResetPasswordController,
  resetPasswordController,
  checkURL
};
