import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, Image } from "react-native";
import { lightGreen, veryLightGrey, veryLightPurple } from "./../Colors";
import { BudgetOverspendButton } from "./BudgetOverspendButton";
import { Title } from "react-native-paper";

const CategoryIconButton = ({ icon, onPress, selected }) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: selected == icon ? veryLightPurple : veryLightGrey },
      ]}
      onPress={onPress}
    >
      <Image source={icon} style={styles.icon} />
    </TouchableOpacity>
  );
};

export default CategoryIconButton;

const styles = StyleSheet.create({
  button: {
    margin: 7,
    marginHorizontal: 4,
    padding: 6,
    borderRadius: 10,
  },
  icon: {
    width: 40,
    height: 40,
  },
  pressed: {
    backgroundColor: lightGreen,
  },
});
