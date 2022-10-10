import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { veryLightGrey, lightGreen } from "../Colors";

const AuthFormFooter = ({ question, buttonTitle, navigation, whereTo }) => {
  return (
    <View style={styles.footer}>
      <Text style={styles.already}>{question}</Text>
      <TouchableOpacity
        style={styles.buttonSignin}
        onPress={() => navigation.navigate(whereTo)}
      >
        <Text style={styles.buttonSignin}>{buttonTitle}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AuthFormFooter;

const styles = StyleSheet.create({
  footer: {
    display: "flex",
    justifyContent: "flex-start",
    color: veryLightGrey,
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 7,
  },
  already: {
    color: veryLightGrey,
    marginRight: 5,
  },

  buttonSignin: {
    color: lightGreen,
    fontWeight: "bold",
  },
});
