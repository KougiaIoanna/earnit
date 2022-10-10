const { check, validationResult } = require("express-validator");

exports.validateBudgetForm = [
  check("budgetName")
    .not()
    .isEmpty()
    .withMessage("budget name cannot be empty"),
  check("budgetAmount")
    .not()
    .isEmpty()
    .withMessage("initial amount cannot be empty"),
  check("budgetBalance")
    .not()
    .isEmpty()
    .withMessage("budget balance cannot be empty"),
  check("endDate").not().isEmpty().withMessage("end date cannot be empty"),
];
exports.budgetValidation = (req, res, next) => {
  const result = validationResult(req).array();
  if (!result.length) return next();
  const error = result[0].msg;
  res.status(400).json({ success: false, message: error });
};
