const express = require("express");
const {
  createWallet,
  getAllWallets,
  getWalletById,
  updateBalance,
  updateWallet,
  deleteWallet,
} = require("../controllers/wallet");
const router = express.Router();
const db = require("../models/db");

router.post("/wallet", createWallet);
router.get("/wallet", getAllWallets);
router.get("/wallet/:wallet_id", getWalletById);
router.patch("/wallet/:wallet_id", updateBalance);
router.put("/wallet/:wallet_id", updateWallet);
router.delete("/wallet/:wallet_id", deleteWallet);

module.exports = router;
