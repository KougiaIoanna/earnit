import React from "react";
import { flushSync } from "react-dom";
import { Alert } from "react-native";
import client from "./client";
import {
  setGoalMonthlySum,
  setGoalReached,
  setGoalsList,
  setSavedAmount,
} from "../redux/actions";

export const APIRequestGetGoals = async (header, dispatch) => {
  await client.get("/goal", header).then((res) => {
    flushSync(dispatch(setGoalsList(res.data.message.data)));
  });
};

export const APIRequestGetMonthlySum = async (
  goalId,
  monthPeriod,
  dispatch
) => {
  await client
    .post("/goal-assignment/monthly-sum/" + JSON.stringify(goalId), monthPeriod)
    .then((monthlySum) => {
      monthlySum = monthlySum.data.message.data[0].sum;
      if (monthlySum === undefined) {
        monthlySum = 0;
      }
      flushSync(dispatch(setGoalMonthlySum(monthlySum)));
    })
    .catch((err) => {
      console.log("err", err);
    });
};
export const APIRequestCreateGoal = async (header, newGoal, dispatch) => {
  client.post("/goal", newGoal, header).then((res) => {});
};

export const APIRequestDeleteGoal = (goalId, props, header, dispatch) => {
  Alert.alert("❌ Delete Goal", "Are you sure you want to delete this Goal?", [
    {
      text: "Cancel",
    },
    {
      text: "Delete",
      onPress: () => {
        client.delete("/goal/" + JSON.stringify(goalId)).then(() => {
          APIRequestGetGoals(header, dispatch);
          props.navigation.navigate("EnvelopeNavigator");
        });
      },
    },
  ]);
};

export const APIRequestGetGoalSavedAmount = (goalId, dispatch) => {
  client.get("/goal/" + JSON.stringify(goalId)).then((res) => {
    dispatch(setSavedAmount(res.data.message.data[0].saved_amount));
  });
};
export const APIRequestSetGoalReached = (goalId, dispatch) => {
  client.patch("/goal/reached/" + JSON.stringify(goalId)).then((res) => {
    dispatch(setGoalReached(true));
  });
};

export const APIRequestAddSavedAmount = (goalId, amount, savedAmount) => {
  client
    .post("/goal-assignment/" + JSON.stringify(goalId), { amount: amount })
    .then(() => {
      client
        .patch("/goal/" + JSON.stringify(goalId), {
          amount: parseInt(savedAmount) + parseInt(amount),
        })
        .then(() => {});
    })
    .catch((err) => {
      console.log("error with goal assignment", err);
    });
};
export const APIRequestEditGoal = async (newGoal, header, dispatch) => {
  await client
    .put("/goal/" + JSON.stringify(newGoal.goalId), newGoal, header)
    .catch((error) => {});
  await client.get("/goal", header).then((res) => {
    dispatch(setGoalsList(res.data.message.data));
  });
};
