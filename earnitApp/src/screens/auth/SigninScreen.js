import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  ImageBackground,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Title } from "react-native-paper";

import {
  FormButton,
  CustomTextInput,
  AuthFormFooter,
} from "../../components/atoms";
import {
  darkGreen,
  veryLightGrey,
  lightBlue,
  lighterPurple,
} from "../../components/atoms/Colors";
import { isFormValidSignin } from "../../utils/authMethods";
import { APICallSignin, APIRequestSignin } from "../../services/auth";
import {
  setUsername,
  setToken,
  setId,
  setIsLoggedin,
  setEmail,
  setPassword,
} from "../../redux/actions";
import { APIRequestGetWallets } from "../../services/wallets";
import {
  APIRequestGetIncomeCategories,
  APIRequestGetSpendingCategories,
} from "../../services/categories";
import {
  APIRequestGetRecurringTransactions,
  APIRequestGetTransactionsByDateRange,
  APIRequestGetTransactionsSums,
} from "../../services/transactions";
import { endOfCurrentDay, startOfCurrentMonth } from "../../utils/timeMethods";
import { APIRequestGetBudgets } from "../../services/budgets";

const image = require("../../../assets/img.jpg");
const { width } = Dimensions.get("window");

const SigninScreen = (props) => {
  const navigation = props.navigation;
  const [hidePassword, setHidePassword] = useState(true);
  const { email, password } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  useEffect(() => {}, []);

  const signin = async () => {
    if (isFormValidSignin({ email, password })) {
      APIRequestSignin(email, password, dispatch).then(async (token) => {
        await setInitialData(token);
        dispatch(setIsLoggedin(true));
      });
    }
  };
  const setInitialData = async (token) => {
    var header = {
      headers: { Authorization: token },
    };
    await APIRequestGetWallets(header, dispatch);
    await APIRequestGetSpendingCategories(header, dispatch);
    await APIRequestGetIncomeCategories(header, dispatch);
    await APIRequestGetTransactionsByDateRange(
      startOfCurrentMonth(),
      endOfCurrentDay(),
      header,
      dispatch,
      "both"
    );
    await APIRequestGetRecurringTransactions(header, dispatch);
    await APIRequestGetTransactionsSums(
      startOfCurrentMonth(),
      endOfCurrentDay(),
      header,
      dispatch
    );
    await APIRequestGetBudgets(header, dispatch);
  };

  return (
    <ScrollView style={styles.container}>
      <ImageBackground source={image} style={styles.img}>
        <View style={styles.header}></View>
        <View style={styles.form}>
          <Title style={[styles.title, { marginBottom: 40 }]}>
            Welcome back to EARNit!
          </Title>
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

          <FormButton
            action="SIGN IN"
            onPress={signin}
            color={lighterPurple}
          ></FormButton>
          {/* <AuthFormFooter
            question="Forgot Password?"
            btn="Click here"
          ></AuthFormFooter> */}
          <AuthFormFooter
            question="Don't have an account?"
            buttonTitle="Sign up"
            navigation={navigation}
            whereTo="Signup"
          ></AuthFormFooter>
        </View>
      </ImageBackground>
    </ScrollView>
  );
};

export default SigninScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: darkGreen,
    flexDirection: "row",
    flex: 1,
  },
  img: {
    width: width,
    top: 0,
    flex: 2,
  },
  title: {
    fontSize: 30,
    color: veryLightGrey,
  },
  header: {
    width: width,
    // paddingLeft: 30,
    // paddingRight: 30,
    //paddingTop: 90,
    //alignItems: "center",
    // borderBottomEndRadius: 40,
    // borderBottomLeftRadius: 40,
    flex: 2,
  },
  textHeader: {
    color: veryLightGrey,
    fontSize: 30,
    fontWeight: "bold",
  },
  form: {
    backgroundColor: darkGreen, //"#33654a", //"#506E54",
    flex: 3,
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 30,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.5,
    // shadowRadius: 20,
    // elevation: 50,
  },
});
