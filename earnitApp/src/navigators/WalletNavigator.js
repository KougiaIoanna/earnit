import React from "react";
import { HeaderTabNavigator } from "../components/organisms";
import { darkGreen } from "../components/atoms/Colors";
import TransactionsScreen from "../screens/transaction/TransactionsScreen";
import WalletsScreen from "../screens/wallet/WalletsScreen";

const WalletNavigator = () => {
  return (
    <>
      <HeaderTabNavigator
        leftName={"Transactions"}
        rightName={"Wallets"}
        LeftComponent={TransactionsScreen}
        RightComponent={WalletsScreen}
        headerColor={darkGreen}
        textColor={"#fff"}
      />
    </>
  );
};
export default WalletNavigator;
