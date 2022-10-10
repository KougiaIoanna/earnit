import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { dark, darkGrey } from "../Colors";

const TransactionText = ({ category, wallet, note, screen }) => {
  return (
    <View style={styles.textBox}>
      <Text style={styles.name}>{category}</Text>
      {screen !== "home" && <Text style={styles.account}>{wallet} </Text>}
      {note !== "" && note !== null ? (
        <Text style={[styles.account, { fontStyle: "italic" }]}>"{note}"</Text>
      ) : null}
    </View>
  );
};

export default TransactionText;

const styles = StyleSheet.create({
  textBox: {
    flex: 5,
    marginLeft: 6,
    marginTop: 4,
    marginBottom: 4,
    justifyContent: "center",
  },
  name: {
    color: dark,
    fontSize: 17,
  },
  account: {
    color: darkGrey,
    fontSize: 13,
  },
});
