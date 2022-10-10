import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { veryLightGrey, purple } from "../atoms/Colors";
import { CustomTextInput } from "../atoms";

const LabeledInput = ({
  label,
  placeholder,
  onChangeFunction,
  secureTextEntry,
  hidePassword,
  setHidePassword,
  isPassword,
  value,
  number,
  width,
  onFocus,
  keyboardType,
}) => {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <CustomTextInput
        placeholder={placeholder}
        onChangeFunction={onChangeFunction}
        secureTextEntry={secureTextEntry}
        hidePassword={hidePassword}
        setHidePassword={setHidePassword}
        isPassword={isPassword}
        value={value}
        number={number}
        keyboardType={keyboardType}
        width={width}
        onFocus={onFocus}
      />
    </View>
  );
};

export default LabeledInput;

const styles = StyleSheet.create({
  label: {
    paddingBottom: 10,
    color: purple,
    fontWeight: "bold",
    fontSize: 15,
  },
});
