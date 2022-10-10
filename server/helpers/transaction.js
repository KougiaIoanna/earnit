const { check, validationResult } = require("express-validator");

exports.validateTransactionForm = [
  check("categoryId").not().isEmpty().withMessage("category cannot be empty"),
  check("transactionAmount")
    .not()
    .isEmpty()
    .withMessage("amount cannot be empty"),
  check("walletId").not().isEmpty().withMessage("wallet cannot be empty"),
];
exports.transactionValidation = (req, res, next) => {
  const result = validationResult(req).array();
  if (!result.length) return next();
  const error = result[0].msg;
  res.status(400).json({ success: false, message: error });
};
