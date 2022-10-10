const Transaction = require("../models/transaction");
const JSON = require("../helpers/jsonResponse");
const db = require("../models/db");
const jwt = require("jsonwebtoken");
const jwtDecode = require("../helpers/jwtDecode");
const { end } = require("../models/db");

exports.createTransaction = async (req, res) => {
  const userId = jwtDecode(req.headers.authorization);
  const {
    walletId,
    categoryId,
    transactionAmount,
    transactionDate,
    nextOccurrence,
    interval,
    transactionNote,
    upcoming,
  } = req.body;
  if (
    walletId === null ||
    walletId === undefined ||
    categoryId === null ||
    categoryId === undefined ||
    transactionAmount === null ||
    transactionAmount === undefined
  ) {
    JSON(res, false, "mandatory fields cannot be null");
    return;
  }
  await Transaction.create(
    userId,
    walletId,
    categoryId,
    transactionAmount,
    transactionDate,
    nextOccurrence,
    interval,
    transactionNote,
    upcoming,
    (err, transaction) => {
      if (err) JSON(res, false, err);
      if (!err) JSON(res, true, { data: transaction });
    }
  );
};

exports.getAllTransactions = async (req, res) => {
  const id = jwtDecode(req.headers.authorization);
  await Transaction.getAll(id, (err, transactions) => {
    if (err) JSON(res, false, err);
    JSON(res, true, { data: transactions });
  });
};

exports.getTransactionsByWallet = async (req, res) => {
  const id = jwtDecode(req.headers.authorization);
  const walletId = req.params.wallet_id;
  await Transaction.getTransactionsByWallet(walletId, (err, transactions) => {
    if (err) JSON(res, false, err);
    JSON(res, true, { data: transactions });
  });
};

exports.getAllRecurringTransactions = async (req, res) => {
  const userId = jwtDecode(req.headers.authorization);
  await Transaction.getAllRecurring(userId, (err, transactions) => {
    if (err) JSON(res, false, err);
    JSON(res, true, { data: transactions });
  });
};

exports.getTransactionById = async (req, res) => {
  const transactionId = req.params.transaction_id;
  await Transaction.getById(transactionId, (err, transaction) => {
    if (err) JSON(res, false, err);
    JSON(res, true, { data: transaction });
  });
};

exports.getTransactionsByBudget = async (req, res) => {
  const id = jwtDecode(req.headers.authorization);
  const categoriesIds = req.body.categoriesIds;
  const startDate = req.body.startDate;
  const endDate = req.body.endDate;
  await Transaction.getTransactionsByBudget(
    categoriesIds,
    startDate,
    endDate,
    (err, transactions) => {
      if (err) JSON(res, false, err);
      JSON(res, true, { data: transactions });
    }
  );
};

exports.getTransactionsByCategoryId = async (req, res) => {
  const categoryId = req.params.category_id;
  await Transaction.getTransactionsByCategoryId(
    categoryId,
    (err, transactions) => {
      if (err) JSON(res, false, err);
      JSON(res, true, { data: transactions });
    }
  );
};

exports.getLastTransaction = async (req, res) => {
  const userId = jwtDecode(req.headers.authorization);
  await Transaction.getLastTransaction(userId, (err, transaction) => {
    if (err) JSON(res, false, err);
    JSON(res, true, { data: transaction });
  });
};

exports.getTransactionsByDateRange = async (req, res) => {
  const id = jwtDecode(req.headers.authorization);
  const fromDate = req.body.fromDate;
  const toDate = req.body.toDate;
  if (
    fromDate === null ||
    fromDate === undefined ||
    toDate === null ||
    toDate === undefined
  ) {
    JSON(res, fals, "date range cannot be null");
  }
  await Transaction.getTransactionsByDateRange(
    id,
    fromDate,
    toDate,
    (err, transactions) => {
      if (err) JSON(res, false, err);
      if (!err) JSON(res, true, { data: transactions });
    }
  );
};

exports.getTransactionsSum = async (req, res) => {
  const id = jwtDecode(req.headers.authorization);
  const fromDate = req.body.fromDate;
  const toDate = req.body.toDate;
  await Transaction.getTransactionsSum(
    id,
    fromDate,
    toDate,
    (err, transactions) => {
      if (err) JSON(res, false, err);
      if (!err) JSON(res, true, { data: transactions });
    }
  );
};

exports.getDailyTotalSpending = async (req, res) => {
  const id = jwtDecode(req.headers.authorization);
  const { startDate, endDate, categoriesIds } = req.body;
  if (
    startDate === null ||
    startDate === undefined ||
    endDate === null ||
    endDate === undefined ||
    categoriesIds === [] ||
    categoriesIds === null ||
    categoriesIds === undefined
  ) {
    JSON(res, false, "mandatory fields cannot be null");
    return;
  }
  await Transaction.getDailyTotalSpending(
    id,
    categoriesIds,
    startDate,
    endDate,
    (err, transaction) => {
      if (err) JSON(res, false, err);
      JSON(res, true, { data: transaction });
    }
  );
};

exports.updateNextOccurrence = async (req, res) => {
  //const userId = jwtDecode(req.headers.authorization);
  const { nextOccurrence } = req.body;
  if (nextOccurrence === null || nextOccurrence === undefined) {
    JSON(res, false, "nextOccurrence cannot be null");
  }
  const transactionId = req.params.transaction_id;
  Transaction.updateNextOccurrence(
    transactionId,
    nextOccurrence,

    (err, result) => {
      if (err) JSON(res, false, err);
      if (!err) JSON(res, true, { data: result });
    }
  );
};

exports.updateTransaction = async (req, res) => {
  const { transactionAmount, transactionDate, transactionNote, upcoming } =
    req.body;
  const transactionId = req.params.transaction_id;
  Transaction.update(
    transactionId,
    transactionAmount,
    transactionDate,
    transactionNote,
    upcoming,
    (err, result) => {
      if (err) JSON(res, false, err);
      if (!err) JSON(res, true, { data: result });
    }
  );
};

exports.updateUpcoming = async (req, res) => {
  const { upcoming } = req.body;
  const transactionId = req.params.transaction_id;
  await Transaction.updateUpcoming(
    transactionId,
    upcoming,
    (err, transaction) => {
      if (err) JSON(res, false, err);
      JSON(res, true, { data: transaction });
    }
  );
};

exports.deleteTransaction = async (req, res) => {
  const transactionId = req.params.transaction_id;
  await Transaction.delete(transactionId, (err, result) => {
    if (err) JSON(res, false, err);
    JSON(res, true, { status: "successfully deleted" });
  });
};
