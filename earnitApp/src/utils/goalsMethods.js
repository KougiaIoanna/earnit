import React from "react";
import {
  setGoalIcon,
  setGoalName,
  setGoalNote,
  setTargetAmount,
  setTargetDate,
} from "../redux/actions";
import {
  monthsUntilTheEndOfPeriod,
  monthsUntilTheEndOfYear,
} from "./timeMethods";

export const setStatesNull = (dispatch) => {
  dispatch(setGoalIcon(null));
  dispatch(setGoalName(null));
  dispatch(setGoalNote(null));
  dispatch(setTargetDate(null));
  dispatch(setTargetAmount(null));
};

export const findThirdBoxTitle = (targetAmount, targetDate) => {
  var thirdBoxTitle;
  if (targetAmount === null && targetDate === null) {
    thirdBoxTitle = "Estimated Savings at the end of the year";
  } else if (targetAmount === null && targetDate !== null) {
    thirdBoxTitle = "Estimated Savings at target date";
  } else if (targetAmount !== null && targetDate === null) {
    thirdBoxTitle = "Estimated time to reach goal";
  } else if (targetAmount !== null && targetDate !== null) {
    thirdBoxTitle = "Minimum monthly amount to reach goal";
  }
  return thirdBoxTitle;
};

export const findThirdBoxValue = (
  targetAmount,
  savedAmount,
  targetDate,
  monthlySum
) => {
  var thirdBoxValue;
  if (targetAmount === null && targetDate === null) {
    if (monthlySum === 0 || monthlySum === undefined || monthlySum === null) {
      thirdBoxValue = savedAmount;
    } else {
      thirdBoxValue = savedAmount + monthlySum * monthsUntilTheEndOfYear;
    }
  } else if (targetAmount === null && targetDate !== null) {
    if (monthlySum === 0 || monthlySum === undefined || monthlySum === null) {
      thirdBoxValue = savedAmount;
    } else {
      thirdBoxValue =
        savedAmount + monthsUntilTheEndOfPeriod(targetDate) * monthlySum;
    }
  } else if (targetAmount !== null && targetDate === null) {
    if (monthlySum === 0 || monthlySum === undefined || monthlySum === null) {
      thirdBoxValue = targetAmount / savedAmount;
    } else {
      thirdBoxValue = (targetAmount - savedAmount) / monthlySum;
    }
  } else if (targetAmount !== null && targetDate !== null) {
    thirdBoxValue = Math.floor(
      (targetAmount - savedAmount) / monthsUntilTheEndOfPeriod(targetDate)
    );
  }
  return thirdBoxValue;
};
