import React from "react";
import client from "./client";
import {
  setTransactionsList,
  setBudgetsList,
  setRecurringTransactionsList,
  setTransactionDate,
  setTransactionsListForChart,
  setBudgetBalance,
  setTransactionsSumByCategory,
  setTransactionsSumsByCategory,
  setTransactionsByWallet,
} from "../redux/actions";
import {
  startOfCurrentMonth,
  endOfCurrentDay,
  endOfYear,
  endOfThisMonth,
} from "../utils/timeMethods";
import { setWalletBalance } from "../redux/actions";
import { Alert } from "react-native";
import {
  handleDeleteIncome,
  handlePostExpense,
  handlePostExpenseAndDeleteIncome,
  handlePostIncome,
  handlePostIncomeANdDeleteExpense,
  isDeleteRequestExpenseAction,
  isDeleteRequestIncomeAction,
  isPostExpenseOrDeleteIncome,
  isPostIncomeOrDeleteExpense,
  isPostRequestExpenseAction,
  isPostRequestIncomeAction,
  toPostOrToDelete,
} from "../utils/transactionMethods";
import { APIRequestGetBudgets } from "./budgets";
import moment from "moment";
import { flushSync } from "react-dom";

export const APIRequestGetTransactionsByDateRange = async (
  fromDate,
  toDate,
  header,
  dispatch,
  transactionOrChart
) => {
  await client
    .post(
      "/transaction-by-date-range",
      { fromDate: new Date(fromDate), toDate: new Date(toDate) },
      header
    )
    .then((res) => {
      if (transactionOrChart === "transaction")
        dispatch(setTransactionsList(res.data.message.data));
      if (transactionOrChart === "chart")
        dispatch(setTransactionsListForChart(res.data.message.data));
      else {
        dispatch(setTransactionsList(res.data.message.data));
      }
    });
};

export const APIRequestCreateTransaction = async (
  newTransaction,
  action,
  header,
  dispatch
) => {
  const interval = newTransaction.interval;
  const transactionAmount = newTransaction.transactionAmount;
  const transactionDate = newTransaction.transactionDate;
  await client
    .post("/transaction", newTransaction, header)
    .then(async (response) => {
      let latestTransactionId = response.data.message.data.insertId;

      await updateWallet(
        newTransaction.walletId,
        "post",
        dispatch,
        action,
        header,
        transactionAmount,
        latestTransactionId
      );
      await updateBudget(
        newTransaction.categoryId,
        "post",
        dispatch,
        action,
        header,
        transactionAmount,
        transactionDate,
        latestTransactionId
      );
    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response);
        console.log("server responded");
      } else if (error.request) {
        console.log("network error");
      } else {
        console.log(error, " err?");
      }
    });
  await APIRequestGetTransactionsSums(
    startOfCurrentMonth(),
    endOfCurrentDay(),
    header,
    dispatch
  );
};

export const APIRequestFetchDataAfterNewTransaction = async (
  header,
  dispatch
) => {
  const fromDate = startOfCurrentMonth();
  const toDate = endOfCurrentDay();
  await APIRequestGetTransactionsByDateRange(
    fromDate,
    toDate,
    header,
    dispatch,
    "both"
  );
  APIRequestGetBudgets(header, dispatch);
  APIRequestGetRecurringTransactions(header, dispatch);
};

export const APIRequestGetRecurringTransactions = async (header, dispatch) => {
  await client.get("/transaction-recurring", header).then((res) => {
    dispatch(setRecurringTransactionsList(res.data.message.data));
  });
};

export const APIRequestGetTransactionsSums = async (
  fromDate,
  toDate,
  header,
  dispatch
) => {
  await client
    .post("/transaction-sum", { fromDate: fromDate, toDate: toDate }, header)
    .then((res) => {
      dispatch(setTransactionsSumsByCategory(res.data.message.data));
    });
};

export const APIRequestGetTransactionsSumsForReports = async (
  fromDate,
  toDate,
  header,
  dispatch,
  setSums
) => {
  await client
    .post("/transaction-sum", { fromDate: fromDate, toDate: toDate }, header)
    .then((res) => {
      flushSync(setSums(res.data.message.data));
    }).catch((err)=>{
      console.log("error", err)
    });
};

export const APIRequestGetTransactionsByWallet = async (
  walletId,
  header,
  dispatch
) => {
  await client
    .get("/transaction-wallet/" + JSON.stringify(walletId), header)
    .then((res) => {
      dispatch(setTransactionsByWallet(res.data.message.data));
    });
};

export const APIRequestUpdateUpcomingTransaction = async (id) => {
  await client.patch("/transaction/upcoming/" + JSON.stringify(id), {
    upcoming: "false",
  });
};

export const APIRequestUpdateNextOccurrence = async (
  id,
  nextOccurrence,
  header,
  dispatch
) => {
  await client.patch("/transaction/next-occurrence/" + JSON.stringify(id), {
    nextOccurrence: nextOccurrence,
  });
};

