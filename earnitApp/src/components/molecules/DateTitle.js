import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { red } from "../atoms/Colors";
import { Feather } from "@expo/vector-icons";
import moment from "moment";
import { makeTitleForRecurringTransactions } from "../../utils/transactionMethods";
import { DismissButton, MarkAsPaidButton } from "../atoms";

const DateTitle = ({
  date,
  style,
  onPressMarkAsPaid,
  onPressDismiss,
  upcoming,
}) => {
  var title = makeTitleForRecurringTransactions(date);
  if (upcoming) {
    return (
      <View style={[styles.date, style]}>
        <Text>{title}</Text>
        {title === "Due today" || moment(date).fromNow().includes("ago") ? (
          <MarkAsPaidButton onPressMarkAsPaid={onPressMarkAsPaid} />
        ) : null}
        <DismissButton onPressDismiss={onPressDismiss} />
      </View>
    );
  } else {
    return (
      <View style={[styles.date, style]}>
        <Text>{date}</Text>
      </View>
    );
  }
};

export default DateTitle;

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
  },
  date: {
    backgroundColor: "#c8c8c8",
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 5,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    margin: 0,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 5,
  },
});
