import React from "react";
import { View, StyleSheet } from "react-native";
import { Transaction } from "../../../components/molecules";
import { DateTitle } from "../../molecules";

import moment from "moment";
import { APIRequestGetWalletById } from "../../../services/wallets";
import { APIRequestGetBudgetById } from "../../../services/budgets";
import { useDispatch } from "react-redux";
import { setTransactionNote } from "../../../redux/actions";

const TransactionListItem = ({
  item,
  navigation,
  category,
  wallet,
  budgetId,
  walletId,
  categoryType,
  dateChanged,
  icon,
}) => {
  const dispatch = useDispatch();


  return (
    <>
      <View>
        {dateChanged === true ? (
          <DateTitle
            date={moment(item.transaction_date).format("ddd, D MMMM YYYY")}
            style={{ margin: 4 }}
          />
        ) : (
          <View style={styles.separatingLines} />
        )}
        <Transaction
          navigation={navigation}
          item={item}
          icon={icon}
          wallet={wallet}
          walletId={walletId}
          budgetId={budgetId}
          category={category}
          categoryType={categoryType}
          screen={"transactions"}
        />
      </View>
    </>
  );
};
export default TransactionListItem;

const styles = StyleSheet.create({
  separatingLines: {
    borderBottomColor: "#c8c8c8",
    borderBottomWidth: 1,
    margin: 5,
  },
});
