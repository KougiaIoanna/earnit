import { Entypo } from "@expo/vector-icons";
import React from "react";
import { mostLightGreenEver } from "../Colors";
import { StyleSheet, TouchableOpacity, View } from "react-native";
const SettingsButton = ({ navigation }) => {
  return (
    <View style={[styles.container]}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("SettingsNavigator");
        }}
        style={[styles.btn]}
      >
        <Entypo
          name="dots-three-vertical"
          size={24}
          color={mostLightGreenEver}
        />
        {/* <Text style={lStyle}>{label}</Text> */}
      </TouchableOpacity>
    </View>
  );
};
export default SettingsButton;
const styles = StyleSheet.create({
  container: {
    display: "flex",
    paddingRight: 20,
    paddingTop: 5,
  },
  btn: {
    alignItems: "center",
    alignContent: "center",
    alignSelf: "center",
    flexDirection: "row",
    alignSelf: "center",
    paddingLeft: 10,
  },
});
