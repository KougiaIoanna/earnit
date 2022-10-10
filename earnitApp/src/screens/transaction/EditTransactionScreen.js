import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableHighlight,
  TouchableHighlightBase,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import Checkbox from "expo-checkbox";

import {
  veryLightGrey,
  darkGreen,
  lightGreen,
  red,
  dimmedRed,
  darkerGreen,
  purple,
  blue,
  grey,
  mostLightGreenEver,
  dark,
  rainbow,
  dimmedGreen,
} from "../../components/atoms/Colors";
import { Header } from "../../components/organisms";

import {
  FormButton,
  CustomTextInput,
  BoxItem,
  CustomDatePicker,
  CustomDropdown,
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
  setBudgetList,
  setAccountBalance,
  setWalletBalance,
} from "../../redux/actions";
import { Store } from "../../redux/store";
import { transactionReducer, userReducer } from "../../redux/reducers";
import { areFormFieldsFilledOut } from "../../utils/authMethods";
import {
  endOfCurrentDay,
  endOfThisMonth,
  endOfYear,
  fullDate,
  fullDateForDatabase,
  startOfCurrentDay,
  startOfCurrentMonth,
} from "../../utils/timeMethods";
import { LabeledInput } from "../../components/molecules";
import {
  APIRequestDeleteTransaction,
  APIRequestEditTransaction,
  APIRequestGetRecurringTransactions,
  APIRequestGetTransactionsByDateRange,
  APIRequestUpdateUpcomingTransaction,
} from "../../services/transactions";
import { APIRequestGetWalletById } from "../../services/wallets";
import { APIRequestGetBudgetById } from "../../services/budgets";
import { findIntervalSTR } from "../../utils/transactionMethods";
import moment from "moment";

