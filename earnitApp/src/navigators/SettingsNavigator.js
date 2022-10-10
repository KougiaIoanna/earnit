import { createStackNavigator } from "@react-navigation/stack";
import React, { Component } from "react";
import { useSelector } from "react-redux";
import SettingsScreen from "../screens/SettingsScreen";
import AddEditCategoryScreen from "../screens/category/AddEditCategoryScreen";
import CategoriesNavigator from "./CategoriesNavigator";
import RecurringTransactionsScreen from "../screens/transaction/RecurringTransactionsScreen";
import ReachedGoalsScreen from "../screens/goal/ReachedGoalsScreen";

const Stack = createStackNavigator();

const SettingsNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
      <Stack.Screen name="ReachedGoalsScreen" component={ReachedGoalsScreen} />
      <Stack.Screen
        name="CategoriesNavigator"
        component={CategoriesNavigator}
      />
      <Stack.Screen
        name="AddEditCategoryScreen"
        component={AddEditCategoryScreen}
      />
    </Stack.Navigator>
  );
};

export default SettingsNavigator;
