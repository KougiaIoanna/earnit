import moment from "moment";
import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { PieChart } from "react-native-svg-charts";
import { useDispatch, useSelector } from "react-redux";
import { setIncomeSum, setSpendingSum } from "../../../redux/actions";
import { Store } from "../../../redux/store";
import {
  blue,
  dark,
  darkGreen,
  darkGrey,
  grey,
  lightGrey,
  mostLightGreenEver,
  red,
  veryLightGrey,
} from "../../atoms/Colors";
import { TransactionList, CustomPieChart } from "../../organisms";

const SummaryCardForHome = ({ props }) => {
  const { spendingList, incomeList, spendingSum, incomeSum } = useSelector(
    (state) => state.categoryReducer
  );
  const { transactionsSumsByCategory, transactionsList } = useSelector(
    (state) => state.transactionReducer
  );
  const dispatch = useDispatch();
  var dataForSummary = [];

  dataForSummary = [
    ...dataForSummary,
    {
      key: 0,
      value: parseFloat(spendingSum),
      svg: { fill: red },
      arc: { cornerRadius: 3 },
    },
    {
      key: 1,
      value: parseFloat(incomeSum),
      svg: { fill: darkGreen },
      arc: { cornerRadius: 3 },
    },
  ];
  if (dataForSummary[0].value === 0 && dataForSummary[1].value === 0) {
    dataForSummary = [{ key: 0, value: 1, svg: { fill: lightGrey } }];
  }

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>{moment().format("MMMM YYYY")}</Text> */}
      <View style={styles.body}>
        <View style={styles.chartContainer}>
          <PieChart
            style={{ height: 70, width: 70 }}
            data={dataForSummary}
          ></PieChart>
        </View>
        <View style={styles.textBox}>
          <Text style={{ fontSize: 15, color: dark }}>Income: </Text>
          <Text style={{ fontSize: 15, color: dark }}>Expenses: </Text>
          <Text style={{ fontSize: 15, color: dark }}>Balance: </Text>
        </View>
        <View style={[styles.textBox, { alignItems: "flex-end" }]}>
          <Text style={styles.textGreen}>{incomeSum}€</Text>
          <Text style={styles.textRed}>{spendingSum}€</Text>
          <Text style={styles.textGreen}>{incomeSum - spendingSum}€</Text>
        </View>
      </View>
    </View>
  );
};

export default SummaryCardForHome;
const styles = StyleSheet.create({
  chartContainer: {
    // marginLeft: 10,
    // marginTop: 10,
    marginRight: 10,
  },
  body: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },

  textRed: { color: red, fontSize: 15 },
  textGreen: { color: darkGreen, fontSize: 15 },
  //textBox: { marginTop: 10 },
  container: {
    backgroundColor: mostLightGreenEver,
    margin: 10,
    borderRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
    padding: 10,
  },
  title: {
    paddingLeft: 10,
    display: "flex",
    fontSize: 18,
    fontWeight: "bold",
  },
});
