import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TabNavigator from "./BottomTabNavigator";
import SettingsNavigator from "./SettingsNavigator";
import AddEditBudgetScreen from "../screens/budget/AddEditBudgetScreen";
import AddEditCategoryScreen from "../screens/category/AddEditCategoryScreen";
import AddTransactionScreen from "../screens/transaction/AddTransactionScreen";
import AddEditWalletScreen from "../screens/wallet/AddEditWalletScreen";
import AddTransactionNavigator from "./AddTransactionNavigator";
import BudgetDetailsScreen from "../screens/budget/BudgetDetailsScreen";
import EditTransactionScreen from "../screens/transaction/EditTransactionScreen";
import WalletDetailsScreen from "../screens/wallet/WalletDetailsScreen";
import RecurringTransactionsScreen from "../screens/transaction/RecurringTransactionsScreen";
import AddEditGoalScreen from "../screens/goal/AddEditGoalScreen";
import GoalDetailsScreen from "../screens/goal/GoalDetailsScreen";
import ReportsScreen from "../screens/insights/ReportsScreen";
import MonthlyReportScreen from "../screens/insights/MonthlyReportScreen";
const AppNavigator = () => {
  const App = createStackNavigator();
  return (
    <App.Navigator
      initialRouteParams="HomeScreen"
      screenOptions={{
        headerShown: false,
      }}
    >
      <App.Screen name="HomeScreen" component={TabNavigator} />
      <App.Screen name="SettingsNavigator" component={SettingsNavigator} />
      <App.Screen
        name="AddTransactionNavigator"
        component={AddTransactionNavigator}
      />
      <App.Screen name="AddEditBudgetScreen" component={AddEditBudgetScreen} />
      <App.Screen name="AddEditGoalScreen" component={AddEditGoalScreen} />
      <App.Screen
        name="EditTransactionScreen"
        component={EditTransactionScreen}
      />
      <App.Screen name="AddEditWalletScreen" component={AddEditWalletScreen} />
      <App.Screen name="BudgetDetailsScreen" component={BudgetDetailsScreen} />
      <App.Screen name="WalletDetailsScreen" component={WalletDetailsScreen} />
      <App.Screen
        name="RecurringTransactionsScreen"
        component={RecurringTransactionsScreen}
      />
      <App.Screen name="GoalDetailsScreen" component={GoalDetailsScreen} />
      <App.Screen name="MonthlyReportScreen" component={MonthlyReportScreen} />
    </App.Navigator>
  );
};
export default AppNavigator;
