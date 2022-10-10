import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import {
  lightGreen,
  purple,
  darkerGreen,
  veryLightGrey,
} from "../../components/atoms/Colors";
import { ImageBackground } from "react-native";
import { useSelector, useReducer, useDispatch } from "react-redux";
import { setWalletsList, setWalletsForDropdown } from "../../redux/actions";
import { AddEntityButton } from "../../components/atoms";
const { width } = Dimensions.get("window");
import { TransferModal, WalletList } from "../../components/organisms";
import { APIRequestGetWallets } from "../../services/wallets";
import { makeWalletsForDropdown } from "../../utils/transactionMethods";
import client from "../../services/client";

const WalletsScreen = (props) => {
  const { token } = useSelector((state) => state.userReducer);
  let header = {
    headers: { Authorization: token },
  };
  const { walletId, walletsList, walletName, walletBalance } = useSelector(
    (state) => state.walletReducer
  );
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    let active = true;
    // makeWalletsForDropdown(walletsList);
    const fetchData = async () => {
      setIsLoading(true);
      const res = await client.get("/wallet", header);
      if (active) {
        dispatch(setWalletsList(res.data.message.data));
        setIsLoading(false);
      }
    };
    fetchData();
    return () => {
      active = false;
    };
  }, [walletName, walletBalance]);

  useEffect(() => {
    fetchData();
  }, [walletName, walletBalance]);

  const fetchData = async () => {
    setIsLoading(true);
    APIRequestGetWallets(header, dispatch);
    setIsLoading(false);
  };
  const [visible, setVisible] = useState(false);

  const [selectedButton, setSelectedButton] = useState("month");

  const showModal = () => {
    setVisible(true);
  };
  

  return (
    <View style={styles.container}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <AddEntityButton
          action={"ADD WALLET"}
          onPress={() => {
            props.navigation.navigate("AddEditWalletScreen", {
              action: "New Wallet",
            });
          }}
        />
        {/* <AddEntityButton action={" TRANSFER "} onPress={showModal} /> */}
      </View>

      {isLoading ? (
        <ActivityIndicator size="large" color={darkerGreen} />
      ) : (
        <>
          <WalletList width={width} props={props} />
        </>
      )}
      <TransferModal visible={visible} setVisible={setVisible} />
    </View>
  );
};

export default WalletsScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: veryLightGrey,
  },
});
