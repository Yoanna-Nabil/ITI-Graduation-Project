const { promises } = require("dns");
const { Category } = require("../models/category");
const { Products } = require("../models/product");
const { Order } = require("../models/order");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  let productInEachCategory;

  let categories = await Category.find();
  categories = categories.map((category) => {
    return {
      name: category.name,
      id: category._id,
    };
  });

  productInEachCategory = categories.map(async (category) => {
    return await Product.aggregate([
      { $match: { category: category.id } },
      {
        $group: {
          _id: "$categoryId",
          count: { $sum: 1 },
        },
      },
    ]);
  });
  productInEachCategory = (await Promise.all(productInEachCategory)).flat();
  productInEachCategory.map((prd) => {
    let { _id } = prd;
    return {
      ...prd,
      name: categories.map((el) => {
        if (_id.toString() === el.id.toString()) {
          return (prd.name = el.name.toString());
        }
      }),
    };
  });
  res.status(200).json({ data: productInEachCategory });
});
router.get("/orders", async (req, res) => {
  let orderperCOuntry = await Order.aggregate([
    {
      $match: { status: { $lt: "4" } },
    },
    {
      $group: {
        _id: "$country",
        count: { $sum: 1 },
      },
    },
  ]);
  orderperCOuntry = orderperCOuntry.flat();
  res.status(200).json({ data: orderperCOuntry });
});
module.exports = router;
