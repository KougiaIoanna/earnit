import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { lightGrey } from "../Colors";
import moment from "moment";

const UpcomingTransactionFooter = ({ intervalSTR, nextOccurence }) => {
  return (
    <View style={styles.container}>
      <Text>{intervalSTR}</Text>
      <Text style={{}}>{moment(nextOccurence).format("DD/MM/YY")}</Text>
    </View>
  );
};

export default UpcomingTransactionFooter;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
    marginLeft: 5,
    marginRight: 10,
    borderTopColor: lightGrey,
    borderTopWidth: 1,
    paddingTop: 3,
  },
});
