const express = require("express");
const {
  createTransaction,
  getAllTransactions,
  updateTransaction,
  deleteTransaction,
  getTransactionById,
  getLastTransaction,
  getTransactionsByCategoryIds,
  getDailyTotalSpending,
  getTransactionsByDateRange,
  updateUpcoming,
  getTransactionsSum,
  getTransactionsByWallet,
  getAllRecurringTransactions,
  getTransactionsByCategoryId,
  putTransaction,
  updateNextOccurrence,
  getTransactionsByBudget,
} = require("../controllers/transaction");

const {
  transactionValidation,
  validateTransactionForm,
} = require("../helpers/transaction");
const router = express.Router();
const db = require("../models/db");

router.post(
  "/transaction",
  validateTransactionForm,
  transactionValidation,
  createTransaction
);
router.post("/transaction-dailysum", getDailyTotalSpending);
router.post("/transaction-budget", getTransactionsByBudget);
router.post("/transaction-sum", getTransactionsSum);

router.post("/transaction-by-date-range", getTransactionsByDateRange);
router.get("/transaction", getAllTransactions);
router.get("/transaction-recurring", getAllRecurringTransactions);
router.get("/transaction/:transaction_id", getTransactionById);
router.get("/transaction-category/:category_id", getTransactionsByCategoryId);
router.get("/transaction-wallet/:wallet_id", getTransactionsByWallet);
router.patch(
  "/transaction/next-occurrence/:transaction_id",
  updateNextOccurrence
);
router.patch("/transaction/:transaction_id", updateTransaction);
router.patch("/transaction/upcoming/:transaction_id", updateUpcoming);

router.delete("/transaction/:transaction_id", deleteTransaction);

module.exports = router;
