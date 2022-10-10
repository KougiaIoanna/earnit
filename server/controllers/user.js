const jwt = require("jsonwebtoken");
const User = require("../models/user");
const db = require("../models/db");
const bcrypt = require("bcrypt");
const JSON = require("../helpers/jsonResponse");
const jwtDecode = require("../helpers/jwtDecode");

exports.createUser = async (req, res) => {
  const { email, username, password, confirmPassword } = req.body;
  const hashedPassword = await User.hashPassword(password);
  User.findByEmail(email, (err, foundUserWithThisEmail) => {
    if (err) {
      console.log("error in createUser controller", err);
      return err;
    }
    if (foundUserWithThisEmail.length == 1) {
      JSON(res, false, "This email is already in use, try sign-in");
    } else {
      User.create(email, hashedPassword, username, (err, user) => {
        if (err) JSON(res, false, "error create user");
        if (!err)
          JSON(res, true, { data: user, message: "user created successfully" });
      });
    }
  });
};

exports.userSignin = async (req, res) => {
  const user = new User(req.body);
  await User.findByEmail(user.email, (err, foundUserWithThisEmail) => {
    if (err) {
      console.log("error inside userSignin(controller) method", err.message);
      return res.status(400);
    }
    if (foundUserWithThisEmail.length == 1) {
      const hashedPassword = foundUserWithThisEmail[0].password;
      const id = foundUserWithThisEmail[0].user_id;
      const username = foundUserWithThisEmail[0].username;
      bcrypt.compare(user.password, hashedPassword, (error, isMatch) => {
        if (error) {
          console.log("Error while compairing passords", error);
          return res.status(400);
        }
        if (isMatch) {
          const token = jwt.sign({ userId: id }, process.env.JWT_SECRET, {
            expiresIn: "1y",
          });
          req.session.user = {
            id: id,
            email: user.email,
            username: username,
            token: token,
          };
          User.saveToken(id, token);

          console.log(req.session);
          JSON(res, true, req.session.user);
        } else {
          return res.json({
            success: false,
            message: "email/password dont match",
          });
        }
      });
    } else {
      JSON(res, false, "User not found with this email");
    }
  });
};
exports.signout = async (req, res) => {
  const token = req.body.token;
  const id = jwtDecode(req.body.token);
  //  / delete req.session;

  await User.deleteToken(token, id, (err, resposne) => {
    if (err) JSON(res, false, err);

    if (!err) JSON(res, true, { status: "successfully signed out" });
  });
};
exports.deleteUser = async (req, res) => {
  const { email } = req.body;
  await User.findByEmail(email, (err, user) => {
    if (user.length === 1) {
      User.deleteUser(user[0].user_id, (err, user) => {
        if (err) JSON(res, false, err);

        if (!err) JSON(res, true, { status: "successfully deleted" });
      });
    }
  });
};
