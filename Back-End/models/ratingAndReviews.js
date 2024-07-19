const mongoose = require("mongoose");

const RatingAndReviewsSchema = mongoose.Schema({
  ProductId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Products",
    required: true,
  },
  rating: String,

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  description: String,
});
const RatingsAndREvews = mongoose.model(
  "ratingAndReviews",
  RatingAndReviewsSchema
);
module.exports = RatingsAndREvews;
