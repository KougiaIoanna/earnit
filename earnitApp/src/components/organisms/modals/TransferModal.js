import React, { useState } from "react";
import { Modal, Portal, Text, Button, Provider } from "react-native-paper";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import {
  dark,
  purple,
  veryLightGrey,
  grey,
  blue,
  lighterPurple,
  lightBlue,
} from "../../atoms/Colors";
import {
  CalendarButton,
  CalendarModalButton,
  CustomDropdown,
} from "../../atoms";
import {
  CalendarModalDateRangeButtons,
  CustomDatePicker,
  LabeledInput,
} from "../../molecules";
import { useDispatch } from "react-redux";
import moment from "moment";
import { fullDate } from "../../../utils/timeMethods";
import { FontAwesome } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { setTransactionsList, setWalletsList } from "../../../redux/actions";
import client from "../../../services/client";

const TransferModal = ({ visible, setVisible, listOfAccounts }) => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.userReducer);
  let header = {
    headers: { Authorization: token },
  };
  const { walletsForDropdown } = useSelector((state) => state.walletReducer);

  // const [visible, setVisible] = useState(false);

  const [selectedButton, setSelectedButton] = useState("month");
  const [selectedFrom, setSelectedFrom] = useState();
  const [selectedTo, setSelectedTo] = useState();
  const [transferAmount, setTransferAmount] = useState();

  const showModal = () => setVisible(true);
  const hideModal = () => {
    setVisible(false);
    //setSelectedButton("month");
  };

  const containerStyle = {
    margin: 10,
    backgroundColor: veryLightGrey,
    top: -80,
    borderRadius: 20,
  };

  const onPress = async () => {
    client
      .get("/wallet/" + JSON.stringify(selectedFrom), header)
      .then((walletFrom) => {
        let oldBalance = walletFrom.data.message.data[0].balance;
        client
          .patch(
            "/wallet/" + JSON.stringify(selectedFrom),
            { balance: oldBalance - transferAmount },
            header
          )
          .then(() => {
            client
              .get("/wallet/" + JSON.stringify(selectedTo), header)
              .then((walletTo) => {
                let oldBalance = walletTo.data.message.data[0].balance;
                client
                  .patch(
                    "/wallet/" + JSON.stringify(selectedTo),
                    { balance: oldBalance + transferAmount },
                    header
                  )
                  .then(() => {
                    client.get("/wallet", header).then((res) => {
                      dispatch(setWalletsList(res.data.message.data));
                    });
                  });
              });
          });
      });
    hideModal();
  };

  return (
    <Provider>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}
        >
          <View style={styles.header}>
            <Text style={styles.title}>Transfer Between Wallets</Text>
          </View>
          <View style={styles.formContainer}>
            <LabeledInput
              label={"Amount"}
              keyboardType={"numeric"}
              onChangeFunction={(value) => {
                setTransferAmount(value);
              }}
            />
            <Text style={styles.fromtoText}>From</Text>
            <CustomDropdown
              data={walletsForDropdown}
              placeholder={"Select Wallet"}
              selected={selectedFrom}
              setSelected={setSelectedFrom}
            />
            <Text style={styles.fromtoText}>To</Text>
            <CustomDropdown
              data={walletsForDropdown}
              placeholder={"Select Wallet"}
              selected={selectedTo}
              setSelected={setSelectedTo}
            />
          </View>

          <View style={styles.ok}>
            <TouchableOpacity onPress={onPress}>
              <FontAwesome name="check" size={35} color={blue} />
            </TouchableOpacity>
          </View>
        </Modal>
      </Portal>
    </Provider>
  );
};

export default TransferModal;

const styles = StyleSheet.create({
  header: {
    backgroundColor: lighterPurple,
    // width: 300,
    //height: 50,
    paddingVertical: 5,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  title: {
    color: veryLightGrey,
    fontSize: 25,
    alignSelf: "center",
    alignItems: "baseline",
  },

  ok: {
    marginTop: 4,
    alignSelf: "center",
    paddingBottom: 5,
  },
  okext: {
    fontSize: 30,
    color: lighterPurple,
  },
  formContainer: {
    marginHorizontal: 20,
    marginTop: 10,
    padding: 10,
    borderRadius: 20,
    borderBottomColor: grey,
    borderBottomWidth: 1,
  },
  fromtoText: {
    paddingBottom: 10,
    color: purple,
    fontWeight: "bold",
  },
});
