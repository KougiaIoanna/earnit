import React from "react";
import { Alert } from "react-native";
import {
  setWalletBalance,
  setBudgetBalance,
  setTransactionAmount,
  setTransactionDate,
  setTransactionNote,
  setTransactionDueToday,
} from "../redux/actions";
import moment from "moment";
import client from "../services/client";

export const setStatesNull = (dispatch) => {
  dispatch(setTransactionAmount(null));
  dispatch(setTransactionDate(null));
  dispatch(setTransactionNote(null));
};
export const didDateChange = (date, itemDate) => {
  if (date !== itemDate) {
    return true;
  }
  return false;
};

export const isRecurringTransaction = (item) => {
  if (item.interval_period !== null) {
    return true;
  }
  return false;
};

export const didIntervalChange = (interval, itemInterval) => {
  if (interval !== JSON.stringify(itemInterval)) {
    return true;
  }
  return false;
};

export const findIntervalSTR = (interval) => {
  let intervalSTR;
  let num = interval.substring(0, 1);
  let time = interval.substring(1, 2);
  if (time === "D") {
    if (num === "1") {
      intervalSTR = "Every day";
    } else {
      intervalSTR = "Every " + num + " days";
    }
  } else if (time === "W") {
    if (num === "1") {
      intervalSTR = "Every week";
    } else {
      intervalSTR = "Every " + num + " weeks";
    }
  } else if (time === "M") {
    if (num === "1") {
      intervalSTR = "Every month";
    } else {
      intervalSTR = "Every " + num + " months";
    }
  }
  return intervalSTR;
};

export const findNextOccurrence = (interval, transactionDate) => {
  //var transactionDate = moment().format("YYYY-MM-DD HH:mm:ss");
  //interval
  if (interval != null) {
    let number = interval.substring(0, 1);
    let str = interval.substring(1, 2);
    if (str === "D") {
      return moment(transactionDate, "YYYY-MM-DD hh:mm a")
        .add(number, "days")
        .startOf("day")
        .add(8, "hours")
        .format("YYYY-MM-DD HH:MM:SS");
    } else if (str === "M") {
      return moment(transactionDate, "YYYY-MM-DD hh:mm a")
        .add(number, "months")
        .startOf("day")
        .add(8, "hours")
        .format("YYYY-MM-DD HH:MM:SS");
    } else if (str === "W") {
      return moment(transactionDate, "YYYY-MM-DD hh:mm a")
        .add(number * 7, "days")
        .startOf("day")
        .add(8, "hours")
        .format("YYYY-MM-DD HH:MM:SS");
    }
  }
};
export const makeTitleForRecurringTransactions = (nextOccurence) => {
  var title;
  if (
    moment(nextOccurence).add(3, "hour").diff(moment(), "hours") <= 24 &&
    moment(nextOccurence).add(3, "hour").diff(moment(), "hours") >= 0
  ) {
    title = "Due tommorow";
  } else if (
    moment(nextOccurence).add(3, "hour").diff(moment(), "hours") < 0 &&
    moment(nextOccurence).add(3, "hour").diff(moment(), "hours") > -24
  ) {
    title = "Due today";
  } else if (
    moment(nextOccurence).add(3, "hour").diff(moment(), "hours") > 24 &&
    moment(nextOccurence).add(3, "hour").diff(moment(), "days") <= 7
  ) {
    title =
      "Due " +
      moment(nextOccurence)
        .add(3, "hours")
        .format("MMMM Do YYYY"); //.calendar().split("at")[0];
  } else {
    title =
      "Due " +
      moment(nextOccurence)
        .add(3, "hours")
        .format("MMMM Do YYYY"); //.fromNow();
  }
  return title;
};

export const makeSmallTitleForTransactions = (date) => {
  var title;
  if (
    moment(date).diff(moment(), "hours") <= 0 &&
    moment(date).diff(moment(), "hours") >= -24
  ) {
    title = "Today";
  } else if (
    moment(date).diff(moment(), "hours") > -48 &&
    moment(date).diff(moment(), "hours") < -24
  ) {
    title = "Yesterday";
  } else {
    title = moment(date).format("MMM DD");
  }
  return title;
};

export const makeSmallTitleForRecurringTransactions = (nextOccurence) => {
  var title;
  if (
    moment(nextOccurence).diff(moment(), "hours") <= 24 &&
    moment(nextOccurence).diff(moment(), "hours") >= 0
  ) {
    title = "Tommorow";
  } else if (
    moment(nextOccurence).diff(moment(), "hours") < 0 &&
    moment(nextOccurence).diff(moment(), "hours") > -24
  ) {
    title = "Today";
  } else {
    title = moment(nextOccurence).format("MMM DD");
  }
  return title;
};

export const isCustomPeriod = (from, to) => {
  from = moment(from).format("YYYY-MM-DD");
  if (
    from === moment().startOf("week").add(1, "days").format("YYYY-MM-DD") &&
    to === moment().format("YYYY-MM-DD")
  ) {
    return false;
  }
  if (
    from === moment().startOf("month").format("YYYY-MM-DD") &&
    to === moment().format("YYYY-MM-DD")
  ) {
    return false;
  }
  if (
    from === moment().startOf("year").format("YYYY-MM-DD") &&
    to === moment().format("YYYY-MM-DD")
  ) {
    return false;
  }
  return true;
};

export const recurringTransactionsToday = (list, dispatch) => {
  list.forEach((transaction) => {
    if (
      moment(transaction.next_occurrence).format("DD-MM-YY") ===
      moment().format("DD-MM-YY")
    ) {
      dispatch(setTransactionDueToday(true));
    }
  });
};

export const isPostExpenseOrDeleteIncome = (request, action) => {
  if (
    (request === "post" && action === "Expense") ||
    (request === "delete" && action === "Income")
  ) {
    return true;
  }
  return false;
};

export const isPostIncomeOrDeleteExpense = (request, action) => {
  if (
    (request === "post" && action === "Income") ||
    (request === "delete" && action === "Expense")
  ) {
    return true;
  }
  return false;
};

export const handlePostExpenseAndDeleteIncome = (
  oldBalance,
  transactionAmount
) => {
  balance = parseFloat(oldBalance) - parseFloat(transactionAmount);
  return balance;
};

export const handlePostIncomeANdDeleteExpense = (
  oldBalance,
  transactionAmount
) => {
  balance = parseFloat(oldBalance) + parseFloat(transactionAmount);
  return balance;
};

