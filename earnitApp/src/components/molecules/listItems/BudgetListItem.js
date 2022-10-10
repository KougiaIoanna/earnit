import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { darkGreen, mostLightGreenEver, dark } from "../../atoms/Colors";
import { useDispatch, useSelector } from "react-redux";
import { flushSync } from "react-dom";
import { useIsFocused } from "@react-navigation/native";
import {
  deconstructAndKeepDates,
  deconstructAndKeepPositions,
  findCategoriesIdsOfBudget,
  getDaysOfBudget,
  makeDailySumsForChart,
  positionOfToday,
  findXAxisData,
} from "../../../utils/budgetMethods";
import { APIRequestGetDailySumAmounts } from "../../../services/budgets";
import BudgetBarChart from "../BudgetBarChart";

const BudgetListItem = ({
  item,
  navigation,
  categoriesNames,
  periodChanged,
  period,
}) => {
  const { token } = useSelector((state) => state.userReducer);
  const { spendingList } = useSelector((state) => state.categoryReducer);

  const [isLoading, setIsLoading] = useState(false);
  const [dailyTransactions, setDailyTransactions] = useState([]);

  let header = {
    headers: { Authorization: token },
  };
  const entity = "Budget";

  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  useEffect(() => {
    let active = true;
    const fetchData = async () => {
      setIsLoading(true);

      if (active) {
        if (isFocused) {
          var categoriesIds = findCategoriesIdsOfBudget(
            categoriesNames,
            spendingList
          );
          //fetchDailySumAmounts(categoriesIds);
          let daysOfBudget = getDaysOfBudget(item.start_date, item.end_date);
          if (categoriesNames.length > 0 && categoriesIds.length > 0) {
            APIRequestGetDailySumAmounts(
              categoriesIds,
              header,
              setDailyTransactions,
              item
            );
          }
          var dailySums = makeDailySumsForChart(
            daysOfBudget,
            dailyTransactions
          );
        }
      }
    };
    fetchData();
    return () => {
      active = false;
    };
  }, []);

  const onPress = async () => {
    setIsLoading(true);
    var categoriesIds = findCategoriesIdsOfBudget(
      categoriesNames,
      spendingList
    );
    await APIRequestGetDailySumAmounts(
      categoriesIds,
      header,
      setDailyTransactions,
      item
    );
    let daysOfBudget = getDaysOfBudget(item.start_date, item.end_date);
    var datesAndPositions = findXAxisData(daysOfBudget);
    setIsLoading(false);

    navigation.navigate("BudgetDetailsScreen", {
      id: item.budget_id,
      name: item.budget_name,
      budgetAmount: item.budget_amount,
      balance: item.balance,
      period: item.end_date,
      note: item.budget_note,
      startDate: item.start_date,
      categories: categoriesNames,
      XAxisDates: deconstructAndKeepDates(datesAndPositions),
      dailySums: makeDailySumsForChart(daysOfBudget, dailyTransactions),
      dotPositions: deconstructAndKeepPositions(datesAndPositions),
      daysOfBudget: daysOfBudget,
      todaysPosition: positionOfToday(daysOfBudget),
    });
  };
  return (
    <>
      {periodChanged === true ? (
        <View style={styles.separatingLines}>
          <Text>{period}</Text>
        </View>
      ) : null}
      <View style={styles.outerBox}>
        <TouchableOpacity
          style={styles.textBox}
          onPress={() => {
            onPress();
          }}
        >
          <BudgetBarChart
            budgetName={item.budget_name}
            balance={item.balance}
            budgetAmount={item.budget_amount}
            categoriesNames={categoriesNames}
          />
        </TouchableOpacity>
      </View>
    </>
  );
};
export default BudgetListItem;

const styles = StyleSheet.create({
  outerBox: {
    backgroundColor: mostLightGreenEver,
    margin: 10,
    borderRadius: 5,
    paddingTop: 10,
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  textBox: { flex: 1 },
  icon: {
    justifyContent: "flex-end",
    fontSize: 30,
    padding: 5,
    color: darkGreen,
  },
  name: {
    color: dark,
    fontWeight: "bold",
    fontSize: 15,
  },
  amount: {
    color: dark,
  },
  categories: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  separatingLines: {
    borderBottomColor: "#c8c8c8",
    borderBottomWidth: 1,
    marginHorizontal: 20,
  },
});
