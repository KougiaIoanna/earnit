import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { veryLightGrey } from "./../Colors";

const CalendarModalButton = ({ text, onPress, style }) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

export default CalendarModalButton;

const styles = StyleSheet.create({
  button: {
    marginVertical: 5,
    padding: 5,
    borderRadius: 15,
  },
  buttonText: {
    color: veryLightGrey,
    paddingHorizontal: 4,
    fontWeight: "bold",
  },
});
