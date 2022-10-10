const { check, validationResult } = require("express-validator");

exports.validateGoalForm = [
  check("goalName").not().isEmpty().withMessage("goal name cannot be empty"),
];
exports.goalValidation = (req, res, next) => {
  const result = validationResult(req).array();
  if (!result.length) return next();
  const error = result[0].msg;
  res.status(400).json({ success: false, message: error });
};
