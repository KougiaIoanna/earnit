import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { mostLightGreenEver } from "../Colors";

const GoBackButton = ({ navigation }) => {
  return (
    <View
      style={{
        marginHorizontal: 16,
        flexDirection: "row",
        alignSelf: "center",
      }}
    >
      <View style={{ display: "flex" }}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={[styles.btn]}
        >
          <Ionicons name={"arrow-back"} size={25} color={mostLightGreenEver} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default GoBackButton;
const styles = StyleSheet.create({
  container: {
    display: "flex",
  },
  btn: {
    alignItems: "center",
    alignContent: "center",
    alignSelf: "center",
    flexDirection: "row",
    alignSelf: "center",
  },
});
