const { authUser } = require("./user");
const { urlChecker } = require("./urlChecker");
const { appReview } = require("./appReviewRoutes");

module.exports = {
  authUser,
  urlChecker,
  appReview
};
