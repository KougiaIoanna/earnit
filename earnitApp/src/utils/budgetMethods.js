import React from "react";
import {
  setBudgetBalance,
  setBudgetAmount,
  setBudgetName,
  setBudgetNote,
  setCategories2Budgets,
  setEndDate,
  setStartDate,
} from "../redux/actions";
import { fullDateForDatabase } from "./timeMethods";
import moment from "moment";
import { fullDate } from "./timeMethods";
import { Alert } from "react-native";

export const setStatesNull = (dispatch) => {
  dispatch(setBudgetBalance(null));
  dispatch(setBudgetName(null));
  dispatch(setBudgetNote(null));
  dispatch(setEndDate(null));
  dispatch(setBudgetAmount(null));
};

export const findBudgetId = (id, spendingList) => {
  let budgetId = null;
  for (let i = 0; i < spendingList.length; i++) {
    if (spendingList[i].category_id === id) {
      budgetId = spendingList[i].budget_id;
    }
  }

  return budgetId;
};

export const makeCategories2BudgetsList = (spendingList, dispatch) => {
  let c2b = [];
  for (let i = 0; i < spendingList.length; i++) {
    c2b[i] = {
      budgetId: spendingList[i].budget_id,
      categoryName: spendingList[i].category_name,
    };
  }
  dispatch(setCategories2Budgets(c2b));
};

export const setStartDateIfNull = (startDate, dispatch) => {
  if (startDate === null || startDate === "" || startDate === undefined) {
    dispatch(setStartDate(fullDateForDatabase(new Date())));
  }
};

export const makeListOfBudgetCategories = (item, categories2Budgets) => {
  let categoriesNames = [];
  let j = 0;
  for (let i = 0; i < categories2Budgets.length; i++) {
    if (categories2Budgets[i].budgetId === item.budget_id) {
      categoriesNames[j] = categories2Budgets[i].categoryName;
      j++;
    }
  }
  return categoriesNames;
};

export const findPeriodUntil = (date) => {
  //na to allaksw na to kanw hmerologiaka!!!!

  if (moment(date).add(3, "hours").diff(moment(), "seconds") <= 0) {
    return moment(date).format("DD/MM/YY");
  } else if (
    moment(date)
      .add(3, "hour")
      .diff(moment().endOf("week").add(1, "day"), "days") <= 7
  ) {
    return "This week";
  } else if (
    moment(date)
      .add(3, "hour")
      .diff(moment().endOf("week").add(1, "day"), "days") <= 14
  ) {
    return "Next week";
  } else if (
    moment(date)
      .add(3, "hour")
      .diff(moment().endOf("week").add(1, "day"), "days") <= 31
  ) {
    return "This month";
  } else if (
    moment(date)
      .add(3, "hour")
      .diff(moment().endOf("week").add(1, "day"), "days") <= 60
  ) {
    return "Next month";
  } else if (
    moment(date)
      .add(3, "hour")
      .diff(moment().endOf("week").add(1, "day"), "days") > 60
  ) {
    return "This year";
  }
};

export const getDaysOfBudget = (startDate, endDate) => {
  let dateOne = new Date(startDate);
  let dateTwo = new Date(endDate);
  let daysOfBudget = [];
  for (var i = dateOne; i <= dateTwo; i.setDate(i.getDate() + 1)) {
    let a = fullDate(i);
    a = a.substring(0, 6) + a.substring(8, 10);
    daysOfBudget = [...daysOfBudget, a];
  }
  return daysOfBudget;
};

export const findCategoriesIdsOfBudget = (categoriesNames, spendingList) => {
  let ids = [];
  categoriesNames.forEach((budgetCategory) => {
    spendingList.forEach((category) => {
      if (budgetCategory === category.category_name) {
        ids = [...ids, category.category_id];
      }
    });
  });
  return ids;
};

