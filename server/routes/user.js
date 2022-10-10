const express = require("express");
const router = express.Router();
const {
  validateUserSignup,
  userValidation,
  validateUserSignin,
} = require("../helpers/user");
const {
  createUser,
  userSignin,
  deleteUser,
  signout,
} = require("../controllers/user");

router.post("/user", validateUserSignup, userValidation, createUser);
router.post("/signin", validateUserSignin, userValidation, userSignin);
router.post("/signout", signout);
// helper route for testing
router.delete("/delete-user", deleteUser);

module.exports = router;
