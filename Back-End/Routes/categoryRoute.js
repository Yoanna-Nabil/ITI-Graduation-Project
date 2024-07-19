const express = require("express");
const router = express.Router();
const {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategories,
  getCategoryById,
  countCategory,
} = require("../contolers/categoire");
const { restrictTo } = require("../middleware/authoraization");
const { protect } = require("../middleware/protecte");
router.get("/single/:id", getCategoryById);
router.get("/count", countCategory);

router.get("/", getCategories);
router.post("/", protect, restrictTo("Admin"), createCategory);
router.patch("/:id", protect, restrictTo("Admin"), updateCategory);
router.delete("/:id", protect, restrictTo("Admin"), deleteCategory);

module.exports = router;
