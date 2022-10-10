import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  dark,
  darkGreen,
  mostLightGreenEver,
  purple,
  teal,
  veryLightGrey,
} from "../../components/atoms/Colors";
import {
  Header,
  WalletHeader,
  TransactionList,
} from "../../components/organisms";
import { useSelector, useDispatch } from "react-redux";
import { BoxItem, EntityTitle } from "../../components/atoms";
import { FontAwesome } from "@expo/vector-icons";

const WalletDetailsScreen = (props) => {
  const { walletId, walletName, walletBalance } = useSelector(
    (state) => state.walletReducer
  );
  const { transactionsByWallet } = useSelector(
    (state) => state.transactionReducer
  );
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  return (
    <View>
      <Header
        title={"Wallet details"}
        back
        headerColor={darkGreen}
        navigation={props.navigation}
      />

      <View style={styles.header}>
        <EntityTitle
          name={walletName + ", " + walletBalance + "€"}
          entity={"wallet"}
        />
      </View>

      <TransactionList props={props} transactionsList={transactionsByWallet} />
    </View>
  );
};

export default WalletDetailsScreen;
const styles = StyleSheet.create({
  formContainer: {
    marginTop: 50,
    margin: 20,
    padding: 10,
    borderRadius: 20,
  },
  title: {
    paddingBottom: 10,
    color: purple,
    fontWeight: "bold",
  },
  header: {
    backgroundColor: darkGreen,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    display: "flex",
    flexDirection: "row",
    // alignItems: "center",
    justifyContent: "space-between",
    paddingRight: 40,
    marginBottom: 10,
    shadowColor: dark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
    paddingBottom: 10,
  },
  box: {
    backgroundColor: veryLightGrey,
  },
  label: {
    color: dark,
  },
});
