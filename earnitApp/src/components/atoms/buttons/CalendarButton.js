import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import {
  dark,
  darkGreen,
  darkGrey,
  lightBlue,
  lighterPurple,
  mostLightGreenEver,
  purple,
  veryLightGrey,
} from "./../Colors";
import { AntDesign } from "@expo/vector-icons";

const CalendarButton = ({ onPress, styleWithTopNavigator, style }) => {
  return (
    <View style={[styles.container, styleWithTopNavigator, style]}>
      <TouchableOpacity onPress={onPress} style={styles.button}>
        <AntDesign name={"calendar"} size={27} color={darkGreen} />
      </TouchableOpacity>
    </View>
  );
};
export default CalendarButton;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignSelf: "flex-end",
    // width: 45,
    // height: 45,
    display: "flex",
    backgroundColor: mostLightGreenEver,
    borderRadius: 5,
    marginLeft: 5,
    //borderWidth: 1,
    // borderColor: veryLightGrey,
  },
  button: {
    alignSelf: "center",
    // shadowColor: "#fff",
    shadowOffset: { height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    borderRadius: 16,
    padding: 10,
  },
});
