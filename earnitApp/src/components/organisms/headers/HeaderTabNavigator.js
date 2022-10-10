import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from "react";
import TransactionsScreen from "../../../screens/transaction/TransactionsScreen";
import WalletsScreen from "../../../screens/wallet/WalletsScreen";
import {
  dark,
  darkGreen,
  evenLighterGreen,
  grey,
  lighterPurple,
  lightGreen,
  mostLightGreenEver,
  purple,
  tan,
  veryLightGrey,
} from "../../atoms/Colors";
import { StyleSheet, View } from "react-native";

const HeaderTab = createMaterialTopTabNavigator();
const HeaderTabNavigator = ({
  leftName,
  rightName,
  LeftComponent,
  RightComponent,
  headerColor,
  textColor,
  transactionsList,
  params,
  height,
}) => {
  return (
    <>
      <HeaderTab.Navigator
        screenOptions={{
          tabBarStyle: {
            backgroundColor: headerColor,
            height: height ? height : 60,
            justifyContent: "center",
            shadowColor: dark,
            // shadowOffset: { width: 0, height: 2 },
            // shadowOpacity: 0.5,
            // shadowRadius: 5,
            // elevation: 20,

            //opacity: 0.8,
          },
          tabBarLabelStyle: {
            fontSize: 16,
            fontWeight: "bold",
            //backgroundColor: darkGreen,
            // color: veryLightGrey,
            //padding: 5,
            borderRadius: 10,
          },

          tabBarActiveTintColor: veryLightGrey,
          //tabBarScrollEnabled: false,
          tabBarIndicatorStyle: {
            borderBottomWidth: 3,
            borderBottomColor: veryLightGrey,
            borderRadius: 5,
          },
        }}
      >
        <HeaderTab.Screen
          name={leftName}
          component={LeftComponent}
          transactionsList={transactionsList}
          initialParams={params}
        />
        <HeaderTab.Screen
          name={rightName}
          component={RightComponent}
          initialParams={params}
        />
      </HeaderTab.Navigator>
    </>
  );
};
export default HeaderTabNavigator;
const styles = StyleSheet.create({});
