import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { Header } from "../../components/organisms";
import { useDispatch, useSelector } from "react-redux";
import { ScrollView } from "react-native-gesture-handler";
import moment from "moment";
import { AntDesign } from "@expo/vector-icons";

import {
  veryLightGrey,
  darkGreen,
  lightGreen,
  red,
  dimmedRed,
  darkerGreen,
  purple,
} from "../../components/atoms/Colors";
import {
  FormButton,
  CustomTextInput,
  CustomDatePicker,
} from "../../components/atoms";
import {
  setSpendingList,
  setTransactionsList,
  setTransactionAmount,
  setTransactionNote,
  setTransactionDate,
  setTransactionId,
  setCategoryId,
  setBudgetBalance,
  setBudgetsList,
  setAccountBalance,
  setWalletBalance,
  setRecurringTransactionsList,
} from "../../redux/actions";
import { Store } from "../../redux/store";
import { CustomDropdown } from "../../components/atoms";
import { transactionReducer, userReducer } from "../../redux/reducers";
import {
  areFormFieldsFilledOut,
  endOfCurrentDay,
  startOfCurrentMonth,
} from "../../utils/authMethods";
import { fullDate, fullDateForDatabase } from "../../utils/timeMethods";
import { LabeledInput } from "../../components/molecules";

import {
  APIRequestCreateTransaction,
  APIRequestFetchDataAfterNewTransaction,
  ifUserDidntChangeDateSetCurrentDate,
} from "../../services/transactions";
import { findNextOccurrence } from "../../utils/transactionMethods";
import { APIRequestGetBudgets } from "../../services/budgets";
import Checkbox from "expo-checkbox";

const AddTransactionScreen = (props) => {
  /////////////////////////////////REDUX////////////////////////////////////////////////
  const { token } = useSelector((state) => state.userReducer);
  const { budgetBalance } = useSelector((state) => state.budgetReducer);
  var { transactionAmount, transactionNote, transactionDate } = useSelector(
    (state) => state.transactionReducer
  );
  const { walletsList } = useSelector((state) => state.walletReducer);

  //var transactionDate = Store.getState().transactionReducer.transactionDate;
  ///////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////USESTATE////////////////////////////////////////////////////
  const [numInterval, setNumInterval] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isBoxSelected, setBoxSelection] = useState(false);
  const [timeInterval, setTimeInterval] = useState();
  /////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////other//////////////////////////////////////////////
  const action = props.route.name;
  const { incomeForDropdown, spendingForDropdown, listOfAccounts } =
    props.route.params;
  const dispatch = useDispatch();
  let header = {
    headers: { Authorization: token },
  };
  let listOfMandatoryFields = [
    walletId,
    categoryId,
    transactionAmount,
    selectedAccount,
    selectedCategory,
  ];
  const intervalArray = [
    { value: "D", label: "Days" },
    { value: "W", label: "Weeks" },
    { value: "M", label: "Months" },
  ];
  let budgetId;
  let categoryId;
  let walletId;
  var interval;

  /////////////////////////////////////////////////////////////////////////////////////////////

  const onPressSave = async () => {
    setIsLoading(true);
    if (areFormFieldsFilledOut(listOfMandatoryFields)) {
      let newTransaction = [];
      if (isBoxSelected) {
        interval = numInterval + timeInterval;
        newTransaction = {
          walletId: selectedAccount,
          categoryId: selectedCategory,
          transactionAmount: transactionAmount,
          transactionDate: transactionDate,
          interval: interval,
          nextOccurrence: findNextOccurrence(
            interval,
            transactionDate === null
              ? moment().format("YYYY-MM-DD HH:mm:SS")
              : transactionDate
          ),
          transactionNote: transactionNote,
          upcoming: "true",
        };
      } else {
        newTransaction = {
          walletId: selectedAccount,
          categoryId: selectedCategory,
          transactionAmount: transactionAmount,
          transactionDate: transactionDate,
          interval: null,
          nextOccurrence: null,
          transactionNote: transactionNote,
          upcoming: "false",
        };
      }
      await APIRequestCreateTransaction(
        newTransaction,
        action,
        header,
        dispatch
      );
      APIRequestFetchDataAfterNewTransaction(header, dispatch);

      await APIRequestFetchDataAfterNewTransaction(header, dispatch);

      props.navigation.navigate("WalletNavigator");
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Select Wallet *</Text>
        <CustomDropdown
          data={listOfAccounts}
          placeholder={"Select Wallet"}
          selected={selectedAccount}
          setSelected={setSelectedAccount}
        />
        <Text style={styles.title}>Select {action} Category *</Text>

        {action === "Income" ? (
          <CustomDropdown
            data={incomeForDropdown}
            placeholder={"Select Category"}
            selected={selectedCategory}
            setSelected={setSelectedCategory}
          />
        ) : null}
        {action === "Expense" ? (
          <CustomDropdown
            data={spendingForDropdown}
            placeholder={"Select Category"}
            selected={selectedCategory}
            setSelected={setSelectedCategory}
          />
        ) : null}
        <LabeledInput
          label={"Amount *"}
          onChangeFunction={(value) => dispatch(setTransactionAmount(value))}
          keyboardType={"numeric"}
        />
        <Text style={styles.title}>Select Date</Text>
        <CustomDatePicker
          dispatch={dispatch}
          reduxSetter={setTransactionDate}
          value={fullDate(new Date())}
          maximumDate={new Date()}
        />

        <LabeledInput
          label={"Note"}
          onChangeFunction={(value) => dispatch(setTransactionNote(value))}
        />
        <View style={styles.checkboxContainer}>
          <Checkbox
            value={isBoxSelected}
            onValueChange={setBoxSelection}
            color={isBoxSelected ? darkGreen : undefined}
          />
          <Text style={[styles.text, styles.title]}>
            {" "}
            Recurring Transaction
          </Text>
        </View>
        {isBoxSelected && (
          <View style={styles.reccurentBox}>
            <Text style={styles.title}> Repeat every:</Text>
            <CustomTextInput
              width={70}
              placeholder={"e.x: 1"}
              keyboardType={"numeric"}
              onChangeFunction={setNumInterval}
            />
            <CustomDropdown
              width={130}
              data={intervalArray}
              placeholder={"interval"}
              selected={timeInterval}
              setSelected={setTimeInterval}
            />
          </View>
        )}
        {action === "Expense" ? (
          <FormButton
            action={"SAVE EXPENSE"}
            onPress={onPressSave}
            color={dimmedRed}
          ></FormButton>
        ) : (
          <FormButton
            action={"SAVE INCOME"}
            onPress={onPressSave}
            color={"#5C846E"}
          ></FormButton>
        )}
      </View>
    </ScrollView>
  );
};

export default AddTransactionScreen;

const styles = StyleSheet.create({
  container: {
    //marginTop: 20,
    //margin: 20,
    padding: 30,
    borderRadius: 20,
    backgroundColor: veryLightGrey,
  },
  checkboxContainer: {
    marginTop: 20,
    marginBottom: 20,
    display: "flex",
    flexDirection: "row",
  },
  reccurentBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  header: {
    // flex: 1,
    paddingTop: 30,
    marginHorizontal: 30,
    paddingBottom: 50,
    marginBottom: 50,
  },
  textHeader: {
    color: "#000",
    fontSize: 30,
  },

  title: {
    paddingBottom: 10,
    color: purple,
    fontWeight: "bold",
  },
  box: {},
});
