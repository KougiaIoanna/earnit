const Goal = require("../models/goal");
const JSON = require("../helpers/jsonResponse");
const db = require("../models/db");
const jwt = require("jsonwebtoken");
const jwtDecode = require("../helpers/jwtDecode");

exports.createGoal = async (req, res) => {
  // const userId = jwtDecode(req.body.token);
  const userId = jwtDecode(req.headers.authorization);

  const { goalName, targetAmount, savedAmount, targetDate, note, icon } =
    req.body;
  if (
    goalName === null ||
    goalName === undefined ||
    icon === null ||
    icon === undefined
  ) {
    JSON(res, false, "mandatory fields cannot be null");
  }
  await Goal.create(
    userId,
    goalName,
    targetAmount,
    savedAmount,
    targetDate,
    note,
    icon,
    (err, goal) => {
      if (err) JSON(res, false, err);
      JSON(res, true, { data: goal });
    }
  );
};

exports.getAllGoals = async (req, res) => {
  const id = jwtDecode(req.headers.authorization);
  await Goal.getAll(id, (err, goals) => {
    if (err) JSON(res, false, err);
    JSON(res, true, { data: goals });
  });
};

exports.getGoalById = async (req, res) => {
  const goalId = req.params.goal_id;
  await Goal.getGoalById(goalId, (err, goal) => {
    if (err) JSON(res, false, err);
    JSON(res, true, { data: goal });
  });
};

exports.updateGoal = async (req, res) => {
  const { goalName, targetAmount, savedAmount, targetDate, note, icon } =
    req.body;
  const goalId = req.params.goal_id;
  const id = jwtDecode(req.headers.authorization);
  if (goalName === undefined || goalName === null) {
    JSON(res, false, "goal name is a mandatory field");
    return;
  }
  Goal.update(
    id,
    goalId,
    goalName,
    targetAmount,
    savedAmount,
    targetDate,
    note,
    icon,
    (err, result) => {
      if (err) JSON(res, false, err);
      JSON(res, true, { data: result });
    }
  );
};

exports.updateSavedAmount = async (req, res) => {
  const goalId = req.params.goal_id;

  const { amount } = req.body;
  if (amount === undefined) return JSON(res, false, "amount cannot be null");
  Goal.updateSavedAmount(goalId, amount, (err, result) => {
    if (err) JSON(res, false, err);
    JSON(res, true, { data: result });
  });
};

exports.updateGoalReached = async (req, res) => {
  const goalId = req.params.goal_id;
  Goal.updateGoalReached(goalId, (err, result) => {
    if (err) JSON(res, false, err);
    JSON(res, true, { data: result });
  });
};

exports.deleteGoal = async (req, res) => {
  const goalId = req.params.goal_id;
  await Goal.delete(goalId, (err, result) => {
    if (err) JSON(res, false, err);
    if (!err) JSON(res, true, { status: "successfully deleted" });
  });
};

exports.assignToGoal = async (req, res) => {
  const { amount } = req.body;
  const goalId = req.params.goal_id;

  await Goal.createAssignment(goalId, parseInt(amount), (err, goal) => {
    if (err) JSON(res, false, err);
    if (!err) JSON(res, true, { data: goal });
  });
};

exports.getMonthlySum = async (req, res) => {
  const goalId = req.params.goal_id;
  const start = req.body.start;
  const end = req.body.end;

  await Goal.getMonthlySum(goalId, start, end, (err, sum) => {
    if (err) JSON(res, false, err);
    if (!err) JSON(res, true, { data: sum });
  });
};
