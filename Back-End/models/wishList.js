const mongoose = require("mongoose");
const Products = require("./prducts");
const { type } = require("os");

const wishListSchema = mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    // required: true,
  },
  products: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Products",
    },
  ],
});
wishListSchema.pre(/^find/, function (next) {
  this.populate({
    path: "products",
  });

  next();
});
const wishList = mongoose.model("wishList", wishListSchema);
module.exports = wishList;
