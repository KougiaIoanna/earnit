import React from "react";
import { setWalletBalance, setWalletName } from "../redux/actions";

export const setStatesNull = (dispatch) => {
  dispatch(setWalletBalance(null));
  dispatch(setWalletName(null));
};

export const findWallet = (id, walletsList) => {
  let wallet;
  for (let i = 0; i < walletsList.length; i++) {
    if (walletsList[i].wallet_id === id) {
      wallet = walletsList[i].wallet_name;
    }
  }
  return wallet;
};

export const makeWalletsForDropdown = (walletsList) => {
  let listOfAccounts = [];
  for (let i = 0; i < walletsList.length; i++) {
    let label =
      walletsList[i].wallet_name + ", " + walletsList[i].balance + "€";
    listOfAccounts[i] = {
      label: label,
      value: walletsList[i].wallet_id.toString(),
    };
  }
  return listOfAccounts;
};
