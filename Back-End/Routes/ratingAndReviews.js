const {
  RateReveivewProduct,
  deleteReview,
} = require("../contolers/ratingAndReviews");
const express = require("express");
const { protect } = require("../middleware/protecte");
const { proudctIsBought } = require("../middleware/productIsOrderd");
const router = express.Router();
const { restrictTo } = require("../middleware/authoraization.js");
router.post(
  "/:userId/:productId",
  protect,
  proudctIsBought,
  RateReveivewProduct
);
router.delete(
  "/deleteReview/:ratingId",
  protect,
  restrictTo("Admin"),
  deleteReview
);
module.exports = router;
