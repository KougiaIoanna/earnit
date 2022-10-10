import React from "react";
import { flushSync } from "react-dom";
import { Alert } from "react-native";
import client from "./client";
import {
  setSpendingList,
  setIncomeList,
  setCategoryId,
} from "../redux/actions";
import { APIRequestUpdateCategoriesWithBudget } from "./budgets";

export const APIRequestGetSpendingCategories = async (header, dispatch) => {
  const res1 = await client.get("/category/spending", header);
  flushSync(dispatch(setSpendingList(res1.data.message.data)));
};
export const APIRequestGetIncomeCategories = async (header, dispatch) => {
  const res1 = await client.get("/category/income", header);
  flushSync(dispatch(setIncomeList(res1.data.message.data)));
};


export const APIRequestCreateCategory = async (
  newGategory,
  header,
  dispatch
) => {
  await client.post("/category", newGategory, header).then(() => {
    APIRequestGetIncomeCategories(header, dispatch);
    APIRequestGetSpendingCategories(header, dispatch);
  });
};
export const APIRequestDeleteCategory = async (categoryId, navigation) => {
  const res = await client.get("/category/" + JSON.stringify(categoryId));
  const res2 = await client.get(
    "/transaction-category/" + JSON.stringify(categoryId)
  );
  if (
    res.data.message.data[0].budget_id === null &&
    res2.data.message.data.length === 0
  ) {
    Alert.alert(
      "⚠️ Delete Category",
      "Are you sure you want to delete this Category?",
      [
        {
          text: "Cancel",
        },
        {
          text: "Delete",
          onPress: () => {
            client.delete("/category/" + JSON.stringify(categoryId));
            navigation.navigate("CategoriesNavigator");
          },
        },
      ]
    );
  } else {
    Alert.alert(
      "❌ Delete Category",
      "This category is already used in transactions or in budgets, are you sure you want to delete it?",
      [
        {
          text: "Cancel",
        },
        {
          text: "Delete",
          onPress: () => {
            client.patch("/category/hide/" + JSON.stringify(categoryId));
            navigation.navigate("CategoriesNavigator");
          },
        },
      ]
    );
  }
};
export const APIRequestUpdateCategory = async (
  categoryId,
  categoryName,
  icon
) => {
  await client.put("/category/" + JSON.stringify(categoryId), {
    categoryName: categoryName,
    icon: icon,
  });
};

export const APIRequestDeleteCategoriesFromBudget = async (
  categoriesNames,
  header,
  dispatch
) => {
  categoriesNames.forEach((category) => {
    client.get("/category/from/" + category, header).then((res) => {
      APIRequestUpdateCategoriesWithBudget(
        [res.data.message.data[0].category_id],
        header,
        dispatch,
        true
      );
    });
  });
};