const EditTransactionScreen = (props) => {
  const {
    budgetId,
    transactionId,
    walletId,
    amount,
    categoryType,
    category,
    nextOccurrence,
    interval,
    upcoming,
    date,
  } = props.route.params;
  /////////////////////////////////REDUX////////////////////////////////////////////////
  const { token } = useSelector((state) => state.userReducer);

  const { budgetBalance, budgetName } = useSelector(
    (state) => state.budgetReducer
  );
  const { transactionAmount, transactionNote } = useSelector(
    (state) => state.transactionReducer
  );
  const { walletsList, walletName } = useSelector(
    (state) => state.walletReducer
  );
  const transactionDate = Store.getState().transactionReducer.transactionDate;
  ///////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////USESTATE////////////////////////////////////////////////////
  const [isBoxSelected, setBoxSelection] = useState(
    upcoming === "true" ? true : false
  );
  const [isLoading, setIsLoading] = useState(false);

  /////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////other//////////////////////////////////////////////

  const dispatch = useDispatch();
  let header = {
    headers: { Authorization: token },
  };
  var newTransaction;
  const titleColor = categoryType === "Spending" ? red : darkGreen;
  const action = categoryType === "Spending" ? "Expense" : "Income";
  /////////////////////////////////////////////////////////////////////////////////////////////

  const onPress = () => {
    setIsLoading(true);
    if (upcoming === true && isBoxSelected) {
      newTransaction = {
        transactionAmount:
          transactionAmount === null ? amount : transactionAmount,
        transactionDate: transactionDate === null ? date : transactionDate,
        transactionNote: transactionNote,
        upcoming: "true",
      };
    } else {
      newTransaction = {
        transactionAmount:
          transactionAmount === null ? amount : transactionAmount,
        transactionDate: transactionDate === null ? date : transactionDate,
        transactionNote: transactionNote,
        upcoming: "false",
      };
    }
    var difference = amount - transactionAmount;

    APIRequestEditTransaction(
      transactionId,
      newTransaction,
      header,
      dispatch,
      action,
      difference
    );

    setIsLoading(false);

    props.navigation.navigate("WalletNavigator");
  };

  const onPressDelete = async () => {
    await APIRequestDeleteTransaction(
      transactionId,
      budgetId,
      walletId,
      date,
      header,
      action,
      amount,
      dispatch
    ).then(async (res) => {
      await APIRequestGetTransactionsByDateRange(
        startOfCurrentMonth(),
        endOfCurrentDay(),
        header,
        dispatch,
        "transaction"
      );
      props.navigation.navigate("WalletNavigator");
    });
  };

  const onPressHandleStopRecurring = () => {
    Alert.alert(
      "❌ STOP Recurring Transaction",
      "Are you sure you want to stop this recurring transaction?",
      [
        {
          text: "Cancel",
        },
        {},
        {
          text: "Delete",
          onPress: async () => {
            await APIRequestUpdateUpcomingTransaction(transactionId);
            await APIRequestGetTransactionsByDateRange(
              startOfCurrentMonth(),
              moment(endOfThisMonth),
              header,
              dispatch,
              "transaction"
            );
            APIRequestGetRecurringTransactions(header, dispatch);
            props.navigation.navigate("WalletNavigator");
          },
        },
      ]
    );
  };
  return (
    <ScrollView style={{ backgroundColor: veryLightGrey, flex: 1 }}>
      <Header
        title={"Edit Transaction"}
        back
        headerColor={categoryType === "Spending" ? dimmedRed : "#5C846E"}
        navigation={props.navigation}
        deleteButton
        onPressDelete={onPressDelete}
      />
      <View
        style={{
          backgroundColor: categoryType === "Spending" ? dimmedRed : "#5C846E",
          paddingBottom: 15,
          borderBottomRightRadius: 25,
          borderBottomLeftRadius: 25,
        }}
      >
        {categoryType === "Spending" ? (
          <Text style={[styles.title, { color: mostLightGreenEver }]}>
            E X P E N S E
          </Text>
        ) : (
          <Text style={[styles.title, { color: mostLightGreenEver }]}>
            I N C O M E
          </Text>
        )}

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            flexWrap: "wrap",
          }}
        >
          <BoxItem
            label={"Category"}
            value={category}
            backgroundStyle={{ backgroundColor: mostLightGreenEver }}
            labelStyle={{ color: dark }}
          />
          <BoxItem
            label={" Wallet "}
            value={walletName}
            backgroundStyle={{ backgroundColor: mostLightGreenEver }}
            labelStyle={{ color: dark }}
          />
          {categoryType === "Spending" && (
            <BoxItem
              label={" Budget "}
              value={budgetId === null ? "-" : budgetName}
              backgroundStyle={{ backgroundColor: mostLightGreenEver }}
              labelStyle={{ color: dark }}
            />
          )}
        </View>
        {/* <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignSelf: "center",
          }}
        >
          <BoxItem
            label={"      Recurring      "}
            value={nextOccurrence === null ? "no" : findIntervalSTR(interval)}
            backgroundStyle={{ backgroundColor: mostLightGreenEver }}
            labelStyle={{ color: dark }}
          />
        </View> */}
      </View>
      <View style={styles.container}>
        <View
          style={{
            display: "flex",
          }}
        >
          <LabeledInput
            label={"Amount"}
            onChangeFunction={(value) => dispatch(setTransactionAmount(value))}
            value={JSON.stringify(amount)}
            keyboardType={"numeric"}
          />

          {/* <Text style={{ fontSize: 30, color: purple }}>€</Text> */}
        </View>
        <Text
          style={{
            fontSize: 15,
            color: purple,
            fontWeight: "bold",
            paddingBottom: 10,
          }}
        >
          Date
        </Text>
        <CustomDatePicker
          dispatch={dispatch}
          reduxSetter={setTransactionDate}
          value={fullDate(new Date(date))}
          maximumDate={new Date()}
        />

        <LabeledInput
          label={"Note"}
          onChangeFunction={(value) => dispatch(setTransactionNote(value))}
          value={transactionNote}
        />

        <View style={{ marginTop: 20 }}>
          <FormButton
            action={
              categoryType === "Spending" ? "SAVE EXPENSE" : "SAVE INCOME"
            }
            color={categoryType === "Spending" ? dimmedRed : dimmedGreen}
            onPress={onPress}
          ></FormButton>
          {upcoming === "true" && (
            <TouchableHighlight
              underlayColor={dimmedRed}
              activeOpacity={1}
              style={[styles.buttonWithoutBackground]}
              onPress={() => {
                onPressHandleStopRecurring();
              }}
            >
              <Text style={styles.buttonText}>
                {"STOP RECURRING TRANSACTION"}
              </Text>
            </TouchableHighlight>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default EditTransactionScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    margin: 20,
    padding: 10,
    borderRadius: 20,
  },
  checkboxContainer: {
    marginTop: 20,
    marginBottom: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  buttonWithoutBackground: {
    height: 40,
    borderRadius: 5,
    marginHorizontal: 70,
    marginBottom: 15,
    paddingHorizontal: 10,
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
    fontWeight: "bold",
    fontSize: 22,
    alignSelf: "center",
  },
  box: {},
});
