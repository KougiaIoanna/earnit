import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { mostLightGreenEver, purple } from "./../Colors";
import { AntDesign } from "@expo/vector-icons";

const AddEntityButton = ({ onPress, action }) => {
  return (
    <View style={styles.button}>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.buttonText}>{action}</Text>
      </TouchableOpacity>
    </View>
  );
};
export default AddEntityButton;

const styles = StyleSheet.create({
  button: {
    alignSelf: "center",
    height: 40,
    backgroundColor: purple,
    borderRadius: 20,
    paddingHorizontal: 10,
    marginVertical: 10,
    paddingHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
  },
  buttonText: {
    alignSelf: "center",
    color: mostLightGreenEver,
    paddingTop: 10,
  },
});
