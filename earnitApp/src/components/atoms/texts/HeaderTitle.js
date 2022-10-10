import React from "react";
import { View } from "react-native";
import { Title } from "react-native-paper";
import { mostLightGreenEver } from "../Colors";

const HeaderTitle = ({ title }) => {
  return (
    <View style={{ flexDirection: "row", flex: 1 }}>
      <Title style={{ color: mostLightGreenEver, fontSize: 18 }}>{title}</Title>
    </View>
  );
};
export default HeaderTitle;