export const APIRequestEditTransaction = async (
  id,
  newTransaction,
  header,
  dispatch,
  action,
  difference
) => {
  await client
    .patch("/transaction/" + JSON.stringify(id), newTransaction)
    .then((res) => {
      APIRequestGetTransactionsByDateRange(
        startOfCurrentMonth(),
        moment(endOfThisMonth),
        header,
        dispatch
      );
      client.get("/transaction/" + JSON.stringify(id), header).then((res) => {
        let latestTransaction = res.data.message.data[0];
        if (difference) {
          updateWallet(
            latestTransaction.wallet_id,
            "delete",
            dispatch,
            action,
            header,
            difference,
            id
          );
          updateBudget(
            latestTransaction.category_id,
            "delete",
            dispatch,
            action,
            header,
            difference,
            newTransaction.transactionDate,
            id
          );
        }
      });
    });
};

export const APIRequestDeleteTransaction = async (
  transactionId,
  budgetId,
  walletId,
  transactionDate,
  header,
  action,
  amount,
  dispatch
) => {
  const promise = new Promise(async (resolve, reject) => {
    Alert.alert(
      "❌ Delete Transaction",
      "Are you sure you want to delete this Transaction?",
      [
        {
          text: "Cancel",
          onPress: () => {
            reject("dont delete");
          },
        },
        {
          text: "Delete",
          onPress: async () => {
            await client
              .get("/transaction/" + JSON.stringify(transactionId), header)
              .then(async (latestTransaction) => {
                var categoryId =
                  latestTransaction.data.message.data[0].category_id;
                await client
                  .delete("/transaction/" + JSON.stringify(transactionId))
                  .then(async () => {
                    updateWallet(
                      walletId,
                      "delete",
                      dispatch,
                      action,
                      header,
                      amount,
                      transactionId
                    );

                    await updateBudget(
                      latestTransaction.data.message.data[0].category_id,
                      "delete",
                      dispatch,
                      action,
                      header,
                      amount,
                      transactionDate,
                      latestTransaction.data.message.data[0].transaction_id
                    );
                  });
              });

            resolve("delete");
          },
        },
      ]
    );
  });
  return promise;
};

const updateBudget = async (
  categoryId,
  request,
  dispatch,
  action,
  header,
  transactionAmount,
  transactionDate,
  transactionId
) => {
  if (transactionDate === null) transactionDate = moment();
  await client.get("/category/" + categoryId, header).then((res) => {
    let budgetId = res.data.message.data[0].budget_id;
    if (budgetId !== null) {
      client
        .get("/budget/" + JSON.stringify(budgetId), header)
        .then((response) => {
          const budget = response.data.message.data[0];
          const from = budget.start_date.substring(0, 10);
          const to = budget.end_date.substring(0, 10);
          transactionDate = JSON.stringify(transactionDate).substring(1, 11);
          const oldBalance = budget.balance;
          var newBalance;

          if (transactionDate >= from && transactionDate <= to) {
            if (isPostExpenseOrDeleteIncome(request, action)) {
              newBalance = handlePostExpenseAndDeleteIncome(
                oldBalance,
                transactionAmount
              );
            } else if (isPostIncomeOrDeleteExpense(request, action)) {
              newBalance = handlePostIncomeANdDeleteExpense(
                oldBalance,
                transactionAmount
              );
            }
            updateBalance(
              newBalance,
              "/budget/",
              budgetId,
              setBudgetBalance,
              header,
              dispatch
            );
          }
        })
        .catch((ree) => {
          console.log("lathos get budget by id", ree);
        });
    }
  });
};

const updateWallet = async (
  walletId,
  request,
  dispatch,
  action,
  header,
  transactionAmount,
  transactionId
) => {
  var newBalance;

  await client
    .get("/wallet/" + walletId)
    .then((walletRecord) => {
      const oldBalance = walletRecord.data.message.data[0].balance;

      walletId = walletRecord.data.message.data[0].wallet_id;
      if (isPostExpenseOrDeleteIncome(request, action)) {
        newBalance = handlePostExpenseAndDeleteIncome(
          oldBalance,
          transactionAmount
        );
      } else if (isPostIncomeOrDeleteExpense(request, action)) {
        newBalance = handlePostIncomeANdDeleteExpense(
          oldBalance,
          transactionAmount
        );
      }
      if (newBalance < 0) {
        Alert.alert(
          "Not enough funds 🙄",
          "Oops! Seems like you don't have enough funds in this wallet to complete your transaction. Try a different wallet, or manually update your wallet",
          [{ text: "Ok!" }]
        );
        client
          .delete("/transaction/" + JSON.stringify(transactionId), header)
          .then(() => {
            APIRequestGetTransactionsByDateRange(header, dispatch);
          });
      } else {
        updateBalance(
          newBalance,
          "/wallet/",
          walletId,
          setWalletBalance,
          header,
          dispatch
        );
      }
    })
    .catch((err) => {
      console.log("error get wallet, ", err, err.message);
    });
};

export const updateBalance = async (
  balance,
  route,
  id,
  reduxSetter,
  header,
  dispatch
) => {
  client
    .patch(route + JSON.stringify(id), { balance: balance })
    .then(() => {
      dispatch(reduxSetter(balance));
      APIRequestGetBudgets(header, dispatch);
    })
    .catch((err) => {
      console.log("error update balance, ", err, err.message);
    });
};
