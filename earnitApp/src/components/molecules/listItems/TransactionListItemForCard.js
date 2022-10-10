import React from "react";
import { View, StyleSheet } from "react-native";
import { grey, lightGrey } from "../../atoms/Colors";
import { useDispatch, useSelector } from "react-redux";
import { Transaction } from "..";
import moment from "moment";
import {
  APIRequestCreateTransaction,
  APIRequestPatchTransaction,
  APIRequestUpdateUpcomingTransaction,
  APIRequestFetchDataAfterNewTransaction,
} from "../../../services/transactions";
import {
  findNextOccurence,
  makeSmallTitleForRecurringTransactions,
  makeTitleForRecurringTransactions,
} from "../../../utils/transactionMethods";

const TransactionListItemForCard = ({
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
  upcomingOrNot,
}) => {
  return (
    <View style={styles.separatingLines}>
      {upcomingOrNot === "upcoming" ? (
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
          screen={"home"}
        />
      ) : (
        <Transaction
          navigation={navigation}
          item={item}
          icon={icon}
          wallet={wallet}
          walletId={walletId}
          budgetId={budgetId}
          category={category}
          categoryType={categoryType}
          transactionDate={item.transaction_date}
          screen={"home"}
        />
      )}
    </View>
  );
};
export default TransactionListItemForCard;

const styles = StyleSheet.create({
  separatingLines: {
    borderBottomColor: lightGrey,
    borderBottomWidth: 1,
  },
});
