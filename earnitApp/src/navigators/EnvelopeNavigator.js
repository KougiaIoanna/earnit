import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { HeaderTabNavigator } from "../components/organisms";
import BudgetsScreen from "../screens/budget/BudgetsScreen";
import GoalsScreen from "../screens/goal/GoalsScreen";
import {
  dark,
  darkerGreen,
  darkGreen,
  lightGreen,
  mostLightGreenEver,
} from "../components/atoms/Colors";
import AddEditBudgetScreen from "../screens/budget/AddEditBudgetScreen";

const EnvelopeNavigator = () => {
  return (
    <>
      <HeaderTabNavigator
        leftName="Budgets"
        rightName="Goals"
        LeftComponent={BudgetsScreen}
        RightComponent={GoalsScreen}
        headerColor={darkGreen}
        textColor={mostLightGreenEver}
      />
    </>
  );
};
export default EnvelopeNavigator;
