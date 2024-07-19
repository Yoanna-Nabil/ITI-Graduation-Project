const mongoose = require("mongoose");
const { type } = require("os");

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  images: [],
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Categories",
    required: true,
  },
  description: {
    type: String,
  },
  Quantity: {
    type: Number,
    min: 0,
    max: 255,
  },

  price: {
    type: Number,
    default: 0,
  },
  ratingAndReviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ratingAndReviews",
    },
  ],
  isFeatured: {
    type: Boolean,
    default: false,
  },
  Rate: { type: String, default: 0 },
  isExclusive: {
    type: Boolean,
    default: false,
  },
  offres: {
    type: Boolean,
    default: false,
  },
  priceAfterOffer: {
    type: Number,
    default: 0,
  },
  sold: {
    type: Number,
    default: 0,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});
const Products = mongoose.model("Products", categorySchema);
module.exports = Products;
