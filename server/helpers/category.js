const { check, validationResult } = require("express-validator");

exports.validateCategoryForm = [
  check("categoryName")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Category name cannot be empty"),
  check("categoryType")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Category type cannot be empty"),
];

exports.categoryValidation = (req, res, next) => {
  const result = validationResult(req).array();
  if (!result.length) return next();
  const error = result[0].msg;
  res.status(400).json({ success: false, message: error });
};

exports.validateAddBudgetIdRequest = [
  check("categoryId")
    .not()
    .isEmpty()
    .withMessage("category id cannot be empty"),
  check("budgetId").not().isEmpty().withMessage("budget id cannot be empty"),
];
