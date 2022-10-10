import moment from "moment";
import React, { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { PieChart } from "react-native-svg-charts";
import { useDispatch, useSelector } from "react-redux";
import { setIncomeSum, setSpendingSum } from "../../../redux/actions";
import { Store } from "../../../redux/store";
import { BoxItem, CustomPieChart } from "../../atoms";
import {
  blue,
  dark,
  darkGreen,
  darkGrey,
  mostLightGreenEver,
  purple,
  red,
  veryLightGrey,
} from "../../atoms/Colors";
import { BudgetBarChart } from "../../molecules";
import BudgetList from "../lists/BudgetList";
const { width, height } = Dimensions.get("window");

const BudgetsCardForHome = ({ props }) => {
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={{ fontSize: 18, fontWeight: "bold", color: dark }}>
          Budgets
        </Text>
      </View>
      <View style={[styles.boxContainer]}>
        <BudgetList props={props} entity={"home"} />
      </View>
      <View style={styles.separatingLines}></View>
      <TouchableOpacity
        style={{ paddingLeft: 20, paddingBottom: 15 }}
        onPress={() => {
          props.navigation.navigate("EnvelopeNavigator");
        }}
      >
        <Text style={{ color: blue, fontWeight: "bold" }}>SHOW MORE</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BudgetsCardForHome;
const styles = StyleSheet.create({
  title: { paddingLeft: 20, paddingTop: 10 },
  container: {
    backgroundColor: mostLightGreenEver,
    margin: 10,
    borderRadius: 5,
    shadowColor: dark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
    paddingBottom: 5,
  },
  boxContainer: {
    justifyContent: "space-between",
    display: "flex",
    flexDirection: "column",
  },
  separatingLines: {
    borderBottomColor: "#c8c8c8",
    borderBottomWidth: 1,
    marginBottom: 10,
    marginTop: 5,
    width: 0.9 * width,
    alignSelf: "center",
  },
});
