import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import HomeScreen from "../screens/HomeScreen";
import AddTransactionScreen from "../screens/transaction/AddTransactionScreen";
import SettingsScreen from "../screens/SettingsScreen";
import {
  darkGreen,
  lightGreen,
  purple,
  tan,
  veryLightGrey,
} from "../components/atoms/Colors";
const Tab = createBottomTabNavigator();
import { Ionicons, AntDesign } from "@expo/vector-icons";
import EnvelopeNavigator from "./EnvelopeNavigator";
import WalletNavigator from "./WalletNavigator";
import { StyleSheet, View, Text } from "react-native";
import { FormButton } from "../components/atoms";
import { AddTransactionButton } from "../components/organisms";
import ChartsScreen from "../screens/insights/ChartsScreen";
import InsightsNavigator from "./InsightsNavigator";
const TabNavigator = () => {
  const iconColorFocused = darkGreen;
  const iconColorUnfoccused = purple;

  const tabBarIcon = (screen, focused) => {
    if (screen == "AddTransaction") {
      return (
        <AntDesign
          name={focused ? "pluscircle" : "pluscircleo"}
          size={1}
          color={focused ? lightGreen : purple}
        />
      );
    }
    var iconFocused = "";
    var iconUnfocused = "";
    switch (screen) {
      case "Home":
        iconFocused = "home";
        iconUnfocused = "home-outline";
        break;
      case "Budgets":
        iconFocused = "mail";
        iconUnfocused = "mail-outline";
        break;
      case "Wallets":
        iconFocused = "wallet";
        iconUnfocused = "wallet-outline";
        break;
      case "Insights":
        iconFocused = "pie-chart";
        iconUnfocused = "pie-chart-outline";
        break;
      default:
        break;
    }
    return (
      <Ionicons
        name={focused ? iconFocused : iconUnfocused}
        size={28}
        color={focused ? iconColorFocused : iconColorUnfoccused}
      />
    );
  };

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: veryLightGrey,
          position: "absolute",
          elevation: 30,
          height: 60,
          zIndex: 0,
        },
        headerTitleStyle: {
          fontWeight: "bold",
        },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => tabBarIcon("Home", focused),
        }}
      />
      <Tab.Screen
        name="EnvelopeNavigator"
        component={EnvelopeNavigator}
        options={{
          tabBarIcon: ({ focused }) => tabBarIcon("Budgets", focused),
        }}
      />

      <Tab.Screen
        name="WalletNavigator"
        component={WalletNavigator}
        options={{
          tabBarIcon: ({ focused }) => tabBarIcon("Wallets", focused),
        }}
      />
      <Tab.Screen
        name="InsightsNavigator"
        component={InsightsNavigator}
        options={{
          tabBarIcon: ({ focused }) => tabBarIcon("Insights", focused),
        }}
      />
    </Tab.Navigator>
  );
};
export default TabNavigator;

const styles = StyleSheet.create({
  onPress: {
    position: "absolute",
    flex: 1,
  },
  button: {
    width: 10,
    height: 10,
  },
});
