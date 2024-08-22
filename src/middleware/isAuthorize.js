const jwt = require("jsonwebtoken");
const { User_Schema } = require("../schema");

const isAuthorized = async (request, response, next) => {
  const jwtKey = process.env.JWT_KEY;
  const token = request.headers.authorization;

  try {
    if (!token) {
      return response.status(401).send({
        status: false,
        message: "The user is not logged in or is not authenticated.",
      });
    }

    const decode = jwt.verify(token, jwtKey);
    const user = await User_Schema.findOne({ _id: decode._id });

    if (!user) {
      return response.status(401).send({
        status: false,
        message: "User not found or authentication failed.",
      });
    }

    request.user = user;
    next();
  } catch (error) {
    response.status(500).send({
      status: false,
      message: error.message,
    });
  }
};

module.exports = { isAuthorized };
