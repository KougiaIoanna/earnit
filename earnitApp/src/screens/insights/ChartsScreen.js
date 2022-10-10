import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  ImageBackground,
  RefreshControl,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { Title } from "react-native-paper";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import { flushSync } from "react-dom";
import { ScrollView } from "react-native-virtualized-view";
import moment from "moment";

import {
  darkGreen,
  lightGreen,
  veryLightGrey,
  rainbow,
  red,
  darkerGreen,
  grey,
  dark,
  purple,
} from "../../components/atoms/Colors";
import {
  CalendarModal,
  Header,
  HeaderWithDateRange,
  PieChart,
  ReportList,
} from "../../components/organisms";
import DotAndCategoryName, { FormButton } from "../../components/atoms";
import {
  addTransactionInChart,
  setDeletedTransaction,
  setTransactionsInChart,
  setTransactionsListForCtransactionsListForChart,
  deleteAllTransactionsFromChart,
  setReloadCharts,
} from "../../redux/actions";
import { Store } from "../../redux/store";

import {
  computeSum,
  foundTransactionWithThisCategory,
  isFirstRenderAfterOpeningTheApp,
} from "../../utils/insightsMethods";
import {
  BoxItem,
  CalendarButton,
  GoalOverviewItem,
} from "../../components/atoms";
const { width } = Dimensions.get("window");
import {
  APIRequestGetTransactionsByDateRange,
  APIRequestGetTransactionsSum,
} from "../../services/transactions";
import {
  endOfCurrentDay,
  getListOfMonthsUntilLastMonth,
  startOfCurrentMonth,
} from "../../utils/timeMethods";

const image = require("../../../assets/img.jpg");
const InsightsScreen = (props) => {
  ///////////////////////////////////////////////////////////////////////////////////////////
  const { token } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  let header = {
    headers: { Authorization: token },
  };
  const { spendingList, incomeList } = useSelector(
    (state) => state.categoryReducer
  );
  const { transactionsInChart, isDeleted, reloadCharts } =
    Store.getState().chartReducer;
  const { transactionsListForChart, transactionsSumsByCategory } =
    Store.getState().transactionReducer;

  const [dataSpending, setDataSpending] = useState([]);
  const [dataIncome, setDataIncome] = useState([]);

  const [spendingSum, setSpendingSum] = useState(0);
  const [incomeSum, setIncomeSum] = useState(0);
  const isFocused = useIsFocused();

  var topikodataSpending = [];
  var topikodataincome = [];

  const { chartDateRangeTitle } = Store.getState().chartReducer;
  const [refreshing, setRefreshing] = useState(false);
  const [months, setMonths] = useState([]);
  const [viewReports, setViewReports] = useState(false);

  ////////////////////////////////////////////////////////////////////////////////////////////////
  const changeViewReports = () => {
    if (viewReports === false) {
      setViewReports(true);
    } else {
      setViewReports(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [transactionsSumsByCategory]);

  const fetchData = async () => {
    // await setIsLoading(true);
    await flushSync(setDataIncome([]));
    await flushSync(setDataSpending([]));
    await flushSync(setSpendingSum(0));
    await flushSync(setIncomeSum(0));
    topikodataSpending = await makeSpendingData();
    topikodataincome = await makeIncomeData();
    await flushSync(setSpendingSum(computeSum(topikodataSpending)));
    await setIncomeSum(computeSum(topikodataincome));
    setMonths(getListOfMonthsUntilLastMonth());

    setIsLoading(false);
  };

  const makeSpendingData = async () => {
    let topiko = [];
    spendingList.forEach((category) => {
      transactionsSumsByCategory.forEach((item) => {
        if (category.category_id === item.category) {
          setDataSpending((dataList) => {
            const position = dataList.length;
            const newData = [...dataList];
            newData[position] = {
              key: category.category_id,
              amount: item.sum,
              svg: { fill: rainbow[position] },
              name: category.category_name,
              arc: { cornerRadius: 5 },
            };
            topiko = [...newData];
            return newData;
          });
        }
      });
    });
    return topiko;
  };

  const makeIncomeData = async () => {
    let topiko = [];
    incomeList.forEach((category) => {
      transactionsSumsByCategory.forEach((item) => {
        if (category.category_id === item.category) {
          setDataIncome((dataList) => {
            const position = dataList.length;
            const newData = [...dataList];
            newData[position] = {
              key: category.category_id,
              amount: item.sum,
              svg: { fill: rainbow[position] },
              name: category.category_name,
              arc: { cornerRadius: 5 },
            };
            topiko = [...newData];
            return newData;
          });
        }
      });
    });
    return topiko;
  };

  return (
    //na kanw to header ne header!!!!!!!!!
    <>
      <View style={{ backgroundColor: veryLightGrey }}>
        <View style={styles.header}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              marginTop: 10,
            }}
          >
            <Text style={[styles.period]}>
              {chartDateRangeTitle + " " + moment().format("YYYY")}
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
              marginTop: 10,
            }}
          >
            <BoxItem
              label={" Income "}
              value={incomeSum.toFixed(2)}
              backgroundStyle={styles.boxItem}
              labelStyle={{ color: darkGreen }}
            />

            <BoxItem
              label={"Expenses"}
              value={spendingSum.toFixed(2)}
              backgroundStyle={styles.boxItem}
              labelStyle={{ color: red }}
            />

            <BoxItem
              label={"Balance"}
              value={(incomeSum - spendingSum).toFixed(2)}
              backgroundStyle={styles.boxItem}
              labelStyle={{ color: darkGreen }}
            />
          </View>
        </View>
      </View>

      {reloadCharts || isLoading ? (
        <ActivityIndicator size="large" color={darkerGreen} />
      ) : (
        <ScrollView
          style={{ marginBottom: 60, backgroundColor: veryLightGrey }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {
                setRefreshing(true);
                setTimeout(() => {
                  setRefreshing(false);
                }, 3000);
              }}
              tintColor={purple}
            />
          }
        >
          <PieChart
            sum={spendingSum}
            datalist={dataSpending}
            type={"Spending"}
          />
          <PieChart sum={incomeSum} datalist={dataIncome} type={"Income"} />
          <View style={{ margin: 5 }}></View>
        </ScrollView>
      )}
      <CalendarModal
        entity={"chart"}
        navigation={props.navigation}
        position={{ right: 20 }}
      />
    </>
  );
};

export default InsightsScreen;
const styles = StyleSheet.create({
  innerContainer: {
    display: "flex",
    flexDirection: "row",
  },

  textHeader: {
    color: "#000",
    fontSize: 30,
  },

  list: {
    marginLeft: -100,
    flex: 1,
  },
  balanceList: {
    marginLeft: 40,
  },
  incomeBoxBackgroundStyle: {
    backgroundColor: darkGreen,
    opacity: 0.8,
  },
  spendingBoxBackgroundStyle: {
    backgroundColor: red,
    opacity: 0.8,
  },
  header: {
    backgroundColor: darkGreen,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    paddingBottom: 15,
    shadowColor: dark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  firstLine: {
    marginBottom: 10,
    paddingTop: 5,
    display: "flex",
    flexDirection: "row",
    paddingLeft: 5,
    //backgroundColor: red,
  },
  boxes: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  boxItem: {
    backgroundColor: grey,
  },
  boxItemLabel: {},
  insightsLabel: {
    color: veryLightGrey,
    fontSize: 20,
    fontWeight: "bold",
    //paddingTop: 10,
    // paddingLeft: 10,
  },
  period: {
    color: veryLightGrey,
    fontSize: 16,
    marginLeft: 30,
    fontSize: 20,
    //marginLeft: 10,
  },
});
