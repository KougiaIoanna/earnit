import React from "react";
import moment from "moment";

export const startOfThisMonth = moment().startOf("month");
export const endOfThisMonth = moment().endOf("month");
export const monthPeriod = {
  start: startOfThisMonth.format("YYYY-MM-DD"),
  end: endOfThisMonth.format("YYYY-MM-DD"),
};
export const endOfYear = moment().endOf("year");
export const monthsUntilTheEndOfYear = endOfYear.diff(endOfThisMonth, "months");

export const monthsUntilTheEndOfPeriod = (targetDate) => {
  return moment(targetDate).diff(moment(), "months");
};

export const getListOfMonthsUntilLastMonth = () => {
  const from = moment("01072022", "DDMMYYYY");
  const numberOfMonths = moment().diff(from, "months");
  var to = moment().startOf("month");
  var arrayOfMonths = [];

  for (let i = 0; i < numberOfMonths; i++) {
    to = moment(to).subtract(1, "months");
    arrayOfMonths[i] = to;
  }

  return arrayOfMonths;
};

export const fullDate = (currentDate) => {
  let tempDate = new Date(currentDate);
  const month =
    (tempDate.getMonth() + 1).toString().length === 1
      ? `0${tempDate.getMonth() + 1}`
      : tempDate.getMonth() + 1;
  let fullDate = getDay(tempDate) + "/" + month + "/" + tempDate.getFullYear();
  return fullDate;
};
export const getMonth = (tempDate) => {
  const month =
    (tempDate.getMonth() + 1).toString().length === 1
      ? `0${tempDate.getMonth() + 1}`
      : tempDate.getMonth() + 1;
  return month;
};

const getDay = (tempDate) => {
  let day = tempDate.getDate();
  if (day < 10) {
    day = "0" + day;
  }
  return day;
};
export const fullDateForDatabase = (currentDate) => {
  let tempDate = new Date(currentDate);
  const month =
    (tempDate.getMonth() + 1).toString().length === 1
      ? `0${tempDate.getMonth() + 1}`
      : tempDate.getMonth() + 1;

  let fullDateForDatabase =
    tempDate.getFullYear() + "-" + month + "-" + getDay(tempDate);

  return fullDateForDatabase;
};

export const startOfCurrentMonth = () => {
  return moment().startOf("month").format("YYYY-MM-DD");
};

export const endOfCurrentDay = () => {
  return moment().endOf("day").add(1, "days").format("YYYY-MM-DD");
};
export const startOfCurrentDay = () => {
  return moment().startOf("day").format("YYYY-MM-DD");
};
