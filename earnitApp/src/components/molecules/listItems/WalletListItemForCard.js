import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  setWalletBalance,
  setWalletId,
  setWalletName,
} from "../../../redux/actions";
import { APIRequestGetTransactionsByWallet } from "../../../services/transactions";
import { dark, lightGrey } from "../../atoms/Colors";

const WalletListItemForCard = ({ item, navigation }) => {
  const { token } = useSelector((state) => state.userReducer);
  let header = {
    headers: { Authorization: token },
  };
  const dispatch = useDispatch();

  const onPressWallet = async () => {
    await APIRequestGetTransactionsByWallet(item.wallet_id, header, dispatch);
    dispatch(setWalletId(item.wallet_id));
    dispatch(setWalletName(item.wallet_name));
    dispatch(setWalletBalance(item.balance));
    navigation.navigate("WalletDetailsScreen");
  };
  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity onPress={onPressWallet}>
        <View style={styles.container}>
          <View style={styles.icon}>
            <FontAwesome name="bank" size={24} color={dark} />
          </View>
          <View>
            <Text style={styles.name}>{item.wallet_name}</Text>
            <Text style={styles.balance}>{item.balance.toFixed(2)}€</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default WalletListItemForCard;

const styles = StyleSheet.create({
  container: {
    // display: "flex",
    flexDirection: "row",
    //flex: 1,
    margin: 5,
    padding: 10,
    borderRadius: 10,
    backgroundColor: lightGrey,
  },
  icon: {
    alignSelf: "center",
    paddingRight: 6,
  },
  name: { color: dark },
  balance: { color: dark },
});
