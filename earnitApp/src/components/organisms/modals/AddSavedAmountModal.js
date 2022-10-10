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
  CustomTextInput,
  CustomDatePicker,
} from "../../atoms";
import { CalendarModalDateRangeButtons, LabeledInput } from "../../molecules";
import { useDispatch } from "react-redux";
import moment from "moment";
import { fullDate, monthPeriod } from "../../../utils/timeMethods";
import { FontAwesome } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { CustomDropdown } from "../../atoms";
import {
  setGoalMonthlySum,
  setGoalNote,
  setSavedAmount,
  setTransactionsList,
  setWalletsList,
} from "../../../redux/actions";
import {
  APIRequestAddSavedAmount,
  APIRequestGetGoals,
  APIRequestGetGoalSavedAmount,
  APIRequestGetMonthlySum,
  APIRequestGoalSavedAmount,
} from "../../../services/goals";
import {
  findThirdBoxTitle,
  findThirdBoxValue,
} from "../../../utils/goalsMethods";

const AddSavedAmountModal = ({
  visible,
  setVisible,
  goalId,
  props,
  monthlySum,
}) => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.userReducer);
  let header = {
    headers: { Authorization: token },
  };
  const { walletsForDropdown } = useSelector((state) => state.walletReducer);
  const {
    savedAmount,
    goalName,
    targetAmount,
    targetDate,
    goalIcon,
    goalNote,
    goalMonthlySum,
  } = useSelector((state) => state.goalReducer);
  const [amountAssignment, setAmountAssignment] = useState(0);

  // const [visible, setVisible] = useState(false);
  const data = [
    { label: "+", value: "+" },
    { label: "-", value: "-" },
  ];
  const [selectedButton, setSelectedButton] = useState("month");
  const [selectedFrom, setSelectedFrom] = useState();
  const [selectedTo, setSelectedTo] = useState();

  const [selectedSign, setSelectedSign] = useState("+");
  const [sum, setSum] = useState(monthlySum);

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
    await APIRequestGetGoalSavedAmount(goalId, dispatch);
    await APIRequestAddSavedAmount(goalId, amountAssignment, savedAmount);
    await APIRequestGetGoalSavedAmount(goalId, dispatch);
    let item = {
      goal_id: goalId,
      goal_name: goalName,
      target_amount: targetAmount,
      saved_amount: savedAmount,
      target_date: targetDate,
      note: goalNote,
      icon: goalIcon,
    };
    await APIRequestGetMonthlySum(goalId, monthPeriod, dispatch);
    await APIRequestGetGoals(header, dispatch);
    hideModal();

    props.navigation.navigate("EnvelopeNavigator");
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
            <Text style={styles.title}>Add Saved Amount</Text>
          </View>
          <View style={styles.formContainer}>
            <CustomDropdown
              data={data}
              placeholder={"+"}
              selected={selectedSign}
              setSelected={setSelectedSign}
              width={50}
            />
            <CustomTextInput
              number={10}
              width={200}
              keyboardType={"numeric"}
              onChangeFunction={(value) => {
                if (selectedSign === "+") setAmountAssignment(value);
                else setAmountAssignment(-value);
              }}
            />
            <Text style={{ fontSize: 30, color: purple }}>€</Text>
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

export default AddSavedAmountModal;

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
    marginVertical: 10,
    marginHorizontal: 0,
    marginTop: 10,
    padding: 10,
    borderRadius: 20,
    borderBottomColor: grey,
    borderBottomWidth: 1,
    display: "flex",
    flexDirection: "row",
    // alignSelf: "center",
    justifyContent: "space-evenly",
  },
  fromtoText: {
    paddingBottom: 10,
    color: purple,
    fontWeight: "bold",
  },
});
