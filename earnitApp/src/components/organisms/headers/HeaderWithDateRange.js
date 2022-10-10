import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import moment from "moment";
import {
  CalendarButton,
  DateRangeText,
  FilterButton,
  RecurringTransactionsButton,
} from "../../atoms";
import {
  grey,
  lightGreen,
  lightGrey,
  purple,
  red,
  veryLightGrey,
} from "../../atoms/Colors";
import { Store } from "../../../redux/store";
import { MaterialIcons } from "@expo/vector-icons";

const HeaderWithDateRange = ({ navigation, title, entity }) => {
  const { transactionDateRangeTitle } = Store.getState().transactionReducer;
  const { chartDateRangeTitle } = Store.getState().chartReducer;
  var title;
  if (entity === "chart") title = chartDateRangeTitle;
  else title = transactionDateRangeTitle;

  return (
    <View style={entity === "chart" ? styles.chart : styles.transactions}>
      {entity === "chart" ? (
        <>
          <DateRangeText title={title} />

          {/* <Text>{title}</Text> */}
        </>
      ) : (
        <>
          <View style={styles.left}>
            <DateRangeText title={title} />
          </View>
          <View style={styles.right}>
            <CalendarButton />
            <>
              <RecurringTransactionsButton
                onPress={() => {
                  navigation.navigate("RecurringTransactionsScreen");
                }}
              />
            </>
          </View>
        </>
      )}
    </View>
  );
};

export default HeaderWithDateRange;

const styles = StyleSheet.create({
  chart: {
    marginTop: 5,
    padding: 6,
  },
  left: {
    display: "flex",
    flexDirection: "row",
    // alignSelf: "center",
    alignItems: "center",
    flex: 3,
    justifyContent: "center",
  },
  transactions: {
    marginTop: 5,
    padding: 5,
    justifyContent: "space-between",
    // marginHorizontal: 20,
    display: "flex",
    flexDirection: "row",
    // borderRadius: 10,
    //marginVertical: 10,
  },
  right: {
    display: "flex",
    flexDirection: "row",
    //alignContent: "flex-end",
    justifyContent: "space-between",
    flex: 2,
  },

  period: {
    color: grey,
    fontSize: 18,
    marginBottom: 4,
    alignItems: "center",
  },
});
