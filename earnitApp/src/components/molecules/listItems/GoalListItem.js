import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { mostLightGreenEver, dark, veryLightPurple } from "../../atoms/Colors";
import { useDispatch, useSelector } from "react-redux";
import { GoalProgressBar } from "../../atoms";
import moment from "moment";
import { monthPeriod } from "../../../utils/timeMethods";
import { APIRequestGetMonthlySum } from "../../../services/goals";
import {
  findThirdBoxTitle,
  findThirdBoxValue,
} from "../../../utils/goalsMethods";
import {
  setGoalIcon,
  setGoalName,
  setGoalNote,
  setTargetDate,
  setSavedAmount,
  setTargetAmount,
} from "../../../redux/actions";
import { Store } from "../../../redux/store";

const GoalListItem = ({ item, navigation }) => {
  const { token } = useSelector((state) => state.userReducer);
  const { goalName } = useSelector((state) => state.goalReducer);
  let goalMonthlySum = Store.getState().goalReducer.goalMonthlySum;

  let header = {
    headers: { Authorization: token },
  };
  const progress = item.saved_amount / item.target_amount;

  const dispatch = useDispatch();

  const onPressItem = async () => {
    await APIRequestGetMonthlySum(item.goal_id, monthPeriod, dispatch);
    await dispatch(setGoalName(item.goal_name));
    await dispatch(setTargetAmount(item.target_amount));
    await dispatch(setSavedAmount(item.saved_amount));
    await dispatch(setTargetDate(item.target_date));
    await dispatch(setGoalIcon(item.icon));
    await dispatch(setGoalNote(item.goal_note));
    let goalMonthlySum = Store.getState().goalReducer.goalMonthlySum;
    let sum = goalMonthlySum;
    navigation.navigate("GoalDetailsScreen", {
      item: item,
      monthlySum: sum,
      thirdBoxTitle: findThirdBoxTitle(item.target_amount, item.target_date),
      thirdBoxValue: findThirdBoxValue(
        item.target_amount,
        item.saved_amount,
        item.target_date,
        sum
      ),
    });
  };

  return (
    <>
      <View style={styles.outerBox}>
        <View style={styles.iconContainer}>
          <Image source={item.icon} style={styles.categoryIcon} />
        </View>
        <View style={styles.textBox}>
          <TouchableOpacity
            onPress={() => {
              if (item.reached === null) onPressItem();
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Text style={styles.name}>{item.goal_name}</Text>
              {item.target_date !== null && (
                <Text style={styles.amount}>
                  Target date: {moment(item.target_date).format("DD/MM/YY")}
                </Text>
              )}
              {item.target_amount === null ? (
                <GoalProgressBar saved={item.saved_amount} progress={1} />
              ) : (
                <GoalProgressBar
                  progress={progress}
                  saved={item.saved_amount}
                  target={item.target_amount}
                />
              )}
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};
export default GoalListItem;

const styles = StyleSheet.create({
  outerBox: {
    backgroundColor: mostLightGreenEver,
    margin: 10,
    borderRadius: 5,
    padding: 10,
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  textBox: { flex: 1 },
  categoryIcon: {
    width: 40,
    height: 40,
  },
  iconContainer: {
    backgroundColor: veryLightPurple,
    alignSelf: "center",
    margin: 7,
    marginHorizontal: 4,
    padding: 6,
    borderRadius: 25,
  },
  icon: { alignSelf: "center", marginRight: 5 },
  name: {
    color: dark,
    fontWeight: "bold",
    fontSize: 18,
  },
  amount: {
    color: dark,
    fontSize: 12,
  },
});
