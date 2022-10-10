import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Animated,
} from "react-native";
import { darkGreen, mostLightGreenEver } from "../Colors";
import { Feather } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { IconFamily } from "..";

const RecurringTransactionsButton = ({ onPress, styleWithTopNavigator }) => {
  return (
    <View style={[styles.container, styleWithTopNavigator]}>
      <TouchableOpacity onPress={onPress} style={styles.button}>
        <Feather name={"repeat"} size={25} color={darkGreen} />
      </TouchableOpacity>
    </View>
  );
};
export default RecurringTransactionsButton;

const styles = StyleSheet.create({
  container: {
    //flexDirection: "column",
    //alignSelf: "flex-end",
    //backgroundColor: purple,
    //  width: 60,
    //  height: 60,
    //   position: "absolute",
    //top: 2,
    alignSelf: "center",
    //right: 130,
    backgroundColor: mostLightGreenEver,
    borderRadius: 5,
    marginRight: 5,
    // borderWidth: 1,
    // borderColor: veryLightGrey,
  },
  button: {
    //position: "absolute",
    //alignSelf: "center",
    alignContent: "center",
    justifyContent: "center",
    //  position: "absolute",
    // shadowColor: "#fff",
    shadowOffset: { height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    borderRadius: 16,
    padding: 10,
    //borderColor: grey,
    //borderWidth: 1,
  },
});
