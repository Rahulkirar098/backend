const mongoose = require("mongoose");


const appReviewSchema = new mongoose.Schema(
  {
    stars: { 
      type: Number,  
      required: [true, "Star rating is required."],
      min: [1, "Star rating must be at least 1."],
      max: [5, "Star rating cannot exceed 5."],
    },
    title: {
      type: String,
      required: [true, "Review title is required."],
      trim: true,  
      minlength: [3, "Review title must be at least 3 characters long."],
      maxlength: [100, "Review title cannot exceed 100 characters."],
    },
    description: {
      type: String,
      required: [true, "Review description is required."],
      trim: true, 
      minlength: [10, "Review description must be at least 10 characters long."],
      maxlength: [2000, "Review description cannot exceed 2000 characters."],
    },
  },
  { timestamps: true }  
);

// Export the model with a more descriptive name
module.exports.AppReview_Schema = mongoose.model("AppReview", appReviewSchema);
