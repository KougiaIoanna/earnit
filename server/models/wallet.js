const db = require("./db");

var Wallet = function (wallet) {
  this.user_id = wallet.user_id;
  this.wallet_name = wallet.wallet_name;
  this.balance = wallet.balance;
};

Wallet.create = async (userId, walletName, balance, result) => {
  const sql =
    "Insert into Wallets (user_id, wallet_name, balance) Values (?,?,?)";
  return await db.query(sql, [userId, walletName, balance], (err, wallet) => {
    if (err) {
      return result(err, null);
    }
    result(null, wallet);
  });
};

Wallet.getById = async (walletId, result) => {
  const sql = "SELECT * FROM Wallets WHERE wallet_id =?";
  await db.query(sql, [walletId], (err, wallet) => {
    if (err) {
      return result(err, null);
    }
    result(null, wallet);
  });
};

Wallet.getAll = async (userId, result) => {
  const sql = "SELECT * FROM Wallets WHERE user_id=?";
  await db.query(sql, [userId], (err, walletsSearch) => {
    if (err) {
      return result(err, null);
    }
    result(null, walletsSearch);
  });
};

Wallet.update = async (id, newName, newBalance, result) => {
  const sql = "Update Wallets Set wallet_name=?, balance=? Where wallet_id=? ";
  await db.query(sql, [newName, newBalance, id], (err, res) => {
    if (err) {
      return result(err, null);
    }
    result(null, res);
  });
};

Wallet.updateBalance = async (walletId, balance, result) => {
  const sql = "Update Wallets Set balance=?  Where wallet_id=? ";
  await db.query(sql, [balance, walletId], (err, res) => {
    if (err) {
      return result(err, null);
    }
    result(null, res);
  });
};

Wallet.delete = async (walletId, result) => {
  const sql = "DELETE FROM Wallets WHERE wallet_id=? ";
  await db.query(sql, [walletId], (err, res) => {
    if (err) {
      return result(err, null);
    }

    result(null, res);
  });
};
module.exports = Wallet;
