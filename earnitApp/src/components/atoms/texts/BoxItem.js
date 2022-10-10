import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { mostLightGreenEver, lightGrey } from "../Colors";

const BoxItem = ({ label, value, backgroundStyle, labelStyle }) => {
  return (
    <View style={[styles.overviewItem, backgroundStyle]}>
      <View style={styles.label}>
        <Text style={[styles.text, labelStyle]}>{label}</Text>
      </View>
      <View style={styles.value}>
        {isNaN(value) ? (
          <Text style={[styles.text, labelStyle]}>{value}</Text>
        ) : (
          <Text style={[styles.text, labelStyle]}>{value}€</Text>
        )}
      </View>
    </View>
  );
};

export default BoxItem;

const styles = StyleSheet.create({
  overviewItem: {
    marginTop: 7,
    borderRadius: 5,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  label: {
    borderBottomColor: lightGrey,
    borderBottomWidth: 1,
    padding: 4,
    alignSelf: "center",
  },
  value: {
    paddingTop: 4,
    paddingHorizontal: 4,
    alignSelf: "center",
  },
  text: {
    fontSize: 17,
    color: mostLightGreenEver,
  },
});
