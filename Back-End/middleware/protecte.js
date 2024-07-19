const catchAsync = require("../utils/catechAsync");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");
const AppError = require("../utils/AppError");

const protect = catchAsync(async (req, res, next) => {
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
});
module.exports = { protect };
