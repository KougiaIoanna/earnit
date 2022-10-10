const Wallet = require("../models/wallet");
const JSON = require("../helpers/jsonResponse");
const jwt = require("jsonwebtoken");
const db = require("../models/db");
const jwtDecode = require("../helpers/jwtDecode");

exports.createWallet = async (req, res) => {
  const userId = jwtDecode(req.headers.authorization);
  const walletName = req.body.walletName;
  const balance = req.body.walletBalance;
  if (
    walletName === null ||
    walletName === undefined ||
    balance === null ||
    balance === undefined
  ) {
    JSON(res, false, "mandatory fields cannot be empty");
    return;
  }
  await Wallet.create(userId, walletName, balance, (err, wallet) => {
    if (err) JSON(res, false, err);
    if (!err) JSON(res, true, { data: wallet });
  });
};

exports.getWalletById = async (req, res) => {
  const walletId = req.params.wallet_id;

  await Wallet.getById(parseInt(walletId), (err, wallet) => {
    if (err) JSON(res, false, err);
    if (!err) JSON(res, true, { data: wallet });
  });
};

exports.getAllWallets = async (req, res) => {
  const id = jwtDecode(req.headers.authorization);
  await Wallet.getAll(id, (err, wallets) => {
    if (err) JSON(res, false, err);
    JSON(res, true, { data: wallets });
  });
};

exports.updateWallet = (req, res) => {
  const walletId = req.params.wallet_id;
  const { walletName, balance } = req.body;
  if (
    walletName === undefined ||
    walletName === null ||
    balance === null ||
    balance === undefined
  ) {
    JSON(res, false, "mandatory fields cannot be null");
    return;
  }
  Wallet.update(walletId, walletName, balance, (err, result) => {
    if (err) JSON(res, false, err);
    if (!err) JSON(res, true, { data: result });
  });
};
exports.updateBalance = async (req, res) => {
  const { balance } = req.body;
  const walletId = req.params.wallet_id;
  if (balance === null || balance === undefined) {
    JSON(res, false, "balance cannot be null");
    return;
  }
  await Wallet.updateBalance(walletId, balance, (err, wallet) => {
    if (err) JSON(res, false, err);
    if (!err) JSON(res, true, { data: wallet });
  });
};

exports.deleteWallet = async (req, res) => {
  const walletId = req.params.wallet_id;
  await Wallet.delete(walletId, (err, wallet_id) => {
    if (err) JSON(res, false, err);
    if (!err) JSON(res, true, { status: "successfully deleted" });
  });
};
