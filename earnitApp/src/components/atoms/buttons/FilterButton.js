import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { veryLightGrey, grey } from "./../Colors";
import { AntDesign } from "@expo/vector-icons";

const FilterButton = ({ onPress, styleWithTopNavigator, style }) => {
  return (
    <View style={[styles.container, styleWithTopNavigator, style]}>
      <TouchableOpacity onPress={onPress} style={styles.button}>
        <AntDesign name={"filter"} size={20} color={veryLightGrey} />
      </TouchableOpacity>
    </View>
  );
};
export default FilterButton;

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    marginLeft: 10,
  },
  button: {
    alignContent: "center",
    justifyContent: "center",
    shadowColor: "#fff",
    shadowOffset: { height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    borderRadius: 16,
    padding: 10,
    borderColor: grey,
    borderWidth: 1,
  },
});
