import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import {
  darkGreen,
  darkGrey,
  grey,
  lightGrey,
  mostLightGreenEver,
  red,
  veryLightGrey,
} from "../../atoms/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { APIRequestGetTransactionsSumsForReports } from "../../../services/transactions";
import {
  findSum,
  makeListOfCategoriesCurrentAndPreviousAmounts,
} from "../../../utils/categoryMethods";

const ReportListItem = ({ item, navigation }) => {
  const { token } = useSelector((state) => state.userReducer);
  let header = {
    headers: { Authorization: token },
  };
  const { incomeList, spendingList } = useSelector(
    (state) => state.categoryReducer
  );
  const dispatch = useDispatch();
  const [sums, setSums] = useState([]);
  const [previousSums, setPreviousSums] = useState([]);

  useEffect(() => {
    var prevMonth = moment(item).subtract(1, "months");
    APIRequestGetTransactionsSumsForReports(
      moment(item).startOf("month"),
      moment(item).endOf("month"),
      header,
      dispatch,
      setSums
    );
    APIRequestGetTransactionsSumsForReports(
      moment(prevMonth).startOf("month"),
      moment(prevMonth).endOf("month"),
      header,
      dispatch,
      setPreviousSums
    );
  }, []);
  let sSum = findSum(spendingList, sums);
  let iSum = findSum(incomeList, sums);
  return (
    <TouchableOpacity
      onPress={() => {
        let prevSSum = findSum(spendingList, previousSums);
        let prevISum = findSum(incomeList, previousSums);
        let joindedSums = makeListOfCategoriesCurrentAndPreviousAmounts(
          sums,
          previousSums
        );

        navigation.navigate("MonthlyReportScreen", {
          title: moment(item).format("MMMM YYYY"),
          sums: joindedSums,
          iSum: iSum,
          sSum: sSum,
          prevISum: prevISum,
          prevSSum: prevSSum,
        });
      }}
    >
      <View style={styles.outerBox}>
        <Text style={{ flex: 2, paddingLeft: 5 }}>
          {moment(item).format("MMMM YYYY")}
        </Text>
        <Text style={{ color: darkGreen, flex: 1 }}>+{iSum}€</Text>
        <Text style={{ color: red, flex: 1 }}>-{sSum}€</Text>
      </View>
    </TouchableOpacity>
  );
};
export default ReportListItem;

const styles = StyleSheet.create({
  outerBox: {
    //backgroundColor: veryLightGrey,
    //margin: 10,
    //borderRadius: 5,
    //padding: 10,
    //shadowColor: "#000",
    //shadowOffset: { width: 0, height: 2 },
    //shadowOpacity: 0.5,
    //shadowRadius: 5,
    // elevation: 5,
    flexDirection: "row",
    marginHorizontal: 10,
    borderBottomColor: lightGrey,
    borderBottomWidth: 1,
    // justifyContent: "space-evenly",
    paddingVertical: 10,
  },
});
