import React from "react";

export const foundTransactionWithThisCategory = (category, transaction) => {
  if (category.category_id === transaction.category_id) {
    return true;
  }
  return false;
};

export const categoryAlreadyInChart = (categoriesInChart, category) => {
  if (categoriesInChart.includes(category.category_id)) {
    return true;
  }
  return false;
};

export const isFirstRenderAfterOpeningTheApp = (
  topikodatalist,
  statedatalist
) => {
  if (topikodatalist.length > statedatalist.length) {
    return true;
  }

  return false;
};

export const computeSum = (topiko) => {
  let sum = 0;
  for (let i = 0; i < topiko.length; i++) {
    sum = sum + topiko[i].amount;
  }
  return sum;
};
