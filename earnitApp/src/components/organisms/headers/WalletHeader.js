import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  mostLightGreenEver,
  darkGreen,
  teal,
  veryLightGrey,
  lightGreen,
  lightGrey,
} from "../../atoms/Colors";
import { EntityTitle } from "../../molecules";

const WalletHeader = ({ name, balance }) => {
  return (
    <View
      style={{
        backgroundColor: darkGreen,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
      }}
    >
      <EntityTitle name={name} balance={balance} entity={"Wallet"} />
      <View style={styles.overview}>
        <View style={styles.overviewItem}>
          <View style={styles.label}>
            <Text style={styles.text}>{"Balance"}</Text>
          </View>
          <View style={styles.value}>
            <Text style={styles.text}>{balance}€</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default WalletHeader;

const styles = StyleSheet.create({
  overview: {
    marginBottom: 13,
    // position: "relative",
  },
  overviewItem: {
    display: "flex",
    flexDirection: "row",
    marginTop: 7,
    backgroundColor: veryLightGrey,
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
    alignSelf: "center",
  },
  label: {
    borderRightWidth: 1,
    borderRightColor: lightGrey,
    padding: 4,
  },
  value: {
    paddingTop: 4,
    paddingHorizontal: 4,
    // alignSelf: "center",
  },
  text: {
    fontSize: 17,
  },
});
