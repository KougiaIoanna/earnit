import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  FlatList,
  RefreshControl,
} from "react-native";
import {
  veryLightGrey,
  purple,
  mostLightGreenEver,
  red,
} from "../../atoms/Colors";
import { useSelector, useDispatch } from "react-redux";
import {
  setWalletsList,
  setIncomeList,
  setSpendingList,
  setTransactionsList,
  setRecurringTransactionsList,
  setTransactionOverdue,
  setTransactionDueToday,
} from "../../../redux/actions";
import {
  startOfCurrentMonth,
  endOfCurrentDay,
} from "../../../utils/timeMethods";
import {
  APIRequestGetRecurringTransactions,
  APIRequestGetTransactionsByDateRange,
} from "../../../services/transactions";
import {
  didDateChange,
  didIntervalChange,
  findIntervalSTR,
  isRecurringTransaction,
  makeSmallTitleForRecurringTransactions,
  makeSmallTitleForTransactions,
} from "../../../utils/transactionMethods";
import { findWallet } from "../../../utils/walletMethods";
import {
  findCategory,
  findCategoryIcon,
  findCategoryType,
} from "../../../utils/categoryMethods";
import { findBudgetId } from "../../../utils/budgetMethods";
import moment from "moment";

import {
  TransactionListItemForCard,
  TransactionListItem,
  UpcomingTransactionListItem,
} from "../../molecules";

const TransactionList = ({
  props,
  width,
  transactionsList,
  marginTop,
  onPressTransaction,
  upcoming,
  style,
  screen,
}) => {
  const { token } = useSelector((state) => state.userReducer);
  const header = {
    headers: { Authorization: token },
  };
  const [refreshing, setRefreshing] = useState(false);

  //const { transactionsList } = useSelector((state) => state.transactionReducer);
  const { spendingList, incomeList } = useSelector(
    (state) => state.categoryReducer
  );
  const { walletsList } = useSelector((state) => state.walletReducer);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  let transaction_id;
  let category;
  let wallet;
  let categoryType;
  let budgetId;
  let icon;
  var date = "";
  var interval = "";
  var intervalSTR = "";

  const fetchData = async () => {
    const fromDate = startOfCurrentMonth();
    const toDate = endOfCurrentDay();
    APIRequestGetTransactionsByDateRange(fromDate, toDate, header, dispatch);
    APIRequestGetRecurringTransactions(header, dispatch);
  };

  const renderItem = ({ item }) => {
    var title;
    if (item.transactionDate) title = makeSmallTitleForTransactions(date);
    else title = makeSmallTitleForRecurringTransactions(date);
    var dateChanged = false;
    if (
      didDateChange(date, moment(item.transaction_date).format("YYYY-MM-DD"))
    ) {
      dateChanged = true;
      date = moment(item.transaction_date).format("YYYY-MM-DD");
    }
    var intervalChanged = false;
    if (isRecurringTransaction(item)) {
      if (didIntervalChange(interval, item.interval_period)) {
        intervalChanged = true;
        intervalSTR = findIntervalSTR(item.interval_period);
      }
    }
    ///
    wallet = findWallet(item.wallet_id, walletsList);
    category = findCategory(item.category_id, spendingList, incomeList);
    icon = findCategoryIcon(item.category_id, spendingList, incomeList);
    categoryType = findCategoryType(item.category_id, incomeList, spendingList);
    if (categoryType === "Spending")
      budgetId = findBudgetId(item.category_id, spendingList, incomeList);

    return (
      <>
        {screen === "home" ? (
          <TransactionListItemForCard
            item={item}
            navigation={props.navigation}
            category={category}
            wallet={wallet}
            budgetId={budgetId}
            walletId={item.wallet_id}
            categoryType={categoryType}
            nextOccurence={item.next_occurrence}
            onPressTransaction={onPressTransaction}
            intervalSTR={intervalSTR}
            icon={icon}
            upcomingOrNot={upcoming ? "upcoming" : "not"}
          />
        ) : null}
        {upcoming === true && screen !== "home" ? (
          <UpcomingTransactionListItem
            item={item}
            navigation={props.navigation}
            category={category}
            wallet={wallet}
            budgetId={budgetId}
            walletId={item.wallet_id}
            categoryType={categoryType}
            nextOccurence={item.next_occurrence}
            onPressTransaction={onPressTransaction}
            intervalSTR={intervalSTR}
            icon={icon}
          />
        ) : null}
        {upcoming !== true && screen !== "home" ? (
          <TransactionListItem
            item={item}
            navigation={props.navigation}
            category={category}
            wallet={wallet}
            budgetId={budgetId}
            walletId={item.wallet_id}
            categoryType={categoryType}
            dateChanged={dateChanged}
            onPressTransaction={onPressTransaction}
            icon={icon}
          />
        ) : null}
      </>
    );
  };
  var height;
  if (screen === "home") {
    height = 0;
  } else if (screen === "upcoming") {
    height = 100;
  } else {
    height = 400;
  }
  return (
    <SafeAreaView style={(styles.container, { width, marginTop })}>
      <FlatList
        ListFooterComponent={<View />}
        ListFooterComponentStyle={{
          height: height,
        }}
        style={upcoming === true && screen !== "home" ? null : styles.list}
        data={
          screen === "home" ? transactionsList.slice(0, 5) : transactionsList
        }
        keyExtractor={(item) => item.transaction_id}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
              fetchData();
              setTimeout(() => {
                setRefreshing(false);
              }, 3000);
              //setRefreshing(false);
            }}
            tintColor={purple}
          />
        }
      ></FlatList>
    </SafeAreaView>
  );
};

export default TransactionList;

const styles = StyleSheet.create({
  container: {
    backgroundColor: veryLightGrey,
    flex: 1,
  },

  list: {
    marginVertical: 5,
    marginHorizontal: 10,
    backgroundColor: mostLightGreenEver,
    borderRadius: 5,
  },
});

