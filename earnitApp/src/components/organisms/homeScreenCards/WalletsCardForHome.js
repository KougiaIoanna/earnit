import moment from "moment";
import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
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
import WalletList from "../lists/WalletList";

const WalletsCardForHome = ({ props }) => {
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={{ fontSize: 18, fontWeight: "bold", color: dark }}>
          Wallets
        </Text>
      </View>
      <View style={styles.boxContainer}>
        <WalletList props={props} entity={"home"} />
      </View>
    </View>
  );
};

export default WalletsCardForHome;
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
  },
  boxContainer: {
    paddingBottom: 10,
  },
});
