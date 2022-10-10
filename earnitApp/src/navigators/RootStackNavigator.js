import { Provider, useSelector } from "react-redux";
import { Store } from "../redux/store";
import { NavigationContainer } from "@react-navigation/native";
import React, { Component } from "react";
import AuthNavigator from "./AuthNavigator";
import AppNavigator from "./AppNavigator";

const RootStackNavigator = () => {
  const { isLoggedin } = useSelector((state) => state.userReducer);
  return (
    <NavigationContainer>
      {isLoggedin === false && <AuthNavigator />}
      {isLoggedin === true && <AppNavigator />}
    </NavigationContainer>
  );
};

export default RootStackNavigator;
