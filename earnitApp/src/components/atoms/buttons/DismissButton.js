import { Feather } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { red } from "../Colors";

const DismissButton = ({ onPressDismiss }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        onPressDismiss();
      }}
    >
      <Feather name="x" size={20} color={red} />
    </TouchableOpacity>
  );
};
export default DismissButton;
