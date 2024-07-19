const User = require("../models/UserModel");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catechAsync");
const bcrypt = require("bcryptjs");

const getUser = catchAsync(async (req, res, next) => {
  const { userId } = req.params;
  const foundUser = await User.findOne({ _id: userId });
  if (!foundUser) {
    return next(
      new AppError(
        " no User  found it may be invalid userId   or the user  has been deleted",
        404
      )
    );
  }
  res.status(200).json({ message: "success", data: foundUser });
});
////////////delete user
const deleteUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const findUser = await User.findByIdAndDelete(id);

  if (!findUser) {
    return next(
      new AppError(
        " no User  found it may be invalid userId   or the user  has been deleted",
        404
      )
    );
  }
  return res.status(200).json({ message: "user deleted successfully" });
});
//////////update Use/////////
const updateUser = catchAsync(async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, role, address, password } = req.body;
    const currentUser = await User.findById(id);
    if (!currentUser) {
      return next(
        new AppError(
          " no User  found it may be invalid userId   or the user  has been deleted",
          404
        )
      );
    }
    let updataObject = {};

    if (name) updataObject.name = name;
    if (email && email !== currentUser.email) {
      const findEmail = await User.findOne({ email });
      if (findEmail) {
        return res.status(500).json({ error: "email already exist" });
      }
      updataObject.email = email;
    }
    if (role) updataObject.role = role;
    if (address) updataObject.address = address;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      updataObject.password = await bcrypt.hash(password, salt);
    }
    const finduser = await User.findByIdAndUpdate(
      id,
      { $set: updataObject },
      { new: true }
    );
    if (finduser) {
      return res
        .status(200)
        .json({ message: "user updated successfully", data: finduser });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
////////getCountUser///////////
const countUser = async (req, res) => {
  const userCount = await User.find().count();
  res.json({ userCount });
};
///////get all user//////////
const getAllUsers = catchAsync(async (req, res, next) => {
  const foundUsers = await User.find();
  res.status(200).json({ message: "success", data: foundUsers });
});

module.exports = { getUser, getAllUsers, deleteUser, updateUser, countUser };
