const express = require("express");
const {
  createBudget,
  updateBudget,
  deleteBudget,
  getAllBudgets,
  updateBalance,
  getBudgetById,
  getLastBudget,
} = require("../controllers/budget");
const { validateBudgetForm, budgetValidation } = require("../helpers/budget");
const router = express.Router();
const db = require("../models/db");

router.post("/budget", validateBudgetForm, budgetValidation, createBudget);
router.get("/budget", getAllBudgets);
router.get("/budget/:budget_id", getBudgetById);
router.put("/budget/:budget_id", updateBudget);
router.patch("/budget/:budget_id", updateBalance);
router.delete("/budget/:budget_id", deleteBudget);

module.exports = router;
