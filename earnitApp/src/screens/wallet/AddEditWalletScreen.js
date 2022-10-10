import React, { useState } from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import { Header } from "../../components/organisms";
import {
  veryLightGrey,
  darkGreen,
  lightGreen,
  evenLighterGreen,
  grey,
  mostLightGreenEver,
  purple,
} from "../../components/atoms/Colors";
import { useDispatch, useSelector } from "react-redux";
import { FormButton, CustomTextInput } from "../../components/atoms";
import {
  setWalletBalance,
  setWalletName,
  setWalletsList,
} from "../../redux/actions";
import { areFormFieldsFilledOut } from "../../utils/authMethods";

import { LabeledInput } from "../../components/molecules";
import {
  APIRequestCreateWallet,
  APIRequestEditWallet,
  APIRequestGetWallets,
} from "../../services/wallets";

const AddEditWalletScreen = ({ navigation, route }) => {
  const { action } = route.params;
  const { token } = useSelector((state) => state.userReducer);
  let header = {
    headers: { Authorization: token },
  };
  const { walletId, walletName, walletBalance } = useSelector(
    (state) => state.walletReducer
  );
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const saveNewWallet = async () => {
    setIsLoading(true);
    if (areFormFieldsFilledOut([walletName, walletBalance])) {
      const newWallet = { token, walletName, walletBalance };
      APIRequestCreateWallet(newWallet, header, dispatch, navigation);
    }
  };

  const saveEditedWallet = async () => {
    const newWallet = {
      walletName: walletName,
      balance: walletBalance,
    };
    await APIRequestEditWallet(newWallet, walletId);
    await APIRequestGetWallets(header, dispatch);
    navigation.navigate("WalletNavigator");
  };

  return (
    <View>
      <Header
        title={action}
        back
        navigation={navigation}
        headerColor={darkGreen}
      />

      <View style={styles.formContainer}>
        {action === "Edit Wallet" && (
          <>
            <LabeledInput
              label={"Wallet Name"}
              onChangeFunction={(value) => dispatch(setWalletName(value))}
              value={walletName}
            />
            <LabeledInput
              label={"Wallet Balance"}
              onChangeFunction={(value) => dispatch(setWalletBalance(value))}
              value={JSON.stringify(walletBalance)}
              keyboardType={"numeric"}
            />
            <FormButton
              action={"SAVE"}
              onPress={saveEditedWallet}
              color={purple}
            />
          </>
        )}
        {action === "New Wallet" && (
          <>
            <LabeledInput
              label={"Wallet Name"}
              placeholder={"e.x Paypal"}
              onChangeFunction={(value) => dispatch(setWalletName(value))}
            />
            <LabeledInput
              label={"Wallet Balance"}
              placeholder={"e.x 100"}
              onChangeFunction={(value) => dispatch(setWalletBalance(value))}
              keyboardType={"numeric"}
            />
            <View style={styles.button}>
              <FormButton
                action={"SAVE"}
                onPress={saveNewWallet}
                color={purple}
              />
            </View>
          </>
        )}
      </View>
    </View>
  );
};

export default AddEditWalletScreen;

const styles = StyleSheet.create({
  formContainer: {
    backgroundColor: veryLightGrey,
    // marginTop: 50,
    //margin: 20,
    padding: 30,
    paddingTop: 50,
    paddingBottom: 400,
    // borderRadius: 20,
    display: "flex",
  },
  title: {
    paddingBottom: 10,
    color: purple,
    fontWeight: "bold",
  },
  box: {},
  button: {
    paddingTop: 20,
  },
});
