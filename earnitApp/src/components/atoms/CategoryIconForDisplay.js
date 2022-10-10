import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { veryLightPurple } from "./Colors";

const CategoryIconForDisplay = ({ icon }) => {
  return (
    <View style={styles.iconContainer}>
      <Image source={icon} style={styles.categoryIcon} />
    </View>
  );
};

export default CategoryIconForDisplay;

const styles = StyleSheet.create({
  categoryIcon: {
    width: 20,
    height: 20,
  },
  iconContainer: {
    backgroundColor: veryLightPurple,
    // borderRadius
    alignSelf: "center",
    // margin: 7,
    //marginHorizontal: 4,
    padding: 4,
    borderRadius: 20,
  },
});
