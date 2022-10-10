const express = require("express");
const {
  createGoal,
  getAllGoals,
  updateGoal,
  deleteGoal,
  updateSavedAmount,
  getGoalById,
  assignToGoal,
  getMonthlySum,
  updateGoalReached,
} = require("../controllers/goal");

const { goalValidation, validateGoalForm } = require("../helpers/goal");
const router = express.Router();
const db = require("../models/db");

router.post("/goal", validateGoalForm, goalValidation, createGoal);
router.get("/goal", getAllGoals);
router.get("/goal/:goal_id", getGoalById);
router.put("/goal/:goal_id", updateGoal);
router.patch("/goal/:goal_id", updateSavedAmount);
router.patch("/goal/reached/:goal_id", updateGoalReached);

router.delete("/goal/:goal_id", deleteGoal);

///for goal assignment
router.post("/goal-assignment/:goal_id", assignToGoal);
router.post("/goal-assignment/monthly-sum/:goal_id", getMonthlySum);

module.exports = router;
