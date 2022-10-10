import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text } from "react-native";
import { grey } from "../Colors";

const DateRangeText = ({ title }) => {
  return (
    <>
      {title.includes("/") ? (
        <>
          <Text style={[styles.period]}>{title.substring(0, 8)}</Text>
          <MaterialIcons name="arrow-right-alt" size={29} color={grey} />
          <Text style={[styles.period]}>{title.substring(11, 19)}</Text>
        </>
      ) : (
        <Text style={[styles.period, { marginHorizontal: 10 }]}>{title}</Text>
      )}
    </>
  );
};
export default DateRangeText;
const styles = StyleSheet.create({
  period: {
    color: grey,
    fontSize: 20,
    marginBottom: 4,
    alignItems: "center",
  },
});
