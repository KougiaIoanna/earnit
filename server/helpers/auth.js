const jwt = require("jsonwebtoken");
const User = require("../../models/user");

exports.isAuth = async (req, res, next) => {
  if (req.headers && req.headers.authorization) {
    //then go
    const token = req.headers.authorization.split(" ")[1];

    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);

      const user = await User.findById(decode.userId);
      if (!user) {
        return res.json({
          success: false,
          message: "unauthorized access",
        });
      }
      req.user = user; //if there is user i add th user to the request
      next();
    } catch (error) {
      if (error.name === "JsonWebTokenError") {
        return res.json({ success: false, message: "unauthorized access" });
      }
      if (error.name === "TokenExpiredError") {
        return res.json({
          success: false,
          message: "session expired try sign in",
        });
      }
      res.json({ success: false, message: "internal server error" });
    }
  } else {
    //then no go
    res.json({ success: false, message: "unauthorized access" });
  }
}; //since the isAuth call in te router post, thw token is now in the req
