import React from "react";
import { blue, lighterPurple, grey } from "../atoms/Colors";
import { CalendarModalButton } from "../atoms";
import { View, StyleSheet } from "react-native";
import moment from "moment";
import CalendarModalCustomDate from "./CalendarModalCustomDate";
import {
  setTransactionCustomDateRange,
  setTransactionDateRangeTitle,
  setTransactionsListForChart,
} from "../../redux/actions";
import { useDispatch } from "react-redux";
import { endOfCurrentDay } from "../../utils/timeMethods";
import { Store } from "../../redux/store";
const { transactionsListForChart } = Store.getState().transactionReducer;

const CalendarModalDefaultDates = ({
  selectedButton,
  setSelectedButton,
  setFromDate,
  setToDate,
  setTitle,
  setCustomTitle,
}) => {
  const dispatch = useDispatch();

  const onPressWeek = async () => {
    setSelectedButton("week");
    setFromDate(
      moment().startOf("week").add(1, "days").format("YYYY-MM-DD HH:mm:SS")
    );
    setToDate(moment(endOfCurrentDay()).format("YYYY-MM-DD HH:mm:SS"));

    await dispatch(setTitle("This week"));
  };

  const onUnpressWeek = async () => {
    setSelectedButton("month");
    await dispatch(setTitle(moment().format("MMMM")));
    setFromDate(moment().startOf("month").format("YYYY-MM-DD HH:mm:SS"));
    setToDate(moment(endOfCurrentDay()).format("YYYY-MM-DD HH:mm:SS"));
  };
  const onPressMonth = async () => {
    setSelectedButton("month");
    await dispatch(setTitle(moment().format("MMMM")));

    setFromDate(moment().startOf("month").format("YYYY-MM-DD HH:mm:SS"));
    setToDate(moment(endOfCurrentDay()).format("YYYY-MM-DD HH:mm:SS"));
  };
  const onUnpressMonth = async () => {
    setSelectedButton("month");
    await dispatch(setTitle(moment().format("MMMM")));
    setFromDate(moment().startOf("month").format("YYYY-MM-DD HH:mm:SS"));
    setToDate(moment(endOfCurrentDay()).format("YYYY-MM-DD HH:mm:SS"));
  };
  const onPressYear = async () => {
    setSelectedButton("year");
    await dispatch(setTitle("This year"));

    setFromDate(moment().startOf("year").format("YYYY-MM-DD HH:mm:SS"));
    setToDate(moment(endOfCurrentDay()).format("YYYY-MM-DD HH:mm:SS"));
  };
  const onUnpressYear = async () => {
    setSelectedButton("month");
    await dispatch(setTitle(moment().format("MMMM")));
    setFromDate(moment().startOf("month").format("YYYY-MM-DD HH:mm:SS"));
    setToDate(moment(endOfCurrentDay()).format("YYYY-MM-DD HH:mm:SS"));
  };
  return (
    <>
      <View style={styles.buttonsContainer}>
        <CalendarModalButton
          text={"This Week"}
          style={{
            backgroundColor: selectedButton === "week" ? blue : lighterPurple,
          }}
          onPress={async () => {
            await dispatch(setCustomTitle(""));
            if (selectedButton === "week") {
              await onUnpressWeek();
            } else {
              await onPressWeek();
            }
          }}
        />
        <CalendarModalButton
          text={"This Month"}
          style={{
            backgroundColor: selectedButton === "month" ? blue : lighterPurple,
          }}
          onPress={async () => {
            await dispatch(setCustomTitle(""));
            if (selectedButton === "month") {
              await onUnpressMonth();
            } else {
              await onPressMonth();
            }
          }}
        />
        <CalendarModalButton
          text={"This Year"}
          style={{
            backgroundColor: selectedButton === "year" ? blue : lighterPurple,
          }}
          onPress={async () => {
            await dispatch(setCustomTitle(""));
            if (selectedButton === "year") {
              await onUnpressYear();
            } else {
              await onPressYear();
            }
          }}
        />
      </View>
      <CalendarModalCustomDate
        selectedButton={selectedButton}
        setSelectedButton={setSelectedButton}
        setFromDate={setFromDate}
        setToDate={setToDate}
        setCustomTitle={setCustomTitle}
      />
    </>
  );
};

export default CalendarModalDefaultDates;

const styles = StyleSheet.create({
  buttonsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    borderBottomColor: grey,
    borderBottomWidth: 1,
    marginTop: 7,
    paddingBottom: 7,
  },
});
