const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: "Name is required.",
    },
    email: {
      type: String,
      required: "Email address is required.",
      unique: "This email address is already in use.",
    },
    password: {
      type: String,
      required: "Password is required.",
      minlength: [8, "Password must be at least 8 characters long."],
      select: false,
    },
    phone: {
      type: String,
      required: "Phone number is required.",
      unique: "This phone number is already in use.",
    },
    role: {
      type: String,
      default: "user",
    },
    otp: {
      type: String,
    },
    otpExpires: {
      type: Date,
    },
    userVerified: {
      type: Boolean,
      default: false,
    },
    language: {
      type: String,
      default: "english",
    },
  },
  { timestamps: true }
);

module.exports.User_Schema = mongoose.model("User", userSchema);
