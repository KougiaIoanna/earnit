import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { darkGreen, red, darkGrey } from "../Colors";
import {
  makeSmallTitleForRecurringTransactions,
  makeSmallTitleForTransactions,
} from "../../../utils/transactionMethods";

const TransactionAmount = ({ categoryType, amount, date }) => {
  return (
    <View style={styles.amountBox}>
      {categoryType === "Spending" ? (
        <Text style={[styles.balance, { color: red }]}>-{amount}€</Text>
      ) : (
        <Text style={[styles.balance, { color: darkGreen }]}>+{amount}€</Text>
      )}
      {date !== null && (
        <Text style={{ color: darkGrey, fontSize: 13 }}>{date}</Text>
      )}
    </View>
  );
};

export default TransactionAmount;

const styles = StyleSheet.create({
  amountBox: {
    flexDirection: "column",
    flex: 2,
    justifyContent: "center",
    marginLeft: 5,
    marginRight: 10,
    paddingTop: 3,
  },
  balance: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
