import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { red } from "../Colors";

const MarkAsPaidButton = ({ onPressMarkAsPaid }) => {
  return (
    <View style={styles.paid}>
      <TouchableOpacity
        style={{}}
        onPress={() => {
          onPressMarkAsPaid();
        }}
      >
        <Text style={{ color: "#fff" }}>Mark as paid</Text>
      </TouchableOpacity>
    </View>
  );
};
export default MarkAsPaidButton;
const styles = StyleSheet.create({
  paid: {
    backgroundColor: red,
    opacity: 0.9,
    paddingHorizontal: 4,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
    alignSelf: "center",
  },
});
