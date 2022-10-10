import React from "react";
import client from "./client";
import { setWalletName, setWalletsList } from "../redux/actions";
import { Alert } from "react-native";

export const APIRequestGetWallets = async (header, dispatch) => {
  await client
    .get("/wallet", header)
    .then((res) => {
      dispatch(setWalletsList(res.data.message.data));
    })
    .catch((err) => {
      console.log("error getting wallets", err);
    });
};
export const APIRequestCreateWallet = async (
  newWallet,
  header,
  dispatch,
  navigation
) => {
  await client
    .post("/wallet", newWallet, header)
    .then(async (res) => {
      await APIRequestGetWallets(header, dispatch);
      navigation.navigate("WalletNavigator", {
        walletsList: res.data.message.data,
      });
    })
    .catch((err) => {
      console.log("error with creare wallet", err);
    });
};
export const APIRequestEditWallet = async (newWallet, walletId) => {
  await client
    .put("/wallet/" + JSON.stringify(walletId), newWallet)
    .then((res) => {})
    .catch((err) => {
      console.log("error with edit wallet:", err);
    });
};

export const APIRequestGetWalletById = async (walletId, dispatch) => {
  await client.get("/wallet/" + JSON.stringify(walletId)).then((res) => {
    dispatch(setWalletName(res.data.message.data[0].wallet_name));
  });
};

export const APIRequestDeleteWallet = (
  walletId,
  header,
  dispatch,
  navigation
) => {
  Alert.alert(
    "❌ Delete Wallet",
    "Are you sure you want to delete this Wallet",
    [
      {
        text: "Cancel",
      },
      {
        text: "Delete",
        onPress: () => {
          client
            .delete("/wallet/" + JSON.stringify(walletId))
            .then(async () => {
              await APIRequestGetWallets(header, dispatch);
              navigation.navigate("WalletNavigator");
            });
        },
      },
    ]
  );
};
