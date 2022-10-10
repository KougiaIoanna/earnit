const Budget = require("../models/budget");
const JSON = require("../helpers/jsonResponse");
const db = require("../models/db");
const jwt = require("jsonwebtoken");
const jwtDecode = require("../helpers/jwtDecode");

exports.createBudget = async (req, res) => {
  const userId = jwtDecode(req.headers.authorization);

  const {
    budgetName,
    budgetAmount,
    budgetBalance,
    endDate,
    budgetNote,
    startDate,
  } = req.body;
  if (
    budgetAmount === null ||
    budgetAmount === undefined ||
    budgetName === null ||
    budgetName === undefined ||
    endDate === null ||
    endDate === undefined
  ) {
    JSON(res, false, "mandatory fields cannot be null");
    return;
  }
  return await Budget.create(
    {
      userId,
      budgetName,
      endDate,
      budgetAmount,
      budgetBalance,
      budgetNote,
      startDate,
    },
    (err, budget) => {
      if (err) JSON(res, false, err);
      if (!err) JSON(res, true, { data: budget });
    }
  );
};

exports.getAllBudgets = async (req, res) => {
  const id = jwtDecode(req.headers.authorization);
  await Budget.getAll(id, (err, budgets) => {
    if (err) JSON(res, false, err);
    JSON(res, true, { data: budgets });
  });
};

exports.getBudgetById = async (req, res) => {
  const budgetId = req.params.budget_id;
  await Budget.getById(budgetId, (err, budget) => {
    if (err) JSON(res, false, err);
    JSON(res, true, { data: budget });
  });
};

exports.updateBudget = async (req, res) => {
  const budgetId = req.params.budget_id;

  const { budgetName, budgetAmount, budgetBalance, endDate, budgetNote } =
    req.body;
  if (
    budgetAmount === undefined ||
    budgetAmount === null ||
    budgetBalance === undefined ||
    budgetBalance === null ||
    budgetName === undefined ||
    budgetName === null ||
    endDate === undefined ||
    endDate === null
  ) {
    JSON(res, false, "mandatory fields cannot be empty");
    return;
  }
  Budget.update(
    budgetId,
    budgetName,
    budgetAmount,
    budgetBalance,
    endDate,
    budgetNote,
    (err, result) => {
      if (err) JSON(res, false, err);
      if (!err) JSON(res, true, { data: result });
    }
  );
};

exports.updateBalance = async (req, res) => {
  const { balance } = req.body;
  const budgetId = req.params.budget_id;
  if (balance === null || balance === undefined) {
    JSON(res, false, "balance cannot be null");
    return;
  }
  await Budget.updateBalance(budgetId, balance, (err, budget) => {
    if (err) JSON(res, false, err);
    JSON(res, true, { data: budget });
  });
};

exports.deleteBudget = async (req, res) => {
  const budgetId = req.params.budget_id;
  await Budget.delete(budgetId, (err, result) => {
    if (err) JSON(res, false, err);
    JSON(res, true, { status: "successfully deleted" });
  });
};
