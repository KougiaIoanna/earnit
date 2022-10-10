import React from "react";
import { View, StyleSheet, Alert } from "react-native";
import { mostLightGreenEver } from "../../atoms/Colors";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import {
  APIRequestCreateTransaction,
  APIRequestPatchTransaction,
  APIRequestUpdateUpcomingTransaction,
  APIRequestUpdateNextOccurrence,
  APIRequestFetchDataAfterNewTransaction,
} from "../../../services/transactions";
import {
  findNextOccurrence,
  makeTitleForRecurringTransactions,
} from "../../../utils/transactionMethods";
import { findActionFromCategoryType } from "../../../utils/categoryMethods";
import { Transaction } from "..";
import { DateTitle } from "../../molecules";

const UpcomingTransactionListItem = ({
  item,
  navigation,
  category,
  wallet,
  budgetId,
  walletId,
  categoryType,
  nextOccurence,
  intervalSTR,
  icon,
}) => {
  const { token } = useSelector((state) => state.userReducer);
  const header = {
    headers: { Authorization: token },
  };
  let action = findActionFromCategoryType(categoryType);
  const entity = "Transaction";
  var date = moment(item.date).format("ddd, D MMMM YYYY");
  // var title = makeTitleForRecurringTransactions(nextOccurence);
  const dispatch = useDispatch();

  const onPressMarkAsPaid = () => {
    Alert.alert("Complete Transaction", "Mark this transaction as completed?", [
      { text: "Cancel" },
      { text: "Yes", onPress: () => addTransaction() },
    ]);
  };

  const onPressDismiss = () => {
    Alert.alert("⚠️ Dismiss Transaction", "Are you sure?", [
      { text: "Cancel" },
      { text: "Yes", onPress: () => putTransaction() },
    ]);
  };
  const putTransaction = async () => {
    let nextOccurence = findNextOccurrence(
      item.interval_period,
      moment().format("YYYY-MM-DD HH:mm:ss")
    );

    APIRequestUpdateNextOccurrence(
      item.transaction_id,
      nextOccurence,
      header,
      dispatch
    );
    APIRequestFetchDataAfterNewTransaction(header, dispatch);
  };

  const addTransaction = async () => {
    const newTransaction = {
      walletId: walletId,
      categoryId: item.category_id,
      transactionAmount: item.amount,
      transactionDate: moment().format("YYYY-MM-DD HH:mm:ss"),
      interval: item.interval_period,
      nextOccurrence: findNextOccurrence(
        item.interval_period,
        moment().format("YYYY-MM-DD HH:mm:ss")
      ),
      transactionNote: item.transaction_note,
      upcoming: "true",
    };
    await APIRequestUpdateUpcomingTransaction(item.transaction_id);
    await APIRequestCreateTransaction(newTransaction, action, header, dispatch);
    APIRequestFetchDataAfterNewTransaction(header, dispatch);
  };

  return (
    <View style={styles.container}>
      <DateTitle
        date={nextOccurence}
        onPressMarkAsPaid={onPressMarkAsPaid}
        onPressDismiss={onPressDismiss}
        upcoming
      />

      <Transaction
        navigation={navigation}
        item={item}
        icon={icon}
        wallet={wallet}
        walletId={walletId}
        budgetId={budgetId}
        category={category}
        categoryType={categoryType}
        nextOccurence={nextOccurence}
        intervalSTR={intervalSTR}
        screen={"upcoming"}
      />
    </View>
  );
};
export default UpcomingTransactionListItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: mostLightGreenEver,
    margin: 8,
    borderRadius: 5,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },

  separatingLines: {
    borderBottomColor: "#c8c8c8",
    borderBottomWidth: 1,
    margin: 5,
  },
});
