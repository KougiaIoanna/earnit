import React from "react";
import { View, TouchableOpacity, Alert } from "react-native";
import { red } from "./../Colors";
import { FontAwesome5 } from "@expo/vector-icons";

const BudgetOverspendButton = () => {
  return (
    <View style={{ margin: 4 }}>
      <TouchableOpacity
        onPress={() => {
          Alert.alert(
            "Budget Overspend 🙄",
            "Oops! Seems like you spent more than your budget!",
            [{ text: "I'll do better next time" }]
          );
        }}
      >
        <FontAwesome5 name="exclamation-circle" size={25} color={red} />
      </TouchableOpacity>
    </View>
  );
};
export default BudgetOverspendButton;
