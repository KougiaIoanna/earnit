import React from "react";
import { Store } from "../redux/store";
import client from "./client";
import {
  setSpendingList,
  setBudgetId,
  setBudgetsList,
  setTransactionsList,
  setTransactionsListForBudget,
  setBudgetName,
  setDailyTransactions,
} from "../redux/actions";
import {
  makeCategories2BudgetsList,
  setStartDateIfNull,
} from "../utils/budgetMethods";
import { flushSync } from "react-dom";
import { Alert } from "react-native";

export const APIRequestUpdateCategoriesWithBudget = async (
  selected,
  header,
  dispatch,
  setNull
) => {
  let budgetId =
    setNull === true ? null : Store.getState().budgetReducer.budgetId; //anagkastika etsi gt alliws me ton selector diabazei to prohgoymeno
  for (let i = 0; i < selected.length; i++) {
    let categoryId = selected[i];
    categoryId = parseInt(categoryId);
    await client
      .patch("/category/budget", {
        categoryId,
        budgetId,
      })
      .then((patchRes) => {
        client
          .get("/category/spending", header)
          .then((newSpendingCategories) => {
            dispatch(setSpendingList(newSpendingCategories.data.message.data));
            makeCategories2BudgetsList(
              Store.getState().categoryReducer.spendingList,
              dispatch
            );
          });
      });
  }
};

export const APIRequestGetBudgetById = async (budgetId, dispatch) => {
  await client.get("/budget/" + JSON.stringify(budgetId)).then((res) => {
    dispatch(setBudgetName(res.data.message.data[0].budget_name));
  });
};

export const APIRequestCreateBudget = async (
  newBudget,
  header,
  selected,
  dispatch
) => {
  await client
    .post("/budget", newBudget, header)
    .then((res) => {
      let thisBudgetId = res.data.message.data.insertId;
      flushSync(dispatch(setBudgetId(thisBudgetId)));
      APIRequestUpdateCategoriesWithBudget(selected, header, dispatch);

      client
        .get("/budget", header)
        .then((budgets) => {
          dispatch(setBudgetsList(budgets.data.message.data));
        })
        .catch((error) => {
          console.log("get error", error);
        });
    })
    .catch((error) => {
      console.log("post error", error.response);
    });
};

export const APIRequestEditBudget = async (newBudget, header, dispatch) => {
  await client
    .put("/budget/" + JSON.stringify(newBudget.budgetId), newBudget)
    .catch((error) => {
      error;
    });
  await client.get("/budget", header).then((res) => {
    dispatch(setBudgetsList(res.data.message.data));
  });
};

export const APIRequestGetBudgets = async (header, dispatch) => {
  const res = await client.get("/budget", header);
  dispatch(setBudgetsList(res.data.message.data));
};

export const APIRequestGetDailySumAmounts = async (
  categoriesIds,
  header,
  setDailyTransactions,
  item
) => {
  if (categoriesIds !== []) {
    await client
      .post(
        "/transaction-dailysum",
        {
          categoriesIds: categoriesIds,
          startDate: item.start_date,
          endDate: item.end_date,
        },
        header
      )
      .then((response) => {
        flushSync(setDailyTransactions(response.data.message.data));
      })
      .catch((err) => {
        console.log("---------------------err api get daily sum amounts", err);
      });
  }
};

export const APIRequestGetTransactionsOfThisBudget = async (
  categoriesIds,
  startDate,
  period,
  header,
  dispatch
) => {
  var locallist = [];
  client
    .post(
      "/transaction-budget",
      {
        categoriesIds: categoriesIds,
        startDate: startDate,
        endDate: period,
      },
      header
    )
    .then((response) => {
      dispatch(setTransactionsListForBudget(response.data.message.data));
    })
    .catch((err) => {
      console.log("err", err);
    });
};

export const APIRequestDeleteBudget = (budgetId, props, header, dispatch) => {
  Alert.alert(
    "❌ Delete Budget",
    "Are you sure you want to delete this Budget?",
    [
      {
        text: "Cancel",
      },
      {
        text: "Delete",
        onPress: async () => {
          await client
            .delete("/budget/" + JSON.stringify(budgetId))
            .then(async () => {
              await APIRequestGetBudgets(header, dispatch);
              // APIRequestGetSpendingCategories(header, dispatch);
              props.navigation.navigate("EnvelopeNavigator");
            });
        },
      },
    ]
  );
};
