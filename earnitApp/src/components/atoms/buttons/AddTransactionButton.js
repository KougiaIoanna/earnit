import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { darkGreen, veryLightGrey } from "./../Colors";
import { AntDesign } from "@expo/vector-icons";

const AddTransactionButton = ({ onPress, styleWithTopNavigator }) => {
  return (
    <View style={[styles.container, styleWithTopNavigator]}>
      <TouchableOpacity onPress={onPress} style={styles.button}>
        <AntDesign name={"pluscircle"} size={60} color={darkGreen} />
      </TouchableOpacity>
    </View>
  );
};
export default AddTransactionButton;

const styles = StyleSheet.create({
  container: {
    width: 60,
    height: 60,
    position: "absolute",
    bottom: 75,
    alignSelf: "center",
  },
  button: {
    alignContent: "center",
    justifyContent: "center",
    position: "absolute",
    shadowOffset: { height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    backgroundColor: veryLightGrey,
    borderRadius: 36,
  },
});
