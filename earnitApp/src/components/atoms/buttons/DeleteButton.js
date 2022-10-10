import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { dark } from "./../Colors";
import { MaterialIcons } from "@expo/vector-icons";

const DeleteButton = ({ onPress, color }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <MaterialIcons name="delete" style={[styles.deleteIcon, color]} />
    </TouchableOpacity>
  );
};
export default DeleteButton;

const styles = StyleSheet.create({
  deleteIcon: {
    justifyContent: "flex-end",
    padding: 5,
    color: dark,
    fontSize: 25,
    padding: 10,
  },
});
