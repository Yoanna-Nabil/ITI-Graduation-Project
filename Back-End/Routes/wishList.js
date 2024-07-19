const express = require("express");
const router = express.Router();
const {
  getWishList,
  createwishList,
  updatewishList,
  removeAnItemFromAnArry,
} = require("../contolers/wishList");
const { protect } = require("../middleware/protecte");
router.get("/:UserId", protect,getWishList);
router.post("/", protect, createwishList);
router.post("/:UserId", protect, updatewishList);
router.patch("/:UserId/:Productid", protect, removeAnItemFromAnArry);

module.exports = router;
