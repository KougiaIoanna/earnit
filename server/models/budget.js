const db = require("./db");

var Budget = function (budget) {
  this.user_id = budget.user_id;
  this.budget_name = budget.budget_name;
  this.budget_amount = budget.budget_amount;
  this.balance = budget.balance;
  this.end_date = budget.end_date;
  this.note = budget.note;
  this.start_date = budget.start_date;
};

Budget.create = async (newBudget, result) => {
  const {
    userId,
    budgetName,
    endDate,
    budgetAmount,
    budgetBalance,
    budgetNote,
    startDate,
  } = newBudget;
  if (startDate === null || startDate === "" || startDate === undefined) {
    const sql =
      "Insert into Budgets (user_id, budget_name, end_date, budget_amount, balance, note, start_date) Values (?, ?, ?, ?, ?, ?,CURRENT_DATE)";
    await db.query(
      sql,
      [userId, budgetName, endDate, budgetAmount, budgetBalance, budgetNote],
      (err, budget) => {
        if (err) {
          return result(err, null);
        }

        result(null, budget);
      }
    );
  } else {
    const sql =
      "Insert into Budgets (user_id, budget_name, end_date, budget_amount, balance, note, start_date) Values (?, ?, ?, ?, ?, ?,?)";
    await db.query(
      sql,
      [
        userId,
        budgetName,
        endDate,
        budgetAmount,
        budgetBalance,
        budgetNote,
        startDate,
      ],
      (err, budget) => {
        if (err) {
          return result(err, null);
        }

        result(null, budget);
      }
    );
  }
};

Budget.getAll = async (userId, result) => {
  const sql = "SELECT * FROM Budgets WHERE user_id=? order by end_date asc";
  await db.query(sql, [userId], (err, budgets) => {
    if (err) {
      console.log("error:", err);
      return result(err, null);
    }
    result(null, budgets);
  });
};

Budget.getLastBudget = async (userId, result) => {
  await db.query(
    "SELECT * FROM Budgets WHERE user_id=? AND budget_id=(SELECT LAST_INSERT_ID())",
    [userId],
    (err, budget) => {
      if (err) {
        return result(err, null);
      }
      result(null, budget);
    }
  );
};

Budget.update = async (
  budgetId,
  budgetName,
  budgetAmount,
  budgetBalance,
  endDate,
  budgetNote,
  result
) => {
  const sql =
    "Update Budgets Set budget_name=?, budget_amount=?, balance=?, end_date=?, note=? Where budget_id=? ";
  await db.query(
    sql,
    [budgetName, budgetAmount, budgetBalance, endDate, budgetNote, budgetId],
    (err, res) => {
      if (err) {
        console.log("error:", err);
        return result(err, null);
      }
      result(null, res);
    }
  );
};
Budget.updateBalance = async (budgetId, budgetBalance, result) => {
  const sql = "Update Budgets Set balance=?  Where budget_id=? ";
  await db.query(sql, [budgetBalance, budgetId], (err, res) => {
    if (err) {
      console.log("error:", err);
      return result(err, null);
    }
    result(null, res);
  });
};

Budget.getById = async (budgetId, result) => {
  const sql = "SELECT * FROM Budgets WHERE budget_id = ?";
  await db.query(sql, [budgetId], (err, budget) => {
    if (err) {
      return result(err, null);
    }
    result(null, budget);
  });
};

Budget.delete = async (budget_id, result) => {
  const sql = "DELETE FROM Budgets WHERE budget_id=? ";
  await db.query(sql, [budget_id], (err, res) => {
    if (err) {
      console.log("error:", err);
      return result(err, null);
    }
    result(null, res);
  });
};
module.exports = Budget;
