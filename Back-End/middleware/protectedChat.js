const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");

const protectedChat = async (req, res, next) => {
  try {
    let { authorization } = req.headers;
    if (!authorization) {
      return next(new AppError("unauthnticated please log in first", 401));
    }
    let decouded = await promisify(jwt.verify)(
      authorization,
      process.env.JWT_SECRET
    );

    req.id = decouded.id;
    let user = await User.findOne({ _id: decouded.id });
    req.role = user.role;
    next();
  } catch (error) {
    res.status(400).json({ error: error.messages });
  }
};
module.exports = { protectedChat };
