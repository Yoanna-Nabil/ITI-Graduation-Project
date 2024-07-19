const productIsRated = (product, userId) => {
  return product.ratingAndReviews.some(
    (rating) => rating.userId.toString() === userId
  );
};
module.exports = { productIsRated };
