import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { mostLightGreenEver } from "../../atoms/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  setWalletBalance,
  setWalletName,
  setWalletId,
} from "../../../redux/actions";
import { DeleteButton, EditButton } from "../../atoms";
import {
  APIRequestDeleteWallet,
  APIRequestGetWallets,
} from "../../../services/wallets";
import { APIRequestGetTransactionsByWallet } from "../../../services/transactions";

const WalletListItem = ({ item, navigation }) => {
  const { token } = useSelector((state) => state.userReducer);
  const { walletsList } = useSelector((state) => state.walletReducer);
  let header = {
    headers: { Authorization: token },
  };
  const dispatch = useDispatch();
  const entity = "Wallet";

  const onPressEdit = () => {
    dispatch(setWalletId(item.wallet_id));
    dispatch(setWalletName(item.wallet_name));
    dispatch(setWalletBalance(item.balance));
    navigation.navigate("AddEditWalletScreen", {
      action: "Edit Wallet",
    });
  };

  const onPressDelete = async () => {
    await APIRequestDeleteWallet(item.wallet_id, header, dispatch, navigation);
  };

  const onPressWallet = async () => {
    await APIRequestGetTransactionsByWallet(item.wallet_id, header, dispatch);
    dispatch(setWalletId(item.wallet_id));
    dispatch(setWalletName(item.wallet_name));
    dispatch(setWalletBalance(item.balance));
    navigation.navigate("WalletDetailsScreen");
  };

  return (
    <View style={styles.outerBox}>
      <FontAwesome name="bank" size={24} color="black" style={styles.icon} />
      <TouchableOpacity style={styles.textBox} onPress={onPressWallet}>
        <Text style={styles.name}>{item.wallet_name}</Text>
        <Text style={styles.wallet_balance}>Balance: {item.balance} €</Text>
      </TouchableOpacity>
      <EditButton onPress={onPressEdit} />

      <DeleteButton onPress={onPressDelete} />
    </View>
  );
};
export default WalletListItem;

const styles = StyleSheet.create({
  outerBox: {
    backgroundColor: mostLightGreenEver,
    margin: 10,
    borderRadius: 5,
    padding: 10,
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  icon: {
    alignSelf: "center",
    marginRight: 10,
  },
  img: {
    width: 50,
    height: 50,
    borderRadius: 0,
    marginRight: 10,
  },
  textBox: { flex: 1 },

  name: {
    fontWeight: "bold",
    fontSize: 20,
  },
  wallet_balance: {
    color: "#304232",
  },
});
