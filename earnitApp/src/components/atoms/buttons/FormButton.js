import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { veryLightGrey, lighterPurple } from "./../Colors";

const FormButton = ({ action, onPress, color }) => {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: color }]}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{action}</Text>
    </TouchableOpacity>
  );
};
export default FormButton;

const styles = StyleSheet.create({
  button: {
    height: 40,
    backgroundColor: lighterPurple,
    borderRadius: 5,
    marginHorizontal: 70,
    marginBottom: 15,
    paddingHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
  },
  buttonText: {
    alignSelf: "center",
    color: veryLightGrey,
    paddingTop: 10,
  },
});
