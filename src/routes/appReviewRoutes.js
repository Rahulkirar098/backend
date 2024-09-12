const express = require("express");
const app = require("../../app");
const { isAuthorized } = require("../middleware");

const { createAppReviewController } = require("../controllers");

const appReviewRoute = express.Router();

appReviewRoute
  .route("/appReview")
  .post(isAuthorized, createAppReviewController);

const appReview = app.use("/", appReviewRoute);

module.exports = { appReview };
