import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Alert, StyleSheet, TouchableOpacity, View } from "react-native";
import { blue, dimmedRed, lightBlue, veryLightPurple, purple } from "../Colors";

const NotificationButton = ({ navigation, when }) => {
  const onPress = () => {
    if (when === "today") {
      Alert.alert(
        "💰 Payment due today",
        "Check your upcomming planned transactions to confirm or dismiss the transaction.",
        [
          {
            text: "Later",
          },
          {},
          {
            text: "Show me!",
            onPress: () => {
              navigation.navigate("RecurringTransactionsScreen");
            },
          },
        ]
      );
    } else {
      Alert.alert(
        "‼️ Payment overdue",
        "Check your upcomming planned transactions to confirm or dismiss the transaction!",
        [
          {
            text: "Later",
          },
          {},
          {
            text: "Show me!",
            onPress: () => {
              navigation.navigate("RecurringTransactionsScreen");
            },
          },
        ]
      );
    }
  };
  return (
    <View style={styles.button}>
      <TouchableOpacity onPress={onPress}>
        <MaterialIcons
          name="notification-important"
          size={33}
          color={when === "today" ? veryLightPurple : dimmedRed}
        />
      </TouchableOpacity>
    </View>
  );
};
export default NotificationButton;

const styles = StyleSheet.create({
  button: {
    shadowColor: "#fff",
    shadowOffset: { height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    borderRadius: 15,
    marginTop: 5,
    marginLeft: 5,
  },
});
