import React from "react";
import { StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { dark, darkerGreen } from "../Colors";

const EditButton = ({ onPress, color }) => {
  return (
    <MaterialIcons
      name="edit"
      style={[styles.editIcon, color]}
      onPress={onPress}
    />
  );
};
export default EditButton;

const styles = StyleSheet.create({
  editIcon: {
    justifyContent: "flex-end",
    fontSize: 25,
    padding: 10,
    color: dark,
  },
});
