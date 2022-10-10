import { FontAwesome } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { APIRequestGetDailySumAmounts } from "../../../services/budgets";
import {
  deconstructAndKeepDates,
  deconstructAndKeepPositions,
  findCategoriesIdsOfBudget,
  findXAxisData,
  getDaysOfBudget,
  makeDailySumsForChart,
  positionOfToday,
} from "../../../utils/budgetMethods";
import { darkerGreen } from "../../atoms/Colors";
import BudgetBarChart from "../BudgetBarChart";

const BudgetListItemForCard = ({ item, navigation, categoriesNames }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [dailyTransactions, setDailyTransactions] = useState([]);

  const { spendingList } = useSelector((state) => state.categoryReducer);
  const { token } = useSelector((state) => state.userReducer);

  let header = {
    headers: { Authorization: token },
  };
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
      setIsLoading(false);
    };
    fetchData();
    return () => {
      active = false;
    };
  }, []);

  const onPressBudget = async () => {
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
      {isLoading ? (
        <ActivityIndicator size="large" color={darkerGreen} />
      ) : (
        <TouchableOpacity
          onPress={() => {
            onPressBudget();
          }}
        >
          <View style={{ marginVertical: 5 }}>
            <BudgetBarChart
              budgetName={item.budget_name}
              balance={item.balance}
              budgetAmount={item.budget_amount}
              categoriesNames={categoriesNames}
              dontShowCategories
            />
          </View>
        </TouchableOpacity>
      )}
    </>
  );
};

export default BudgetListItemForCard;
