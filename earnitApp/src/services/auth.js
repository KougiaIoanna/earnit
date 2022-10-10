import React from "react";
import client from "./client";
import {
  serverApprovesSignup,
  serverAprovesSignin,
  setStatesNull,
} from "../utils/authMethods";
import { setUsername, setToken, setId, setIsLoggedin } from "../redux/actions";
import { APIRequestGetWallets } from "./wallets";
import {
  APIRequestGetIncomeCategories,
  APIRequestGetSpendingCategories,
} from "./categories";
import {
  APIRequestGetRecurringTransactions,
  APIRequestGetTransactionsByDateRange,
  APIRequestGetTransactionsSums,
} from "./transactions";
import { endOfCurrentDay, startOfCurrentMonth } from "../utils/timeMethods";

export const APIRequestSignup = async (
  email,
  username,
  password,
  confirmPassword,
  dispatch
) => {
  const promise = new Promise(async (resolve, reject) => {
    await client
      .post("/user", {
        email: email,
        username: username,
        password: password,
        confirmPassword: confirmPassword,
      })
      .then(async (res) => {
        if (serverApprovesSignup(res.data)) {
          APIRequestSignin(email, password, dispatch).then(async (token) => {
            dispatch(setIsLoggedin(true));
          });
          resolve(true);
        }
      })
      .catch((error) => {
        reject("error with sign up");
        console.log("error with sign up:", error.message);
      });
  });

  return promise;
};

export const APIRequestSignin = async (
  email,
  password,
  dispatch,
  navigation
) => {
  const promise = new Promise(async (resolve, reject) => {
    client
      .post("/signin", { email, password })
      .then((res) => {
        if (serverAprovesSignin(res.data)) {
          dispatch(setUsername(res.data.message.username));
          dispatch(setToken(res.data.message.token));
          dispatch(setId(res.data.message.id));
          resolve(res.data.message.token);
          navigation.navigate("HomeScreen");
        }
      })
      .catch((error) => {
        console.log("error with signin,", error, email, password);
        reject("cant sign in");
      });
  });

  return promise;
};

export const APIRequestSignout = async (token, dispatch, navigation) => {
  // console.log("token", token);
  client.post("/signout", { token: token }).then(() => {
    setStatesNull(dispatch);
    navigation.popToTop();
  });
};
