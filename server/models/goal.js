const db = require("./db");

var Goal = function (goal) {
  this.user_id = goal.user_id;
  this.goal_name = goal.goal_name;
  this.target_amount = goal.target_amount;
  this.saved_amount = goal.saved_amount;
  this.target_date = goal.target_date;
  this.note = goal.note;
  this.amount = goal.amount; //for goal assignment
  this.date = goal.date; // for goal assignment
};

Goal.create = async (
  userId,
  goalName,
  targetAmount,
  savedAmount,
  targetDate,
  note,
  icon,
  result
) => {
  if (targetAmount === "") {
    targetAmount = null;
  }

  if (targetDate === "") {
    targetDate = null;
  }
  if (icon === [] || icon === undefined) {
    icon = null;
  }
  const sql =
    "Insert into Goals (user_id, goal_name, target_amount, saved_amount, target_date, note, icon) Values (?,?,?,?,?,?,?)";
  try {
    await db.query(
      sql,
      [userId, goalName, targetAmount, savedAmount, targetDate, note, icon],
      (err, goal) => {
        if (err) {
          console.log("error:", err);
          return result(err, null);
        }
        result(null, goal);
      }
    );
  } catch (err) {
    console.log(err);
  }
};

Goal.getAll = async (userId, result) => {
  const sql = "SELECT * FROM Goals WHERE user_id=?";
  await db.query(sql, [userId], (err, goals) => {
    if (err) {
      console.log("error:", err);
      return result(err, null);
    }
    result(null, goals);
  });
};

Goal.getGoalById = async (goalId, result) => {
  const sql = "SELECT * FROM Goals WHERE goal_id = ?";
  await db.query(sql, [goalId], (err, goal) => {
    if (err) {
      return result(err, null);
    }
    result(null, goal);
  });
};

Goal.update = async (
  userId,
  goalId,
  goalName,
  targetAmount,
  savedAmount,
  targetDate,
  note,
  icon,
  result
) => {
  const sql =
    "Update Goals Set user_id=?, goal_name=?, target_amount=?, saved_amount=?, target_date=?, note=?, icon=? Where goal_id=? ";
  await db.query(
    sql,
    [
      userId,
      goalName,
      targetAmount,
      savedAmount,
      targetDate,
      note,
      icon,
      goalId,
    ],
    (err, res) => {
      if (err) {
        console.log("error:", err);

        return result(err, null);
      }
      result(null, res);
    }
  );
};

Goal.updateSavedAmount = async (goalId, amount, result) => {
  const sql = "Update Goals Set saved_amount=? Where goal_id=?";
  await db.query(sql, [amount, goalId], (err, res) => {
    if (err) {
      console.log("error:", err);
      return result(err, null);
    }
    result(null, res);
  });
};

Goal.updateGoalReached = async (goalId, result) => {
  const sql = "Update Goals Set reached=? Where goal_id=? ";
  await db.query(sql, ["true", goalId], (err, res) => {
    if (err) {
      console.log("error:", err);
      return result(err, null);
    }
    result(null, res);
  });
};

Goal.delete = async (goal_id, result) => {
  const sql = "DELETE FROM Goals WHERE goal_id=? ";
  await db.query(sql, [goal_id], (err, res) => {
    if (err) {
      console.log("error:", err);
      return result(err, null);
    }

    result(null, res);
  });
};
Goal.createAssignment = async (goalId, amount, result) => {
  let date = new Date();
  const sql =
    "Insert into GoalAssignments (goal_id,amount,date) Values (?,?,?)";
  await db.query(sql, [goalId, amount, date], (err, assignment) => {
    if (err) {
      return result(err, null);
    }
    return result(null, assignment);
  });
};

Goal.getMonthlySum = async (goalId, start, end, result) => {
  const sql =
    "SELECT SUM(amount) as sum FROM GoalAssignments WHERE goal_id=? && date BETWEEN ? AND ? ";
  await db.query(sql, [goalId, start, end], (err, sum) => {
    if (err) {
      return result(err, null);
    }
    result(null, sum);
  });
};

module.exports = Goal;
