const db = require("./db");
const bcrypt = require("bcrypt");

var User = function (user) {
  //this.user_id = user.user_id;
  this.email = user.email;
  this.username = user.username;
  this.password = user.password;
  this.confirmPassword = user.confirmPassword;
};

User.create = async (email, password, username, result) => {
  const sql = "INSERT INTO Users (email,password, username) Values (?,?,?)";

  return await db.query(sql, [email, password, username], (err, user) => {
    if (err) {
      console.log("error:", err);
      return result(err, null);
    }
    return result(null, user);
  });
};

User.findByEmail = async (email, result) => {
  const sql = "SELECT * FROM Users WHERE email=?";
  await db.query(sql, [email], (err, emailSearch) => {
    if (err) {
      console.log("error:", err);
      return result(err, null);
    }
    return result(null, emailSearch);
  });
};

User.hashPassword = async (password) => {
  try {
    return await bcrypt.hash(password, 8);
  } catch (error) {
    console.log("hashing error", error);
  }
};

User.saveToken = async (user_id, token) => {
  const sql = "UPDATE Users SET auth_token=? WHERE user_id=?";
  try {
    return await db.query(sql, [token, user_id]);
  } catch (err) {
    console.log(err);
  }
};

User.deleteUser = async (id) => {
  const sql = "DELETE FROM Users WHERE user_id=?";
  try {
    return await db.query(sql, [id]);
  } catch (error) {
    console.log("error inside delete user method");
  }
};
User.deleteToken = async (token, id, result) => {
  const sql = "UPDATE Users SET auth_token=? WHERE user_id=?";
  await db.query(sql, [null, id], (err, emailSearch) => {
    if (err) {
      console.log("error:", err);
      return result(err, null);
    }
    return result(null, emailSearch);
  });
};

module.exports = User;
