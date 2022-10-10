const db = require("./db");

var Transaction = function (transaction) {
  this.transaction_id = transaction.transaction_id;
  this.user_id = transaction.user_id;
  this.account_id = transaction.account_id;
  this.amount = transaction.amount;
  this.transaction_date = transaction.transaction_date;
  this.interval = transaction.interval;
  this.note = transaction.note;
  this.upcoming = transaction.upcoming;
};

Transaction.create = async (
  userId,
  walletId,
  categoryId,
  transactionAmount,
  transactionDate,
  nextOccurrence,
  interval,
  transactionNote,
  upcoming,
  result
) => {

  if (transactionDate === null || transactionDate === "") {
    transactionDate = new Date();
  } else {
   // transactionDate = new Date(transactionDate);
  }

  const sql =
    "Insert into Transactions (user_id, wallet_id, category_id, amount, transaction_date, next_occurrence,interval_period, note, upcoming_transaction) Values (?,?,?,?,?,?,?,?,?)";
  await db.query(
    sql,
    [
      userId,
      walletId,
      categoryId,
      transactionAmount,
      transactionDate,
      nextOccurrence,
      interval,
      transactionNote,
      upcoming,
    ],
    (err, transaction) => {

      if (err) return result(err, null);

      result(null, transaction);
    }
  );
};

Transaction.getById = async (transactionId, result) => {
  const sql =
    "SELECT * FROM Transactions WHERE transaction_id = ? order by transaction_date desc";
  await db.query(sql, [transactionId], (err, transaction) => {
    if (err) return result(err, null);
    result(null, transaction);
  });
};

Transaction.getTransactionsByBudget = async (
  categoriesIds,
  startDate,
  endDate,
  result
) => {
  var sql =
    "SELECT * FROM Transactions WHERE category_id IN (?) AND DATE(transaction_date) BETWEEN ? AND ? order by transaction_date desc";
  await db.query(
    sql,
    [categoriesIds, startDate, endDate],
    (err, transactions) => {
      if (err) return result(err, null);
      result(null, transactions);
    }
  );
};
Transaction.getTransactionsByCategoryId = async (categoryId, result) => {
  const sql = "SELECT * FROM Transactions WHERE category_id =?";
  await db.query(sql, [categoryId], (err, transactions) => {
    if (err) return result(err, null);
    result(null, transactions);
  });
};

Transaction.getTransactionsByDateRange = async (
  id,
  fromDate,
  toDate,
  result
) => {
  var sql =
    "SELECT * FROM Transactions WHERE user_id = ? AND DATE(transaction_date) BETWEEN ? AND ? order by transaction_date desc";
  await db.query(sql, [id, fromDate, toDate], (err, transactions) => {
    if (err) return result(err, null);
    result(null, transactions);
  });
};

Transaction.getLastTransaction = async (userId, result) => {
  await db.query(
    "SELECT * FROM Transactions WHERE  transaction_id = (SELECT LAST_INSERT_ID())", //useeid?
    (err, [userId], transaction) => {
      if (err) return result(err, null);
      result(null, transaction);
    }
  );
};
Transaction.getDailyTotalSpending = async (
  id,
  categoriesIds,
  startDate,
  endDate,
  result
) => {
  const sql =
    "SELECT DATE(transaction_date) as transaction_date ,SUM(amount) as 'SumAmount' FROM Transactions WHERE user_id=? && category_id IN (?) && DATE(transaction_date) BETWEEN ? AND ? GROUP BY DATE(transaction_date) ORDER BY CAST(transaction_date AS DATE) ASC";
  await db.query(
    sql,
    [id, categoriesIds, startDate, endDate],
    (err, transactions) => {
      if (err) return result(err, null);
      result(null, transactions);
    }
  );
};

Transaction.getTransactionsSum = async (id, fromDate, toDate, result) => {
  fromDate = new Date(fromDate);
  toDate = new Date(toDate);
  const sql =
    "SELECT category_id as 'category',SUM(amount) as 'sum' FROM Transactions WHERE user_id=? && transaction_date BETWEEN ? AND ? GROUP BY category_id";
  await db.query(sql, [id, fromDate, toDate], (err, transactions) => {
    if (err) return result(err, null);

    result(null, transactions);
  });
};

Transaction.getAll = async (userId, result) => {
  const sql =
    "SELECT * FROM Transactions WHERE user_id=? ORDER BY transaction_date DESC";
  await db.query(sql, [userId], (err, transactions) => {
    if (err) return result(err, null);

    result(null, transactions);
  });
};

Transaction.getTransactionsByWallet = async (walletId, result) => {
  const sql =
    "SELECT * FROM Transactions WHERE wallet_id=? ORDER BY transaction_date DESC";
  await db.query(sql, [walletId], (err, transactions) => {
    if (err) {
      return result(err, null);
    }
    result(null, transactions);
  });
};

Transaction.getAllRecurring = async (userId, result) => {
  const sql =
    "SELECT * FROM Transactions WHERE user_id=? and next_occurrence IS NOT NULL and upcoming_transaction=? order by next_occurrence asc";
  await db.query(sql, [userId, "true"], (err, transactions) => {
    if (err) return result(err, null);

    result(null, transactions);
  });
};

Transaction.updateNextOccurrence = async (
  transactionId,
  nextOccurrence,
  result
) => {
  const sql =
    "Update Transactions Set next_occurrence=? Where transaction_id=?";
  await db.query(sql, [nextOccurrence, transactionId], (err, res) => {
    if (err) return result(err, null);
    result(null, res);
  });
};

Transaction.update = async (
  transactionId,
  transactionAmount,
  transactionDate,
  transactionNote,
  upcoming,
  result
) => {
  const sql =
    "Update Transactions Set amount=?, transaction_date=?, note=? Where transaction_id=?";
  await db.query(
    sql,
    [
      transactionAmount,
      transactionDate,
      transactionNote,
      parseInt(transactionId),
    ],
    (err, res) => {
      if (err) return result(err, null);

      result(null, res);
    }
  );
};

Transaction.updateUpcoming = async (transactionId, upcoming, result) => {
  const sql =
    "Update Transactions Set upcoming_transaction=?  Where transaction_id=? ";
  await db.query(sql, [upcoming, transactionId], (err, res) => {
    if (err) return result(err, null);

    result(null, res);
  });
};

Transaction.delete = async (transaction_id, result) => {
  const sql = "DELETE FROM Transactions WHERE transaction_id=? ";
  await db.query(sql, [transaction_id], (err, res) => {
    if (err) return result(err, null);
    result(null, res);
  });
};

module.exports = Transaction;
