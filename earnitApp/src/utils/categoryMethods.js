import React from "react";
import {
  setCategoryIcon,
  setCategoryName,
  setCategoryType,
} from "../redux/actions";

export const setStatesNull = (dispatch) => {
  dispatch(setCategoryIcon(null));
  dispatch(setCategoryName(null));
  dispatch(setCategoryType(null));
};

export const makeCategoriesForDropdown = (input) => {
  let output = [];
  let outputIter = 0;
  for (let i = 0; i < input.length; i++) {
    if (input[i].hide === null) {
      output[outputIter] = {
        label: input[i].category_name,
        value: input[i].category_id.toString(),
      };
      outputIter++;
    }
  }
  return output;
};

export const findCategory = (id, spendingList, incomeList) => {
  let category;
  for (let i = 0; i < spendingList.length; i++) {
    if (spendingList[i].category_id === id) {
      category = spendingList[i].category_name;
    }
  }
  for (let i = 0; i < incomeList.length; i++) {
    if (incomeList[i].category_id === id) {
      category = incomeList[i].category_name;
    }
  }
  return category;
};

export const findCategoryIcon = (id, spendingList, incomeList) => {
  let icon;
  for (let i = 0; i < spendingList.length; i++) {
    if (spendingList[i].category_id === id) {
      icon = spendingList[i].category_icon;
    }
  }
  for (let i = 0; i < incomeList.length; i++) {
    if (incomeList[i].category_id === id) {
      icon = incomeList[i].category_icon;
    }
  }
  return icon;
};

export const findActionFromCategoryType = (categoryType) => {
  let action;
  if (categoryType === "Spending") {
    action = "Expense";
  } else {
    action = "Income";
  }
  return action;
};

export const findCategoryType = (id, incomeList, spendingList) => {
  let categoryType;
  for (let i = 0; i < incomeList.length; i++) {
    if (incomeList[i].category_id === id) {
      categoryType = "Income";
    }
  }
  for (let i = 0; i < spendingList.length; i++) {
    if (spendingList[i].category_id === id) {
      categoryType = "Spending";
    }
  }
  return categoryType;
};

export const makeListOfCategoriesForBudgetForm = (spendingList) => {
  var listOfCategories = [];
  let outputIter = 0;

  for (let i = 0; i < spendingList.length; i++) {
    if (spendingList[i].budget_id === null && spendingList[i].hide === null) {
      listOfCategories[outputIter] = {
        label: spendingList[i].category_name,
        value: spendingList[i].category_id.toString(),
      };
      outputIter++;
    }
  }
  return listOfCategories;
};
export const findSum = (list, transactionsSumsByCategory) => {
  //income sum or spending sum
  let topiko = 0;
  list.forEach((category) => {
    transactionsSumsByCategory.forEach((item) => {
      if (category.category_id === item.category) {
        topiko = topiko + item.sum;
      }
    });
  });
  return topiko;
};

export const makeListOfCategoriesCurrentAndPreviousAmounts = (
  currentList,
  previousList
) => {
  var list = [];
  // let j = 0;
  for (let i = 0; i < currentList.length; i++) {
    previousList.forEach((prev) => {
      if (currentList[i].category === prev.category) {
        list[i] = {
          category: prev.category,
          sum: currentList[i].sum,
          prevSum: prev.sum,
        };
      }
    });
    if (list[i] === undefined) {
      list[i] = {
        category: currentList[i].category,
        sum: currentList[i].sum,
        prevSum: "",
      };
    }
  }

  return list;
};
