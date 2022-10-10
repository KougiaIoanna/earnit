const { check, validationResult } = require("express-validator");

exports.validateUserSignup = [
  check("email").normalizeEmail().isEmail().withMessage("Invalid email!"),
  check("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Password cannot be empty")
    .isLength({ min: 8, max: 20 })
    .withMessage("Password must be 8 to 20 characters long!"),
  check("confirmPassword")
    .trim()
    .not()
    .isEmpty()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Both password must be same!");
      }
      return true;
    }),
];

exports.userValidation = (req, res, next) => {
  //mono an treksei ayth, tha treksoyn ta alla validate

  const result = validationResult(req).array();
  if (!result.length) return next();
  const error = result[0].msg;
  res.status(400).json({ success: false, message: error });
};

exports.validateUserSignin = [
  check("email").trim().isEmail().withMessage("email/password is required"),
  check("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("email/password is required"),
];
