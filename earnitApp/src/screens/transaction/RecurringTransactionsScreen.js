import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  darkGreen,
  purple,
  veryLightGrey,
} from "../../components/atoms/Colors";
import { TransactionList, Header } from "../../components/organisms";
import { useSelector } from "react-redux";

const RecurringTransactionsScreen = (props) => {
  const { recurringTransactionsList } = useSelector(
    (state) => state.transactionReducer
  );

  return (
    <View>
      <Header
        title={"Upcoming planned transactions"}
        back
        headerColor={darkGreen}
        navigation={props.navigation}
      />
      <TransactionList
        props={props}
        transactionsList={recurringTransactionsList}
        upcoming={true}
      />
    </View>
  );
};

export default RecurringTransactionsScreen;
const styles = StyleSheet.create({});
