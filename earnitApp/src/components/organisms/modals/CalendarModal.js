import React, { useState } from "react";
import { Modal, Portal, Text, Button, Provider } from "react-native-paper";
import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
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
  CustomDatePicker,
} from "../../atoms";
import { CalendarModalDateRangeButtons } from "../../molecules";
import { useDispatch } from "react-redux";
import moment from "moment";
import { fullDate } from "../../../utils/timeMethods";
import { FontAwesome } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import {
  deleteAllTransactionsFromChart,
  setChartCustomDateRange,
  setChartDateRangeTitle,
  setDataIncome,
  setDataSpending,
  setReloadCharts,
  setTransactionCustomDateRange,
  setTransactionDateRangeTitle,
  setTransactionsList,
  setTransactionsListForChart,
} from "../../../redux/actions";
import {
  APIRequestGetTransactionsByDateRange,
  APIRequestGetTransactionsSum,
  APIRequestGetTransactionsSums,
} from "../../../services/transactions";
import { isCustomPeriod } from "../../../utils/transactionMethods";
import { Store } from "../../../redux/store";
import { flushSync } from "react-dom";

const width = Dimensions.get("window").width;
const CalendarModal = ({ entity, navigation, position }) => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.userReducer);
  const { transactionCustomDateRange, transactionsListForChart } =
    Store.getState().transactionReducer;
  const {
    chartCustomDateRange,
    transactionsInChart,
    reloadCharts,
    chartDateRangeTitle,
    dataSpending,
    dataIncome,
  } = Store.getState().chartReducer;
  let header = {
    headers: { Authorization: token },
  };
  const [visible, setVisible] = useState(false);
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const [selectedButton, setSelectedButton] = useState("month");

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

  const onPressChangeDateRange = async () => {
    if (entity === "chart") {
      if (chartCustomDateRange === "custom") {
        let customDate =
          moment(fromDate).format("DD/MM/YY") +
          " - " +
          moment(toDate).format("DD/MM/YY");
        dispatch(setChartDateRangeTitle(customDate));
      }
      await APIRequestGetTransactionsSums(fromDate, toDate, header, dispatch);
    } else if (entity === "transaction") {
      if (transactionCustomDateRange === "custom") {
        let customDate =
          moment(fromDate).format("DD/MM/YY") +
          " - " +
          moment(toDate).format("DD/MM/YY");
        dispatch(setTransactionDateRangeTitle(customDate));
      }
      await APIRequestGetTransactionsByDateRange(
        fromDate.substring(0, 10),
        toDate.substring(0, 10),
        header,
        dispatch,
        entity
      );
    }

    hideModal();
    if (entity === "chart") navigation.navigate("InsightsNavigator");
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
            <Text style={styles.title}>Date Range</Text>
          </View>
          <CalendarModalDateRangeButtons
            selectedButton={selectedButton}
            setSelectedButton={setSelectedButton}
            setFromDate={setFromDate}
            setToDate={setToDate}
            setTitle={
              entity === "transaction"
                ? setTransactionDateRangeTitle
                : setChartDateRangeTitle
            }
            setCustomTitle={
              entity === "transaction"
                ? setTransactionCustomDateRange
                : setChartCustomDateRange
            }
          />
          <View style={styles.ok}>
            <TouchableOpacity
              onPress={() => {
                onPressChangeDateRange();
              }}
            >
              <FontAwesome name="check" size={35} color={blue} />
            </TouchableOpacity>
          </View>
        </Modal>
        <CalendarButton style={[position]} onPress={showModal} />
      </Portal>
    </Provider>
  );
};

export default CalendarModal;

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
  btn: {},
  ok: {
    alignSelf: "center",
    paddingBottom: 5,
  },
  okext: {
    fontSize: 30,
    color: lighterPurple,
  },
});
