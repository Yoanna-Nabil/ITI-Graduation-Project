const wishList = require("../models/wishList");
const WishList = require("../models/wishList");
const catchAsync = require("../utils/catechAsync");
//get getWishList By userId
const getWishList = catchAsync(async (req, res, next) => {
  const { UserId } = req.params;
  const wishList = await WishList.findOne({ userID: UserId }).populate({
    path: "products",
  });

  res.status(200).json({ message: "success", data: wishList });
});
//create a new getWishList
const createwishList = catchAsync(async (req, res, next) => {
  let newWish = req.body;
  newWish.userID = req.id;

  let newwishList = await wishList.findOneAndUpdate(
    { userID: req.id },
    { $addToSet: { products: newWish.products } },
    { new: true, upsert: true }
  );
  res.status(200).json({ message: "success", data: newwishList });
});
// update current getWishList By userId
const updatewishList = catchAsync(async (req, res, next) => {
  const { UserId } = req.params;

  let UpdateCurrentWishList = await WishList.findOneAndUpdate(
    { userID: UserId },
    {
      $push: req.body,
    }
  );

  res.status(200).json({ message: "success", data: UpdateCurrentWishList });
});
//delete current product from getWishList By userId
const removeAnItemFromAnArry = catchAsync(async (req, res, next) => {
  const { Productid } = req.params;
  const { UserId } = req.params;

  let deletedCategory = await WishList.findOneAndUpdate(
    { userID: UserId },
    {
      $pullAll: {
        products: [{ _id: Productid }],
      },
    },
    {
      new: true,
    }
  );

  res.status(200).json({ message: "success", data: deletedCategory });
});
module.exports = {
  getWishList,
  createwishList,
  updatewishList,
  removeAnItemFromAnArry,
};
