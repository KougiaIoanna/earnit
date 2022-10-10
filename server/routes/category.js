const express = require("express");
const {
  createCategory,
  updateCategory,
  deleteCategory,
  getIncomeCategories,
  getSpendingCategories,
  getBudgetCategories,
  updateBudget,
  getCategoryById,
  getCategoryFromName,
  hideCategory,
} = require("../controllers/category");
const {
  validateCategoryForm,
  categoryValidation,
  validateAddBudgetIdRequest,
} = require("../helpers/category");

const router = express.Router();
const db = require("../models/db");

router.post(
  "/category",
  validateCategoryForm,
  categoryValidation,
  createCategory
);
router.get("/category/income", getIncomeCategories);
router.get("/category/spending", getSpendingCategories);
router.get("/category/from/:category_name", getCategoryFromName);
router.get("/category/:category_id", getCategoryById);
router.put("/category/:category_id", updateCategory);
router.patch(
  "/category/budget",
  // validateAddBudgetIdRequest,
  // categoryValidation,
  updateBudget
);
router.patch("/category/hide/:category_id", hideCategory);
router.delete("/category/:category_id", deleteCategory);

module.exports = router;