export const findXAxisData = (daysOfBudget) => {
  let dates = [];
  let length = daysOfBudget.length;
  let diastima = Math.floor(length / 3);
  if (length <= 4) {
    dates = [...daysOfBudget];
  } else if (length === 5) {
    dates = [...dates, { date: daysOfBudget[0], position: 0 }];
    dates = [...dates, { date: daysOfBudget[1], position: 1 }];
    dates = [...dates, { date: daysOfBudget[2], position: 2 }];
    dates = [...dates, { date: daysOfBudget[5], position: 5 }];
  } else if (length === 6) {
    dates = [...dates, { date: daysOfBudget[0], position: 0 }];
    dates = [...dates, { date: daysOfBudget[1], position: 1 }];
    dates = [...dates, { date: daysOfBudget[3], position: 3 }];
    dates = [...dates, { date: daysOfBudget[5], position: 5 }];
  } else {
    if (length % 3 === 0) {
      dates = [...dates, { date: daysOfBudget[0], position: 0 }];
      dates = [
        ...dates,
        { date: daysOfBudget[diastima - 1], position: diastima - 1 },
      ];
      dates = [
        ...dates,
        { date: daysOfBudget[2 * diastima - 1], position: 2 * diastima - 1 },
      ];
      dates = [
        ...dates,
        { date: daysOfBudget[length - 1], position: length - 1 },
      ];
    } else if (length % 3 < 5) {
      //.3333
      dates = [...dates, { date: daysOfBudget[0], position: 0 }];
      dates = [...dates, { date: daysOfBudget[diastima], position: diastima }];
      dates = [
        ...dates,
        { date: daysOfBudget[2 * diastima], position: 2 * diastima },
      ];
      dates = [
        ...dates,
        { date: daysOfBudget[length - 1], position: length - 1 },
      ];
    } else {
      //.666

      dates = [...dates, { date: daysOfBudget[0], position: 0 }];
      dates = [...dates, { date: daysOfBudget[diastima], position: diastima }];
      dates = [
        ...dates,
        { date: daysOfBudget[2 * diastima + 1], position: 2 * diastima + 1 },
      ];
      dates = [
        ...dates,
        { date: daysOfBudget[length - 1], position: length - 1 },
      ];
    }
  }
  return dates;
};

export const deconstructAndKeepDates = (datesAndPositions) => {
  let dates = [];
  datesAndPositions.forEach((element) => {
    dates.push(element.date);
  });
  return dates;
};

export const deconstructAndKeepPositions = (datesAndPositions) => {
  let positions = [];
  datesAndPositions.forEach((element) => {
    positions.push(element.position);
  });
  return positions;
};

export const positionOfToday = (daysOfBudget) => {
  var pos;
  const today =
    fullDate(new Date()).substring(0, 6) +
    fullDate(new Date()).substring(8, 10);

  for (let day = 0; day < daysOfBudget.length; day++) {
    if (daysOfBudget[day] === today) {
      pos = day;
    }
  }
  return pos;
};

export const makeDailySumsForChart = (daysOfBudget, dailyTransactions) => {
  let sums = [];
  let dt = 0;

  for (let day = 0; day < daysOfBudget.length; day++) {
    if (dailyTransactions !== []) {
      if (dt < dailyTransactions.length) {
        let d = fullDate(dailyTransactions[dt].transaction_date);
        d = d.substring(0, 6) + d.substring(8, 10);
        if (daysOfBudget[day] === d) {
          //this day had expenses
          sums.push(dailyTransactions[dt].SumAmount);
          dt++;
        } else {
          sums.push(0);
        }
      } else {
        sums.push(0);
      }
    }
  }
  return sums;
};

export const isExpiredBudget = (period) => {
  if (moment(period).fromNow().includes("ago")) {
    return true;
  }
  return false;
};

export const onPressQuestionmark = () => {
  Alert.alert(
    "Budget Spending Categories",
    "You can choose one or more spending categories for your budget, in order to better accomodate your needs 🤩",
    [{ text: "Got it!" }]
  );
};
