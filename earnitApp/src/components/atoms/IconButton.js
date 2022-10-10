import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { IconFamily } from ".";
import { red } from "./Colors";

const IconButton = ({
  onPress,
  IconFam,
  name,
  size,
  color,
  label,
  lStyle,
  bStyle,
  iStyle,
  cStyle,
}) => {
  return (
    <>
      <View style={[styles.container, cStyle]}>
        <TouchableOpacity onPress={onPress} style={[bStyle, styles.btn]}>
          {IconFam === Ionicons && (
            <Ionicons name={name} size={size} color={color} style={iStyle} />
          )}
          {IconFam === FontAwesome && (
            <FontAwesome name={name} size={size} color={color} style={iStyle} />
          )}
          {IconFam === AntDesign && (
            <AntDesign name={name} size={size} color={color} style={iStyle} />
          )}
          {IconFam === Feather && (
            <Feather name={name} size={size} color={color} style={iStyle} />
          )}
          {IconFam === Entypo && (
            <Entypo name={name} size={size} color={color} style={iStyle} />
          )}
          <Text style={lStyle}>{label}</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};
export default IconButton;

const styles = StyleSheet.create({
  container: {
    display: "flex",
  },
  btn: {
    alignItems: "center",
    alignContent: "center",
    alignSelf: "center",
  },
});
