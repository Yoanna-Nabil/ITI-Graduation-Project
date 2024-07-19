const categoires = require("../models/category");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catechAsync");
//get all category
const getCategories = catchAsync(async (req, res, next) => {
  let allCategories = await categoires.find();

  res.status(200).json({ message: "success", data: allCategories });
});
//get categotry by id
const getCategoryById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  let newCategory = await categoires.findOne({ _id: id });
  if (!newCategory) {
    return next(
      new AppError(
        " no category   found it may be invalid category id  or the category   has been deleted",
        404
      )
    );
  }

  res.status(200).json({ message: "success", data: newCategory });
});
//create a new category
const createCategory = catchAsync(async (req, res, next) => {
  let newCategory = await categoires.create(req.body);

  res.status(200).json({ message: "success", data: newCategory });
});
// update current category by id
const updateCategory = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  let newCategory = await categoires.findOneAndUpdate({ _id: id }, req.body);
  if (!newCategory) {
    return next(
      new AppError(
        " no category   found it may be invalid category id  or the category   has been deleted",
        404
      )
    );
  }
  res.status(200).json({ message: "success", data: newCategory });
});
//delete current category by id
const deleteCategory = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  let deletedCategory = await categoires.findOneAndDelete({ _id: id });
  if (!deletedCategory) {
    return next(
      new AppError(
        " no category  found it may be invalid category id  or the category   has been deleted",
        404
      )
    );
  }
  res.status(200).json({ message: "success", data: deletedCategory });
});
///////////countCategory//////////////
const countCategory = catchAsync(async (req, res) => {
  const categoryCount = await categoires.find().count();
  res.json({ categoryCount });
});
module.exports = {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  getCategoryById,
  countCategory,
};
