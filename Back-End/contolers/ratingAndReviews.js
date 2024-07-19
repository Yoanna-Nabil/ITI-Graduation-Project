const RatingAndReviews = require("../models/ratingAndReviews");
const Order = require("../models/order");
const cactchAsync = require("../utils/catechAsync");
const Products = require("../models/prducts");
const { calcutaeRating } = require("../utils/calcutaeRating");
const { productIsRated } = require("../utils/productIsRated");
const e = require("cors");

const RateReveivewProduct = cactchAsync(async (req, res, next) => {
  const { userId } = req.params;
  const { productId } = req.params;

  req.body.ProductId = productId;
  req.body.userId = userId;
  //1)  geting the product which that is being rated

  let product = await Products.findById(productId).populate({
    path: "ratingAndReviews",
    select: "-__v -_id",
  });
  if (!product) {
    return next(
      new AppError(
        " no Product found it may be invalid id  or the product  has been deleted",
        404
      )
    );
  }
  if (productIsRated(product, userId)) {
    res.status(403).json({ message: "You have already rated the product" });
    return;
  }

  //2)  create a new ReaviewAndRating docuumnt
  const NewRating = await RatingAndReviews.create(req.body);

  let allRatings = product.ratingAndReviews.map((el) => el.rating);
  allRatings.push(req.body.rating);
  //3)  updating rating or review the Rate Field value in this product by calcuating the MODE

  product = await Products.findByIdAndUpdate(productId, {
    $push: { ratingAndReviews: NewRating._id },
    Rate: calcutaeRating(allRatings),
  });
  res.status(200).json({ message: "succes", data: "Rating has been added" });
});
///
const deleteReview = cactchAsync(async (req, res, next) => {
  const { ratingId } = req.params;
  let product = await Products.findOne({
    ratingAndReviews: { _id: ratingId },
  }).populate("ratingAndReviews");
  if (!product) {
    return next(
      new AppError(
        " no Product found it may be invalid id  or the product  has been deleted",
        404
      )
    );
  }
  //  filtrred the raating then reruned an arry of the reaming ratings
  const updatedRatings = product.ratingAndReviews
    .filter((el) => el._id != ratingId)
    .map((el) => el.rating);
  //  updated the product
  product = await Products.findByIdAndUpdate(product._id, {
    $pull: { ratingAndReviews: ratingId },
    Rate: calcutaeRating(updatedRatings),
  });
  //  deleting the rating from the ratng and reviews model the product
  const deletedRating = await RatingAndReviews.findByIdAndDelete(ratingId);
  // handle rateing 404 s
  if (!deletedRating) {
    return next(
      new AppError(
        " no Rating  found it may be rating  id  or the rate  has been deleted",
        404
      )
    );
  }
  res.status(200).json({ data: deletedRating });
});
module.exports = { RateReveivewProduct, deleteReview };
