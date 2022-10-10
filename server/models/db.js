const mysql = require("mysql");
///must complete database information
// const db = mysql.createConnection({
//   user: "",
//   host: "",
//   password: "",
//   database: "",
//   dateStrings: true
// });

///////////DB for tests only/////////////
// const db = mysql.createConnection({
//   user: "",
//   host: "",
//   password: "",
//   database: "",
// });
/////////////////////////////////////////
db.connect(function (err) {
  if (err) throw err;
  console.log("db connected!");
});

module.exports = db;
