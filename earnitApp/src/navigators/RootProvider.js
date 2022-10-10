import { Provider } from "react-redux";
import { Store } from "../redux/store";
import RootStackNavigator from "./RootStackNavigator";
import React, { Component } from "react";

const RootProvider = () => {
  return (
    <Provider store={Store}>
      <RootStackNavigator></RootStackNavigator>
    </Provider>
  );
};

export default RootProvider;
