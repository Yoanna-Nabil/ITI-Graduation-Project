const path = require("path");
const Categories = require("../models/category");
const Products = require("../models/prducts");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catechAsync");
const { populate } = require("dotenv");

//******************** */
//getProductByCategoryId
const getProductByCategoryId = catchAsync(async (req, res, next) => {
  const { categoryId } = req.params;
  const foundProducts = await Products.find({ categoryId: categoryId });
  // if error
  if (foundProducts.length === 0) {
    return next(
      new AppError(
        " no Products  found it may be invalid category Id or the category  has been deleted",
        404
      )
    );
  }
  res.status(200).json({ message: "success", data: foundProducts });
});

// get all porducts
const getAllProducts = catchAsync(async (req, res, next) => {
  const foundProducts = await Products.find().populate([
    { path: "categoryId" },
  ]);
  res.status(200).json({ message: "success", data: foundProducts });
});
// get Product Pagenation
const getAllProductPagination = catchAsync(async (req, res, next) => {
  const { pageNumber, limit } = req.params;
  const totalProduct = await Products.countDocuments();

  let products = await Products.find()

    .skip((pageNumber - 1) * limit)
    .limit(limit)
    .sort({ dateCreated: -1 });

  const totalPage = Math.ceil(totalProduct / limit);
  res.status(200).json({
    message: "success",
    data: products,
    hasNextPage: pageNumber < totalPage,
  });
});
// get porductByid
const getPorductById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const foundProduct = await Products.findOne({ _id: id }).populate({
    path: "ratingAndReviews",
    populate: {
      path: "userId",
    },
  });
  if (!foundProduct) {
    return next(
      new AppError(
        "Product not found it may be invalid Id or the product has been deleted",
        404
      )
    );
  }
  res.status(200).json({ message: "success", data: foundProduct });
});

//get exclusive PRoducts
const Exclusive = catchAsync(async (req, res, next) => {
  const { pageNumber, limit } = req.params;
  const totalProductExclusive = await Products.find({
    isExclusive: true,
  }).countDocuments();
  const exclusiveproudcts = await Products.find({ isExclusive: true })
    .skip((pageNumber - 1) * limit)
    .limit(limit)
    .sort({ dateCreated: -1 });
  const totalPage = Math.ceil(totalProductExclusive / limit);
  res.status(200).json({
    message: "success",
    data: exclusiveproudcts,
    hasNextPage: pageNumber < totalPage,
  });
});
const sales = catchAsync(async (req, res, next) => {
  const { pageNumber, limit } = req.params;
  const totalProductOffers = await Products.find({
    offres: true,
  }).countDocuments();
  const sales = await Products.find({ offres: true })
    .skip((pageNumber - 1) * limit)
    .limit(limit)
    .sort({ dateCreated: -1 });
  const totalPage = Math.ceil(totalProductOffers / limit);
  res.status(200).json({
    message: "success",
    data: sales,
    hasNextPage: pageNumber < totalPage,
  });
});
//get bestSelling product
const bestSellingProducts = catchAsync(async (req, res, next) => {
  const products = await Products.aggregate([{ $match: { sold: { $gt: 0 } } }]);
  let allProducts = [...products];
  allProducts.sort((a, b) => b.sold - a.sold).splice(4);
  res.json(allProducts);
});
// create product

const CreatePorcuts = catchAsync(async (req, res, next) => {
  if (req.file) {
    const compepeteUplaod = { ...req.body };
    let newProduct = await Products.create(compepeteUplaod);
    res.status(200).json({ message: "success", data: newProduct });
  } else {
    let newProduct = await Products.create(req.body);
    res.status(200).json({ message: "success", data: newProduct });
  }
});
// update current product
const UpdatePorcut = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  let upldaedeData = req.body;

  let UpdatedPorcut = await Products.findOneAndUpdate(
    { _id: id },
    upldaedeData
  );
  if (!UpdatedPorcut) {
    return next(
      new AppError(
        " no Products  found it may be invalid product Id or the product  has been deleted",
        404
      )
    );
  }
  res.status(200).json({ message: "success", data: UpdatedPorcut });
});
// Delete current product
const deletedProduct = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  let deletedCategory = await Products.findOneAndDelete({ _id: id });
  if (!deletedCategory) {
    return next(
      new AppError(
        " no Product found it may be invalid product Id or the product  has been deleted",
        404
      )
    );
  }
  res.status(200).json({ message: "success", data: deletedCategory });
});
///////////countCategory//////////////
const countProduct = catchAsync(async (req, res) => {
  const productCount = await Products.find().count();
  res.json({ productCount });
});
////////search Product/////////
const searchProduct = catchAsync(async (req, res) => {
  const { name } = req.query;

  if (!name) {
    return res.status(400).json({ error: "name is required" });
  }

  const regex = new RegExp(name, "i");

  const products = await Products.find({ name: regex });
  if (!products) {
    return next(
      new AppError(
        " no Products found it may be invalid name  or the product  has been deleted",
        404
      )
    );
  }

  res.json(products);
});

module.exports = {
  CreatePorcuts,
  UpdatePorcut,
  deletedProduct,
  sales,
  bestSellingProducts,
  getProductByCategoryId,
  getAllProducts,
  getPorductById,
  countProduct,
  getAllProductPagination,
  searchProduct,
  Exclusive,
};
