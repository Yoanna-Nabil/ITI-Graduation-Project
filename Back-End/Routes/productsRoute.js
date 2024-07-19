const express = require("express");
const router = express.Router();
const Product = require("../contolers/products.js");
const {
  resizeProductImages,
  uploadProductPhotos,
} = require("../middleware/multerconfiguration.js");
const {
  CreatePorcuts,
  UpdatePorcut,
  getAllProducts,
  deletedProduct,
  getPorductById,
  Exclusive,
  getProductByCategoryId,
  countProduct,
  getAllProductPagination,
  searchProduct,
  sales,
  bestSellingProducts,
} = require("../contolers/products");
const { protect } = require("../middleware/protecte.js");
const { restrictTo } = require("../middleware/authoraization.js");
router.get("/single/:id", getPorductById);
router.get("/category/:categoryId", getProductByCategoryId);

router.post(
  "/",
  protect,
  uploadProductPhotos,
  resizeProductImages,
  CreatePorcuts
);
router.patch(
  "/:id",
  protect,
  uploadProductPhotos,
  resizeProductImages,
  UpdatePorcut
);
router.delete("/:id", protect, deletedProduct);
router.get("/", getAllProducts);
router.get("/bestSelling", bestSellingProducts);
router.get("/count", countProduct);
router.get("/search", searchProduct);
router.get("/pagination/:pageNumber/:limit", getAllProductPagination);
router.get("/pagination/exclusive/:pageNumber/:limit", Exclusive);
router.get("/pagination/sales/:pageNumber/:limit", sales);

module.exports = router;
