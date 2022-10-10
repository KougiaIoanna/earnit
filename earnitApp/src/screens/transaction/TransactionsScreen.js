import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { FontAwesome, AntDesign } from "@expo/vector-icons";
import moment from "moment";
import { Modal, Portal, Button, Provider } from "react-native-paper";

import {
  veryLightGrey,
  darkerGreen,
  red,
  grey,
  blue,
  lighterPurple,
  purple,
  mostLightGreenEver,
  lightBlue,
  lightGrey,
  darkGreen,
  dark,
} from "../../components/atoms/Colors";
const { width, height } = Dimensions.get("window");
import { useDispatch, useSelector } from "react-redux";
import { transactionReducer } from "../../redux/reducers";
import {
  endOfCurrentDay,
  fullDate,
  getMonth,
  startOfCurrentMonth,
} from "../../utils/timeMethods";
import {
  FilterButton,
  CalendarButton,
  RecurringTransactionsButton,
  AddTransactionButton,
} from "../../components/atoms";
import {
  CalendarModal,
  HeaderWithDateRange,
  TransferModal,
  TransactionList,
} from "../../components/organisms";
import { APIRequestGetTransactionsByDateRange } from "../../services/transactions";
import { APIRequestGetWallets } from "../../services/wallets";
import { makeCategoriesForDropdown } from "../../utils/categoryMethods";
import { makeWalletsForDropdown } from "../../utils/walletMethods";
import { setStatesNull } from "../../utils/transactionMethods";
import { setTransactionDateRangeTitle } from "../../redux/actions";

const TransactionsScreen = (props) => {
  const navigation = props.navigation;
  const { token } = useSelector((state) => state.userReducer);
  let header = {
    headers: { Authorization: token },
  };
  const { transactionsList, transactionDateRangeTitle, transactionAmount } =
    useSelector((state) => state.transactionReducer);
  const { incomeList, spendingList } = useSelector(
    (state) => state.categoryReducer
  );
  const { walletsList } = useSelector((state) => state.walletReducer);

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  let transaction_id;
  let listOfAccounts = [];
  let spendingForDropdown = [];
  let incomeForDropdown = [];

  useEffect(() => {
    setIsLoading(true);
    fetchData();
    setIsLoading(false);
  }, [transactionAmount]);

  const fetchData = async () => {
    setIsLoading(true);
    APIRequestGetWallets(header, dispatch);
    setIsLoading(false);
  };

  const onPressAddTransaction = async () => {
    await setStatesNull(dispatch);

    props.navigation.navigate("AddTransactionNavigator", {
      listOfAccounts: makeWalletsForDropdown(walletsList),
      incomeForDropdown: makeCategoriesForDropdown(incomeList),
      spendingForDropdown: makeCategoriesForDropdown(spendingList),
    });
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color={darkerGreen} />
      ) : (
        <>
          <View style={styles.header}>
            <HeaderWithDateRange
              navigation={navigation}
              entity={"transaction"}
              title={transactionDateRangeTitle}
            />
          </View>

          <TransactionList
            props={props}
            width={width}
            transactionsList={transactionsList}
            // walletsList={walletsList}
            marginTop={0}
          />

          <AddTransactionButton
            onPress={onPressAddTransaction}
            styleWithTopNavigator={{ bottom: 135 }}
          ></AddTransactionButton>
          <CalendarModal
            entity={"transaction"}
            position={{ right: 91, top: 10 }}
          />
        </>
      )}
    </View>
  );
};

export default TransactionsScreen;
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: veryLightGrey,
    width: width,
    height: height,
  },
  filter: {
    // backgroundColor: red,
    alignItems: "flex-end",
  },
  header: {
    backgroundColor: darkGreen,
    backgroundColor: darkGreen,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    paddingBottom: 10,
    shadowColor: dark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },

  transactionsHeader: {
    marginTop: 5,
    padding: 6,
    borderBottomColor: grey,
    borderBottomWidth: 1,
    marginHorizontal: 20,
    display: "flex",
    flexDirection: "row",
    backgroundColor: lightGrey,
    borderRadius: 10,
    //marginVertical: 10,
  },
  buttons: {
    display: "flex",
    flexDirection: "row",
    alignContent: "flex-end",
    justifyContent: "space-evenly",
    flex: 1,
    borderLeftColor: veryLightGrey,
    borderLeftWidth: 1,
  },
  headerText: {
    color: purple,
    fontSize: 30,
    paddingLeft: 2,
    //alignSelf: "baseline",
    //fontWeight: "bold",
    alignSelf: "center",
    flex: 1,
  },
});
