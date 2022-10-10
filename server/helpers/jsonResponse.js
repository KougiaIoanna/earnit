const JSON = (res, success, message) => {
  // console.log("json???", st, success, message);

  if (success == false) {
    st = 400;
  } else {
    st = 200;
  }
  return res.status(st).json({
    success: success,
    message: message,
  });
};
module.exports = JSON;
