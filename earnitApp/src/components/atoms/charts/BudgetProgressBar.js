import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { lightBlue, red } from "../Colors";
import * as Progress from "react-native-progress";
const { width } = Dimensions.get("window");

const BudgetProgressBar = ({
  leftToSpend,
  overspend,
  balance,
  budgetAmount,
  footerOnTop,
  budgetName,
}) => {
  return (
    <View style={styles.container}>
      {overspend ? (
        <>
          {footerOnTop === true ? (
            <View style={[styles.footer, { justifyContent: "space-between" }]}>
              <Text style={styles.name}>{budgetName}</Text>
              <Text>{balance}€ </Text>
            </View>
          ) : null}
          <Progress.Bar progress={1} width={300} height={15} color={red} />
          {footerOnTop === false ? (
            <View style={styles.footer}>
              <Text>{balance}€ </Text>
            </View>
          ) : null}
        </>
      ) : null}
      {leftToSpend ? (
        <>
          {footerOnTop === true ? (
            <View style={[styles.footer, { justifyContent: "space-between" }]}>
              <Text style={styles.name}>{budgetName}</Text>
              <Text>+{balance}€ </Text>
            </View>
          ) : null}
          <Progress.Bar
            progress={leftToSpend}
            width={0.85 * width}
            height={15}
            color={lightBlue}
          />
          {footerOnTop === false ? (
            <View style={styles.footer}>
              <Text>+{balance}€ </Text>
            </View>
          ) : null}
        </>
      ) : null}
    </View>
  );
};

export default BudgetProgressBar;

const styles = StyleSheet.create({
  container: {
    marginTop: 8,

    alignItems: "center",
  },
  footer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    width: 0.85 * width,
    paddingRight: 10,
    marginBottom: 2,
  },
});
