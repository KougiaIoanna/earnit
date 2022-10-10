import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { dark } from "../Colors";

const DotAndCategoryName = ({ dotColor, category }) => {
  return (
    <View style={styles.container}>
      <View style={[styles.dot, { backgroundColor: dotColor }]}></View>
      <Text style={styles.text}>{category}</Text>
    </View>
  );
};
export default DotAndCategoryName;
const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  dot: {
    marginLeft: 3,
    marginRight: 3,
    height: 10,
    width: 10,
    borderRadius: 5,
  },
  text: {
    color: dark,
    fontSize: 13,
  },
});
