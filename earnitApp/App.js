import React, { useEffect } from "react";
import axios from "axios";
import { StatusBar } from "react-native";
import RootProvider from "./src/navigators/RootProvider";
import "react-native-gesture-handler";
import { LogBox } from "react-native";
LogBox.ignoreLogs([
  "VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because it can break windowing and other functionality - use another VirtualizedList-backed container instead",
  "Warning: Failed prop type: Invalid prop `pointerEvents` of type `string` supplied to `G`, expected `function`",
  "`flexWrap: `wrap`` is not supported with the `VirtualizedList` components.Consider using `numColumns` with `FlatList` instead.",
  "VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because it can break windowing and other functionality - use another VirtualizedList-backed container instead.",
  "Require cycle: src/components/Organisms/index.js -> src/components/Organisms/Headers/HeaderTabNavigator.js -> src/screens/Wallets/WalletsScreen.js -> src/components/Organisms/index.js",
  "Require cycle: src/components/Organisms/index.js -> src/components/Organisms/Headers/HeaderTabNavigator.js -> src/screens/Transactions/TransactionsScreen.js -> src/components/Organisms/index.js",
  "Require cycle: src/components/Organisms/index.js -> src/components/Organisms/HomeScreenCards/SummaryCardForHome.js -> src/components/Organisms/index.js",
  "Require cycle: src/components/Organisms/index.js -> src/components/Organisms/Headers/Header.js -> src/navigators/SettingsNavigator.js -> src/screens/Transactions/RecurringTransactionsScreen.js -> src/components/Organisms/index.js",
  "Require cycle: src/components/Organisms/index.js -> src/components/Organisms/Headers/Header.js -> src/navigators/SettingsNavigator.js -> src/navigators/CategoriesNavigator.js -> src/components/Organisms/index.js",
  "Require cycle: src/components/Organisms/index.js -> src/components/Organisms/Headers/Header.js -> src/navigators/SettingsNavigator.js -> src/navigators/CategoriesNavigator.js -> src/screens/Categories/CategoriesScreen.js -> src/components/Organisms/index.js",
  "Require cycle: src/components/Organisms/index.js -> src/components/Organisms/Headers/HeaderTabNavigator.js -> src/screens/Wallets/WalletsScreen.js -> src/components/Organisms/index.js",
  "Require cycle: src/components/atoms/index.js -> src/components/atoms/buttons/RecurringTransactionsButton.js -> src/components/atoms/index.js",
  "Require cycle: src/screens/SettingsScreen.js -> src/components/Organisms/index.js -> src/components/Organisms/Headers/Header.js -> src/navigators/SettingsNavigator.js -> src/screens/SettingsScreen.js",
  "Require cycle: src/components/Molecules/index.js -> src/components/Molecules/ListItems/TransactionListItem.js -> src/components/Molecules/index.js",
  "Require cycle: src/components/Molecules/index.js -> src/components/Molecules/ListItems/UpcomingTransactionsListItem.js -> src/components/Molecules/index.js",
  "Require cycle: src/components/Molecules/index.js -> src/components/Molecules/ListItems/TransactionListItemForCard.js -> src/components/Molecules/index.js",
  "Require cycle: src/components/Organisms/index.js -> src/components/Organisms/Headers/Header.js -> src/navigators/SettingsNavigator.js -> src/screens/Categories/AddEditCategoryScreen.js -> src/components/Organisms/index.js",
  "Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle.",
  "Require cycle: src/components/Organisms/index.js -> src/components/Organisms/Headers/HeaderTabNavigator.js -> src/screens/Transactions/TransactionsScreen.js -> src/components/Organisms/index.js",
  "Deprecation warning: value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are discouraged.",
  "Warning: Each child in a list should have a unique 'key' prop.",
  "Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.",
]);
function App() {
  const fetchApi = async () => {
    axios
      .get("http://192.168.1.9:8000")
      .then((response) => console.log(response.data))
      .catch((error) =>
        console.log(error.message, error.response, "error fetchapi")
      );
  };

  useEffect(() => {
    fetchApi();
  }, []);

  return <RootProvider />;
}

export default App;

