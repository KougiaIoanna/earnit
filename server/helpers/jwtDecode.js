const jwt = require("jsonwebtoken");

const decode = (token) => {
  const dec = jwt.verify(token, process.env.JWT_SECRET);
  return dec.userId;
};
module.exports = decode;
