import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import {
  blue,
  dark,
  darkGrey,
  mostLightGreenEver,
  purple,
} from "../../atoms/Colors";
import TransactionList from "../lists/TransactionList";

const TransactionsCardForHome = ({ props, upcoming, latest }) => {
  const { recurringTransactionsList, transactionsList } = useSelector(
    (state) => state.transactionReducer
  );
  const title = upcoming
    ? "Upcoming planned transactions"
    : "Latest transactions";
  return (
    <View style={styles.boxContainer}>
      <View style={styles.title}>
        <Text style={{ fontSize: 18, fontWeight: "bold", color: dark }}>
          {title}
        </Text>
      </View>
      <TransactionList
        props={props}
        transactionsList={
          upcoming ? recurringTransactionsList : transactionsList
        }
        upcoming={upcoming ? true : false}
        screen={"home"}
      />
      <TouchableOpacity
        style={{ paddingLeft: 20, paddingBottom: 15 }}
        onPress={() => {
          props.navigation.navigate(
            upcoming ? "RecurringTransactionsScreen" : "WalletNavigator"
          );
        }}
      >
        <Text style={{ color: blue, fontWeight: "bold" }}>SHOW MORE</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TransactionsCardForHome;
const styles = StyleSheet.create({
  title: { paddingLeft: 20, paddingTop: 10 },
  boxContainer: {
    backgroundColor: mostLightGreenEver,
    margin: 10,
    borderRadius: 5,
    shadowColor: dark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
});
