// Importing the AppReview model
const { AppReview_Schema } = require("../schema");

const createAppReviewController = async (req, res) => {
  try {
    const { stars, title, description } = req.body;
    if (!stars || !title || !description) {
      return res.status(400).send({
        status: false,
        message: "All fields (stars, title, and description) are required.",
      });
    }

    const newReview = new AppReview_Schema({
      stars,
      title,
      description,
    });

    const result = await newReview.save();

    res.status(201).send({
      status: true,
      message: "Review created successfully.",
      result,
    });
  } catch (error) {
    res.status(500).send({
      status: false,
      message: `An error occurred: ${error.message}`,
    });
  }
};

module.exports = {
  createAppReviewController,
};
