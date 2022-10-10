import React from "react";
import CategoriesScreen from "../screens/category/CategoriesScreen";
import { StyleSheet, View } from "react-native";
import { Header, HeaderTabNavigator } from "../components/organisms";
import {
  darkGreen,
  purple,
  mostLightGreenEver,
} from "../components/atoms/Colors";

const CategoriesNavigator = (props) => {
  return (
    <>
      <Header
        back
        title={"Categories"}
        navigation={props.navigation}
        headerColor={darkGreen}
      />
      <HeaderTabNavigator
        leftName="Spending"
        rightName="Income"
        LeftComponent={CategoriesScreen}
        RightComponent={CategoriesScreen}
        headerColor={darkGreen}
        textColor={mostLightGreenEver}
      />
    </>
  );
};
export default CategoriesNavigator;
