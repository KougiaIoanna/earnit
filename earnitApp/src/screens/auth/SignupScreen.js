import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Dimensions,
  ImageBackground,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Title } from "react-native-paper";

import {
  FormButton,
  CustomTextInput,
  AuthFormFooter,
} from "../../components/atoms";
import {
  darkGreen,
  lighterPurple,
  veryLightGrey,
} from "../../components/atoms/Colors";
import { isFormValidSignup } from "../../utils/authMethods";
import { APIRequestSignin, APIRequestSignup } from "../../services/auth";
import {
  setUsername,
  setToken,
  setId,
  setIsLoggedin,
  setConfirmPassword,
  setEmail,
  setPassword,
} from "../../redux/actions";

const image = require("../../../assets/img.jpg");
const { width } = Dimensions.get("window");

const SignupScreen = (props) => {
  const navigation = props.navigation;
  const [hidePassword, setHidePassword] = useState(true);
  const { username, email, password, confirmPassword } = useSelector(
    (state) => state.userReducer
  );
  const dispatch = useDispatch();
  useEffect(() => {}, []);

  const signup = async () => {
    if (isFormValidSignup({ username, email, password, confirmPassword })) {
      APIRequestSignup(email, username, password, confirmPassword, dispatch);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <ImageBackground source={image} style={styles.img}>
        <View style={styles.header}></View>
        <View style={styles.form}>
          <Title style={styles.title}>
            Welcome to EARNit! Create an account to get started
          </Title>
          <CustomTextInput
            placeholder="Username"
            onChangeFunction={(value) => dispatch(setUsername(value))}
          ></CustomTextInput>
          <CustomTextInput
            placeholder="Email"
            onChangeFunction={(value) => dispatch(setEmail(value))}
          ></CustomTextInput>
          <CustomTextInput
            placeholder="Password"
            onChangeFunction={(value) => dispatch(setPassword(value))}
            secureTextEntry={hidePassword}
            hidePassword={hidePassword}
            setHidePassword={setHidePassword}
            isPassword={true}
          ></CustomTextInput>
          <CustomTextInput
            placeholder="Confirm Password"
            onChangeFunction={(value) => dispatch(setConfirmPassword(value))}
            secureTextEntry={hidePassword}
            hidePassword={hidePassword}
            setHidePassword={setHidePassword}
            isPassword={true}
          ></CustomTextInput>
          <FormButton
            action="CREATE ACCOUNT"
            onPress={signup}
            color={lighterPurple}
          ></FormButton>

          <AuthFormFooter
            question="Already have an account?"
            buttonTitle="Sign in"
            navigation={navigation}
            whereTo="Signin"
          ></AuthFormFooter>
        </View>
      </ImageBackground>
    </ScrollView>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: darkGreen,
    flexDirection: "row",
    // flex: 1,
  },
  img: {
    width: width,
    top: 0,
    flex: 2,
  },
  header: {
    width: width,
    flex: 2,
  },
  title: {
    fontSize: 30,
    color: veryLightGrey,
    marginBottom: 30,
  },
  textHeader: {
    color: veryLightGrey,
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 90,
    // backgroundColor: "#a19e99",
    borderRadius: 20,
    marginHorizontal: 20,
  },
  form: {
    backgroundColor: darkGreen,
    flex: 5,
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 20,
    //alignContent: "flex-end",
    //position: "relative",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.5,
    // shadowRadius: 20,
    // elevation: 50,
  },
});
