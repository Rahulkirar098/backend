// Importing the AppReview model
const { AppReview_Schema } = require("../schema");

const createAppReviewController = async (req, res) => {
  try {
    const { stars, title, description, anonymous } = req.body;
    if (!stars) {
      return res.status(400).send({
        status: false,
        message: "Atleast stars field are required.",
      });
    }

    const newReview = new AppReview_Schema({
      stars,
      title,
      description,
      anonymous
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
