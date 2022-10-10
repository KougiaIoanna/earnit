import React from "react";
import { StyleSheet, View } from "react-native";
import { Header, HeaderTabNavigator } from "../components/organisms";
import {
  darkGreen,
  purple,
  mostLightGreenEver,
} from "../components/atoms/Colors";
import AddTransactionScreen from "../screens/transaction/AddTransactionScreen";

const AddTransactionNavigator = (props) => {
  const params = props.route.params;
  return (
    <>
      <Header
        back
        title={"New Transaction"}
        navigation={props.navigation}
        headerColor={darkGreen}
      />
      <HeaderTabNavigator
        leftName="Expense"
        rightName="Income"
        LeftComponent={AddTransactionScreen}
        RightComponent={AddTransactionScreen}
        headerColor={darkGreen}
        textColor={mostLightGreenEver}
        params={params}
        height={45}
      />
    </>
  );
};
export default AddTransactionNavigator;
