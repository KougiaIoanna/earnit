import React, { useEffect, useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  SafeAreaView,
  Alert,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { flushSync } from "react-dom";
import { Title } from "react-native-paper";
import { ScrollView } from "react-native-virtualized-view";
import { FontAwesome } from "@expo/vector-icons";

import {
  darkGreen,
  purple,
  darkerGreen,
  veryLightGrey,
  red,
  mostLightGreenEver,
  evenLighterGreen,
  dark,
  grey,
  lightGrey,
  dimmedRed,
  lightGreen,
  teal,
  blue,
} from "../../components/atoms/Colors";
import {
  setSpendingList,
  setBudgetsListDetails,
  setCategories2Budgets,
  setBudgetBalance,
  setBudgetId,
  setBudgetAmount,
  setBudgetName,
  setBudgetNote,
  setEndDate,
  setStartDate,
} from "../../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import { Store } from "../../redux/store";
import {
  BudgetListItem,
  BudgetHeader,
  CustomCalendar,
  Header,
  TransactionList,
  BudgetListItemTemplate,
} from "../../components/organisms";
import { BudgetOverspendButton, CustomLineChart } from "../../components/atoms";
import { fullDate } from "../../utils/timeMethods";
import {
  APICallGetTransactionsOfThisBudget,
  APIRequestDeleteBudget,
  APIRequestGetBudgets,
  APIRequestGetTransactionsOfThisBudget,
} from "../../services/budgets";
import { findCategoriesIdsOfBudget } from "../../utils/budgetMethods";
import { APIRequestGetSpendingCategories } from "../../services/categories";
import { makeListOfBudgetCategories } from "../../utils/budgetMethods";
import { makeListOfCategoriesForBudgetForm } from "../../utils/categoryMethods";
import { BudgetBarChart } from "../../components/molecules";

const { width } = Dimensions.get("window");

const BudgetDetailsScreen = (props) => {
  const {
    id,
    name,
    budgetAmount,
    balance,
    period,
    note,
    startDate,
    categories,
    XAxisDates,
    dailySums,
    dotPositions,
    daysOfBudget,
    todaysPosition,
  } = props.route.params;

  const title = "Budget" + " " + name;
  ///////////////////////////////FIELDS////////./////////////////////////////
  const { token, username } = useSelector((state) => state.userReducer);
  let header = {
    headers: { Authorization: token },
  };
  // const { walletsList } = useSelector((state) => state.walletReducer);
  const { transactionsListForBudget } = useSelector(
    (state) => state.transactionReducer
  );

  const { spendingList } = useSelector((state) => state.categoryReducer);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [triangleSelected, setTriangleSelected] = useState(false);

  let categoriesIds = [];
  var daysOfYear = [];
  // var daysOfBudget = [];
  var listOfCategoriesForEditForm = [];

  /////////////////////////////////////////////////////////////////////////////

  /////////////////////////METHODS////////////////////////////////////////////////

  useEffect(() => {
    setIsLoading(true);
    fetchData();
    listOfCategoriesForEditForm =
      makeListOfCategoriesForBudgetForm(spendingList);
    setIsLoading(false);
  }, []);

  const fetchData = async () => {
    categoriesIds = findCategoriesIdsOfBudget(categories, spendingList);
    await APIRequestGetTransactionsOfThisBudget(
      categoriesIds,
      startDate,
      period,
      header,
      dispatch
    );
  };

  const onPressEdit = () => {
    dispatch(setBudgetId(id));
    dispatch(setBudgetName(name));
    dispatch(setBudgetAmount(budgetAmount));
    dispatch(setStartDate(startDate));
    dispatch(setBudgetBalance(balance));
    dispatch(setEndDate(period));
    dispatch(setBudgetNote(note));

    props.navigation.navigate("AddEditBudgetScreen", {
      action: "Edit Budget",
      listOfCategoriesForEditForm: listOfCategoriesForEditForm,
      previusAmount: budgetAmount,
      previusBalance: balance,
    });
  };

  const onPressDelete = () => {
    APIRequestDeleteBudget(id, props, header, dispatch);
  };

  return (
    <View>
      <Header
        back
        headerColor={blue}
        navigation={props.navigation}
        editButton
        deleteButton
        onPressEdit={onPressEdit}
        onPressDelete={onPressDelete}
        title={"Budget Details"}
      />

      {isLoading ? (
        <ActivityIndicator size="large" color={darkerGreen} />
      ) : (
        <ScrollView style={{ display: "flex", backgroundColor: veryLightGrey }}>
          <BudgetHeader
            name={name}
            budgetAmount={budgetAmount}
            balance={balance}
          />

          <View style={styles.barChartContainer}>
            <BudgetBarChart
              budgetName={name}
              balance={balance}
              budgetAmount={budgetAmount}
              categoriesNames={categories}
              dontShowName
            />
          </View>
          <View style={styles.barChartContainer}>
            <CustomLineChart
              dates={XAxisDates}
              dailySums={dailySums}
              dotPositions={dotPositions}
              todaysPosition={todaysPosition}
            />
          </View>
          <TransactionList
            props={props}
            width={width}
            transactionsList={transactionsListForBudget}
            //walletsList={walletsList}
            style={styles.transactionsList}
          />
        </ScrollView>
      )}
    </View>
  );
};

export default BudgetDetailsScreen;
const styles = StyleSheet.create({
  barChartContainer: {
    backgroundColor: mostLightGreenEver,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 5,
    padding: 10,
    //flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  transactionsList: {
    // backgroundColor: mostLightGreenEver,
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.5,
    // shadowRadius: 5,
    // elevation: 5,
  },
  // container: { flex: 1 },
  btn: {
    alignSelf: "center",
    //backgroundColor: darkGreen,
    // marginLeft: 200,
    //marginRight: 20,
  },

  transactionsContainer: {},

  overview: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 13,
    // position: "relative",
  },
});
