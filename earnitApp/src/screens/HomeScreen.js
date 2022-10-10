import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Dimensions,
  ActivityIndicator,
  Touchable,
  TouchableOpacity,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import {
  setEmail,
  setPassword,
  setUsername,
  setUserId,
  setConfirmPassword,
  setToken,
  setIncomeList,
  setTransactionsList,
  setWalletsList,
  setRecurringTransactionsList,
  setCategories2Budgets,
  setTransactionsListForChart,
  setSpendingSum,
  setIncomeSum,
} from "../redux/actions";
import SettingsScreen from "./SettingsScreen";
import {
  CalendarModal,
  Header,
  TransactionList,
  WalletsCardForHome,
  SummaryCardForHome,
  BudgetsCardForHome,
  TransactionsCardForHome,
  GoalsCardForHome,
} from "../components/organisms";
import { ScrollView } from "react-native-gesture-handler";
import {
  veryLightGrey,
  darkGreen,
  lightGreen,
  darkerGreen,
  grey,
  dark,
  red,
  mostLightGreenEver,
  blue,
  purple,
  dimmedGreen,
  dimmedRed,
} from "../components/atoms/Colors";
import { setSpendingList } from "../redux/actions";
import { Store } from "../redux/store";
const { width, height } = Dimensions.get("window");
import { endOfCurrentDay, startOfCurrentMonth } from "../utils/timeMethods";
import { makeDataForCharts } from "../utils/insightsMethods";
import { APIRequestGetWallets } from "../services/wallets";
import {
  APIRequestGetIncomeCategories,
  APIRequestGetSpendingCategories,
} from "../services/categories";
import {
  APIRequestGetRecurringTransactions,
  APIRequestGetTransactionsByDateRange,
  APIRequestGetTransactionsSum,
  APIRequestGetTransactionsSums,
} from "../services/transactions";
import { findSum, makeCategoriesForDropdown } from "../utils/categoryMethods";
import { makeCategories2BudgetsList } from "../utils/budgetMethods";
import { makeWalletsForDropdown } from "../utils/walletMethods";
import moment from "moment";
import { AntDesign, Entypo, Ionicons, MaterialIcons } from "@expo/vector-icons";
import {
  BoxItem,
  AddTransactionButton,
  NotificationButton,
  SettingsButton,
} from "../components/atoms";
import { recurringTransactionsToday } from "../utils/transactionMethods";

const HomeScreen = (props) => {
  const navigation = props.navigation;
  const dispatch = useDispatch();
  //////////////////////////REDUX///////////////////////////////////////////////////
  const { username, email, token } = useSelector((state) => state.userReducer);
  const { transactionsList, transactionsSumsByCategory } = useSelector(
    (state) => state.transactionReducer
  );
  const { walletsList } = useSelector((state) => state.walletReducer);
  const { incomeList, spendingList } = useSelector(
    (state) => state.categoryReducer
  );
  const { recurringTransactionsList, transactionDueToday, transactionOverdue } =
    useSelector((state) => state.transactionReducer);

  ///////////////////////////STATES//////////////////////////////////////////////
  const [isLoading, setIsLoading] = useState(false);
  /////////////////////////FIELDS///////////////////////////////////////////
  let listOfAccounts = [];
  let spendingForDropdown = [];
  let incomeForDropdown = [];
  var header = {
    headers: { Authorization: token },
  };
  /////////////////////////////METHODS////////////////////////////////////////

  useEffect(() => {
    let active = true;
    const fetchData = async () => {
      setIsLoading(true);
      if (active) {
        recurringTransactionsToday(recurringTransactionsList, dispatch);
        makeCategories2BudgetsList(spendingList, dispatch);
        APIRequestGetSpendingCategories(header, dispatch);
        let sSum = findSum(spendingList, transactionsSumsByCategory);
        let iSum = findSum(incomeList, transactionsSumsByCategory);
        dispatch(setSpendingSum(sSum));
        dispatch(setIncomeSum(iSum));
        setIsLoading(false);
      }
    };
    fetchData();

    return () => {
      active = false;
    };
  }, [transactionsList]);

  const onPressAddTransaction = async () => {
    await makeCategories2BudgetsList(spendingList, dispatch);
    wallets = await makeWalletsForDropdown(walletsList);
    income = await makeCategoriesForDropdown(incomeList);
    spending = await makeCategoriesForDropdown(spendingList);
    props.navigation.navigate("AddTransactionNavigator", {
      listOfAccounts: wallets,
      incomeForDropdown: income,
      spendingForDropdown: spending,
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={darkGreen} />
      <View style={styles.header}>
        <View style={styles.firstLine}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Text style={styles.month}>{moment().format("MMMM YYYY")}</Text>
            {transactionDueToday === true && (
              <NotificationButton
                navigation={props.navigation}
                when={"today"}
              />
            )}
            {transactionOverdue === true && (
              <NotificationButton navigation={props.navigation} when={"past"} />
            )}
          </View>

          <SettingsButton navigation={props.navigation} />
        </View>
        <SummaryCardForHome props={props} />
      </View>
      {isLoading ? (
        <ActivityIndicator size="large" color={darkerGreen} />
      ) : (
        <ScrollView>
          <WalletsCardForHome props={props} />
          <TransactionsCardForHome props={props} latest />
          <BudgetsCardForHome props={props} />
          <TransactionsCardForHome props={props} upcoming />
          <GoalsCardForHome props={props} />
          <View style={{ marginBottom: 100 }}></View>
        </ScrollView>
      )}
      {/* <CalendarModal entity={"home"} position={{ left: 0, top: 0 }} /> */}
      <AddTransactionButton
        onPress={onPressAddTransaction}
      ></AddTransactionButton>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: veryLightGrey,
    width: width,
    height: height,
  },
  title: { paddingLeft: 20, paddingTop: 10 },
  boxContainer: {
    backgroundColor: mostLightGreenEver,
    margin: 10,
    borderRadius: 10,
    shadowColor: dark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  header: {
    backgroundColor: darkGreen,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    paddingBottom: 5,
    shadowColor: dark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  firstLine: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  boxes: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  boxItem: {
    backgroundColor: grey,
  },
  textHeader: {
    color: "#000",
    fontSize: 30,
  },
  month: {
    color: veryLightGrey,
    fontSize: 20,
    paddingTop: 10,
    paddingLeft: 10,
  },
});
