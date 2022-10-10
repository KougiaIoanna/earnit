import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  mostLightGreenEver,
  darkGreen,
  teal,
  blue,
  dark,
  lighterPurple,
  BudgetOverspendButton,
} from "../../atoms/Colors";
import { BoxItem, EntityTitle } from "../../atoms";

const BudgetHeader = ({ name, balance, budgetAmount }) => {
  //   const budgetAmount = 10;
  //   const balance = 5;
  return (
    <View style={styles.budgetHeader}>
      <EntityTitle name={name} balance={balance} />
      <View style={styles.overview}>
        <BoxItem
          label={"Budget"}
          value={budgetAmount}
          backgroundStyle={{ backgroundColor: lighterPurple }}
        />

        <BoxItem
          label={" Spend "}
          value={budgetAmount - balance}
          backgroundStyle={{ backgroundColor: lighterPurple }}
        />
        <BoxItem
          label={"Balance"}
          value={balance}
          backgroundStyle={{ backgroundColor: lighterPurple }}
        />
      </View>
    </View>
  );
};

export default BudgetHeader;

const styles = StyleSheet.create({
  budgetHeader: {
    backgroundColor: blue,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    marginBottom: 10,
    shadowColor: dark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  overview: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 13,
    // position: "relative",
  },
});
