import { Feather } from "@expo/vector-icons";
import moment from "moment";
import React, { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useDispatch } from "react-redux";
import {
  setTransactionNote,
  setTransactionDueToday,
  setTransactionOverdue,
} from "../../redux/actions";
import { APIRequestGetBudgetById } from "../../services/budgets";
import { APIRequestGetWalletById } from "../../services/wallets";
import {
  makeSmallTitleForRecurringTransactions,
  makeSmallTitleForTransactions,
} from "../../utils/transactionMethods";
import {
  TransactionAmount,
  TransactionText,
  UpcomingTransactionFooter,
} from "../atoms";

import {
  darkGreen,
  darkGrey,
  lightGreen,
  lightGrey,
  veryLightPurple,
  red,
} from "../atoms/Colors";

const Transaction = ({
  navigation,
  item,
  icon,
  wallet,
  category,
  budgetId,
  walletId,
  categoryType,
  transactionDate,
  nextOccurence,
  intervalSTR,
  screen,
}) => {
  const dispatch = useDispatch();
  const onPressTransaction = () => {
    APIRequestGetWalletById(walletId, dispatch);
    if (categoryType === "Spending" && budgetId !== null) {
      APIRequestGetBudgetById(budgetId, dispatch);
    }
    dispatch(setTransactionNote(item.note));
    navigation.navigate("EditTransactionScreen", {
      budgetId: budgetId,
      transactionId: item.transaction_id,
      walletId: item.wallet_id,
      amount: item.amount,
      categoryType: categoryType,
      category: category,
      nextOccurrence: item.next_occurrence,
      interval: item.interval_period,
      upcoming: item.upcoming_transaction,
      date: item.transaction_date,
    });
  };
  var date = nextOccurence ? nextOccurence : transactionDate;
  var title;
  if (transactionDate) title = makeSmallTitleForTransactions(date);
  else title = makeSmallTitleForRecurringTransactions(date);

  return (
    <>
      <TouchableOpacity onPress={onPressTransaction}>
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <View style={styles.iconContainer}>
            <Image source={parseInt(icon)} style={styles.categoryIcon} />
          </View>

          <TransactionText
            wallet={wallet}
            category={category}
            note={item.note}
            screen={screen}
          />
          {item.next_occurrence && screen === "transactions" && (
            <View
              style={{
                justifyContent: "center",
                paddingRight: 5,
                marginTop: 5,
              }}
            >
              <Feather name={"repeat"} size={20} color={darkGrey} />
            </View>
          )}

          <TransactionAmount
            categoryType={categoryType}
            amount={item.amount}
            date={screen === "home" ? title : null}
          />
        </View>
        {screen === "upcoming" ? (
          <UpcomingTransactionFooter
            intervalSTR={intervalSTR}
            nextOccurence={nextOccurence}
          />
        ) : null}
      </TouchableOpacity>
    </>
  );
};

export default Transaction;

const styles = StyleSheet.create({
  textBox: { flex: 3, marginLeft: 6, marginTop: 4, marginBottom: 4 },
  name: {
    fontWeight: "bold",
    fontSize: 20,
  },
  separatingLines: {
    borderBottomColor: lightGrey,
    borderBottomWidth: 1,
    margin: 5,
  },
  categoryIcon: {
    width: 30,
    height: 30,
  },
  iconContainer: {
    backgroundColor: veryLightPurple,
    alignSelf: "center",
    margin: 7,
    marginHorizontal: 4,
    padding: 6,
    borderRadius: 10,
    marginLeft: 10,
  },
});
