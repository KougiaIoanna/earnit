const db = require("./db");

var Category = function (category) {
  this.userId = category.userId;
  this.categoryName = category.category_name;
  this.categoryType = category.category_type;
  this.budgetId = category.budgetId;
};

Category.create = async (userId, categoryName, categoryType, icon, result) => {
  if (icon === undefined) icon = null;

  const sql =
    "Insert into Categories (user_id, category_name, category_type, category_icon) Values (?,?,?,?)";
  try {
    await db.query(
      sql,
      [userId, categoryName, categoryType, icon],
      (err, category) => {
        console.log("error?", err)
        if (err) {
          return result(err, null);
        }
        result(null, category);
      }
    );
  } catch (error) {
    console.log("Error:", error);
  }
};
Category.getAllIncome = async (userId, result) => {
  const sql = "SELECT * FROM Categories WHERE user_id=? and category_type=?";
  await db.query(sql, [userId, "Income"], (err, incomeCategories) => {
    if (err) {
      return result(err, null);
    }
    result(null, incomeCategories);
  });
};
Category.getAllSpending = async (userId, result) => {
  const sql = "SELECT * FROM Categories WHERE user_id=? and category_type=? ";
  await db.query(sql, [userId, "Spending"], (err, spendingCategories) => {
    if (err) {
      return result(err, null);
    }
    result(null, spendingCategories);
  });
};

Category.getBudgetCategories = async (budgetId, result) => {
  const sql =
    "SELECT category_id, category_name FROM Categories WHERE budget_id = ? ";
  await db.query(sql, [budgetId], (err, budgetCategories) => {
    if (err) {
      return result(err, null);
    }
    result(null, budgetCategories);
  });
};

Category.getById = async (categoryId, result) => {
  const sql = "SELECT * FROM Categories WHERE category_id = ?";
  await db.query(sql, [categoryId], (err, category) => {
    if (err) {
      return result(err, null);
    }
    result(null, category);
  });
};

Category.getCategoryFromName = async (userId, categoryName, result) => {
  const sql =
    "SELECT category_id FROM Categories WHERE user_id = ? AND category_name = ?";
  await db.query(sql, [userId, categoryName], (err, id) => {
    if (err) {
      return result(err, null);
    }
    result(null, id);
  });
};

Category.update = async (categoryId, categoryName, icon, result) => {
  const sql =
    "Update Categories Set category_name=? , category_icon=?  Where category_id=? ";
  await db.query(sql, [categoryName, icon, categoryId], (err, res) => {
    if (err) {
      console.log("error:", err);
      return result(err, null);
    }
    result(null, res);
  });
};

Category.updateBudget = async (categoryId, budgetId, result) => {
  const sql = "Update Categories Set budget_id=?  Where category_id=? ";
  await db.query(sql, [budgetId, categoryId], (err, res) => {
    if (err) {
      console.log("error:", err);
      return result(err, null);
    }
    result(null, res);
  });
};

Category.hideCategory = async (categoryId, result) => {
  const sql = "Update Categories Set hide=? Where category_id=?";
  await db.query(sql, ["true", categoryId], (err, res) => {
    if (err) {
      return result(err, null);
    }
    result(null, res);
  });
};

Category.delete = async (categoryId, result) => {
  //should check if budget id is null
  const sql = "DELETE FROM Categories WHERE category_id=? ";
  await db.query(sql, [categoryId], (err, res) => {
    if (err) {
      console.log("error:", err);
      return result(err, null);
    }
    result(null, res);
  });
};

module.exports = Category;
