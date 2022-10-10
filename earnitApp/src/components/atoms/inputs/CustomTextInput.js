import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { dark, mostLightGreenEver } from "./../Colors";

const CustomTextInput = ({
  placeholder,
  onChangeFunction,
  secureTextEntry,
  hidePassword,
  setHidePassword,
  isPassword,
  value,
  number,
  onFocus,
  width,
  keyboardType,
}) => {
  return (
    <View
      style={[styles.inputContainer, { marginRight: number, width: width }]}
    >
      <TextInput
        placeholder={placeholder}
        style={styles.textInput}
        defaultValue={value}
        onChangeText={onChangeFunction}
        secureTextEntry={secureTextEntry}
        autoCapitalize="none"
        onFocus={onFocus}
        keyboardType={keyboardType}
      ></TextInput>
      {isPassword && (
        <TouchableOpacity
          style={styles.eye}
          onPress={() => {
            setHidePassword(!hidePassword);
          }}
        >
          <Ionicons
            name={hidePassword ? "md-eye-off" : "md-eye"}
            size={25}
            color={dark}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  inputContainer: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: mostLightGreenEver,
    height: 40,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },

  textInput: {
    flex: 1,
  },
  eye: {
    alignContent: "flex-end",
    alignSelf: "center",
  },
});
