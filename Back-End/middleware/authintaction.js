const User = require("../models/UserModel");
const cryptyo = require("crypto");
const AppError = require("../utils/AppError");
const { Email, sendEmail } = require("../utils/email");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const catchAsync = require("../utils/catechAsync");
//genera; function that generates a Json webtoken
const signtoken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_expires,
  });
};
// sign Up
const SignUP = catchAsync(async (req, res, next) => {
  const { email } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).json({ error: "This Email Already Exists" });
  }
  let NewUser = await User.create(req.body);
  const url = `${req.protocol}://${req.get("host")}/me`;
  console.log(url);
  let token = jwt.sign({ id: NewUser.id, role: NewUser.role }, "seret", {
    expiresIn: "10d",
  });
  try {
    await new Email(NewUser, url).sendWelcome();
    res.status(200).json({ message: "success", data: NewUser, token });
  } catch (error) {
    console.error("Error sending welcome email:", error);
    res.status(409).json({ error: "success, but email not sent" });
  }
});
const SignIn = async (req, res) => {
  try {
    let { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ error: "email and password is required" });
    }
    const findUser = await User.findOne({ email });
    if (!findUser) {
      return res.status(404).json({ error: "user not found" });
    }
    const findPassword = await bcrypt.compare(password, findUser.password);
    if (!findPassword) {
      return res.status(404).json({ error: "password is wrong" });
    }
    const token = signtoken(findUser._id);
    res.status(201).json({ message: "success", token, data: findUser });
  } catch (error) {
    console.log(error.message);
  }
};
const forgetPassword = async (req, res, next) => {
  //1)get user based on email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError("no user with tham email", 404));
  }
  //2)generate random token
  const resetToken = user.createPasswordReastToken();
  await user.save({ validateBeforeSave: false });
  //3)send it to user email random token
  try {
    // const resetUrl = `${req.protocol}://${req.get(
    //   "host"
    // )}/users/resetPasswrod/${resetToken}`;
    const resetUrl = `http://localhost:3000/resetPassword/${resetToken}`;
    await new Email(user, resetUrl).sendPassWordReset();
    res
      .status(200)
      .json({ message: `password reset token  sent to ${user.email}` });
  } catch (err) {
    console.log(err);

    user.createPasswordReastToken = undefined;
    user.PasswordRestExpiredd = undefined;
    await user.save({ validateBeforeSave: false });
    console.error(err);
    res.status(500);
  }
};
const resetpassword = async (req, res, next) => {
  //1) get user based on token

  const hasedtoken = cryptyo
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: hasedtoken,
    // PasswordRestExpiredd: { $gt: Date.now() },
  });
  console.log(user);

  //2) set new passowrd if token not expired and tates is a user
  if (!user) {
    return next(new AppError("token not found or expired", 404));
  }
  //3) update the change passwordAt property
  user.password = req.body.password;
  user.PasswordConfirm = req.body.PasswordConfirm;
  user.passwordResetToken = undefined;
  user.PasswordRestExpiredd = undefined;
  await user.save();
  //4) log in
  const token = signtoken(user._id);
  res.status(200).json({ message: "success", data: token });
};
module.exports = { SignUP, SignIn, forgetPassword, resetpassword };
