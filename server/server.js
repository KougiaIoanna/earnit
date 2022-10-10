const express = require("express");
const userRouter = require("./routes/user");
const walletRouter = require("./routes/wallet");
const categoryRouter = require("./routes/category");
const budgetRouter = require("./routes/budget");
const goalRouter = require("./routes/goal");
const transactionRouter = require("./routes/transaction");
const app = express();
require("dotenv").config();
var cookieParser = require("cookie-parser");
var session = require("express-session");
const req = require("express/lib/request");
const { queryParser } = require("express-query-parser");

//midleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    secret: "Shh, its a secret!", // todo env var
    saveUninitialized: true,
    resave: true,
  })
);
app.use(queryParser());

app.use(userRouter);
app.use(walletRouter);
app.use(categoryRouter);
app.use(budgetRouter);
app.use(goalRouter);
app.use(transactionRouter);

//routes
app.get("/", (req, res) => {
  res.cookie("name", "Express").send("cookie set");
});
//start listening
app.listen(8000, () => {
  console.log("listening for requests");
});

module.exports = app;
