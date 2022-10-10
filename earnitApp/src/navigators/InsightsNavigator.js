import React from "react";
import { HeaderTabNavigator } from "../components/organisms";
import { darkGreen } from "../components/atoms/Colors";
import ChartsScreen from "../screens/insights/ChartsScreen";
import ReportsScreen from "../screens/insights/ReportsScreen";
const WalletNavigator = () => {
  return (
    <>
      <HeaderTabNavigator
        leftName={"Charts"}
        rightName={"Reports"}
        LeftComponent={ChartsScreen}
        RightComponent={ReportsScreen}
        headerColor={darkGreen}
        textColor={"#fff"}
      />
    </>
  );
};
export default WalletNavigator;
