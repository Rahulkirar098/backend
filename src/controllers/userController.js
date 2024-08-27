//Importing library
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

//Importing schema
const { User_Schema } = require("../schema");

// Password convert into Hash form
const securePassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

// Generate OTP
const generateOTP = () => {
  return crypto.randomInt(10000, 99999).toString(); // Generate a 5-digit OTP
};

// Send OTP via email
const sendOTP = async (email, otp) => {
  try {
    console.log(email, otp);
    return {
      email,
      otp,
    };
  } catch (error) {
    throw new Error("Error sending OTP email.");
  }
};

const signupController = async (request, response) => {
  const { email, password, name, phone, role } = request.body;

  try {
    // Basic validation
    if (!email || !password || !name || !phone) {
      return response.status(400).send({
        status: false,
        message: "All fields are required. Like email, password, name, phone",
      });
    }

    // Check email and phone
    const authEmail = await User_Schema.findOne({ email });

    const authPhone = await User_Schema.findOne({ phone });

    if (authEmail) {
      return response.status(400).send({
        status: false,
        message:
          "This email address is already registered. Please use a different one.",
      });
    }

    if (authPhone) {
      return response.status(400).send({
        status: false,
        message:
          "This phone number is already registered. Please use a different one.",
      });
    }

    // Hash the password
    const hashedPassword = await securePassword(password);

    // Create new user
    const new_user = new User_Schema({
      name,
      email,
      password: hashedPassword,
      phone,
      role,
      // const otp = generateOTP();
      otp: 12345,
      otpExpires: Date.now() + 5 * 60 * 1000, // OTP expires in 5 minutes
    });

    const result = await new_user.save();

    response.status(201).send({
      status: true,
      message: "Account created successfully.",
      result,
    });
  } catch (error) {
    response
      .status(500)
      .send({ status: false, message: "Internal Server Error" });
  }
};

const loginController = async (request, response) => {
  const { email, password } = request.body;

  if (!email || !password) {
    return res.status(400).send({
      status: false,
      message: "Email and password are required.",
    });
  }

  // Find the user and include password field
  const authUser = await User_Schema.findOne({ email }).select("+password");

  try {
    if (!authUser) {
      return response.status(400).send({
        status: false,
        message: "No user found with that email address.",
      });
    }

    // If user is not verified with otp
    if (authUser.userVerified === false) {
      return response.status(200).send({
        status: true,
        message:
          "To complete your account verification, please enter the OTP sent to your email address.",
        userVerified: false,
      });
    }

    // Check if password matches.
    const isPasswordMatch = await bcrypt.compare(password, authUser.password);

    // Create Token.
    const token = jwt.sign({ _id: authUser._id }, process.env.JWT_KEY);

    if (isPasswordMatch) {
      return response.status(200).send({
        status: true,
        message: "login successfully",
        user: {
          _id: authUser._id,
          name: authUser.name,
          email: authUser.email,
          phone: authUser.phone,
          role: authUser.role,
          userVerified: authUser.userVerified,
        },
        token,
      });
    } else {
      return response
        .status(400)
        .send({ status: false, message: "Invalid password." });
    }
  } catch (error) {
    response.status(500).send({ status: false, message: error.message });
  }
};

const generateOTPController = async (request, response) => {
  const { email } = request.body;
  try {
    // Validate email
    if (!email) {
      return res.status(400).send({
        status: false,
        message: "Email is required.",
      });
    }

    // Check if user exists
    const user = await User_Schema.findOne({ email });
    if (!user) {
      return res.status(404).send({
        status: false,
        message: "User not found.",
      });
    }

    // const otp = generateOTP();
    user.otp = 12345;
    user.otpExpires = Date.now() + 5 * 60 * 1000; // OTP expires in 5 minutes
    await user.save();

    // Send OTP to user's email
    await sendOTP(email, 12345);

    response.status(200).send({
      status: true,
      message: "OTP has been sent to your email.",
      user,
    });
  } catch (error) {
    response.status(500).send({
      status: false,
      message: "Internal Server Error.",
    });
  }
};

const verifyOTPController = async (request, response) => {
  const { email, otp } = request.body;

  try {
    // Validate input
    if (!email || !otp) {
      return response.status(400).send({
        status: false,
        message: "Email and OTP are required.",
      });
    }

    // Find user
    const user = await User_Schema.findOne({ email });

    if (!user) {
      return response.status(404).send({
        status: false,
        message: "User not found.",
      });
    }

    // Check OTP validity
    if (user.otp !== otp) {
      return response.status(400).send({
        status: false,
        message: "Invalid OTP.",
      });
    }

    // Check if OTP is expired
    if (Date.now() > user.otpExpires) {
      return response.status(400).send({
        success: false,
        message: "OTP has expired.",
      });
    }

    // OTP is valid, clear OTP and expiry
    user.otp = undefined;
    user.otpExpires = undefined;
    user.userVerified = true;
    await user.save();

    response.status(200).send({
      status: true,
      message: "OTP verified successfully.",
    });
  } catch (error) {
    response.status(500).send({
      status: false,
      message: "Internal Server Error.",
    });
  }
};

module.exports = {
  signupController,
  loginController,
  generateOTPController,
  verifyOTPController,
};
