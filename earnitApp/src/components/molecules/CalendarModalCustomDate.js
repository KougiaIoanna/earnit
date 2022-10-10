import React from "react";
import { blue, lighterPurple, grey } from "../atoms/Colors";
import { View, StyleSheet, Text } from "react-native";
import moment from "moment";
import { useDispatch } from "react-redux";
import { CalendarModalButton, CustomDatePicker } from "../atoms";

const CalendarModalCustomDate = ({
  selectedButton,
  setSelectedButton,
  setFromDate,
  setToDate,
  setCustomTitle,
}) => {
  const dispatch = useDispatch();

  return (
    <View>
      <CalendarModalButton
        text={"Custom Date"}
        style={{
          width: 100,
          alignSelf: "center",
          backgroundColor: selectedButton === "custom" ? blue : lighterPurple,
        }}
        onPress={() => {
          if (selectedButton === "custom") {
            setSelectedButton("month");
            dispatch(setCustomTitle(""));
          } else {
            setSelectedButton("custom");
            dispatch(setCustomTitle("custom"));
          }
        }}
      />
      {selectedButton === "custom" ? (
        <View style={styles.dateRangeContainer}>
          <View>
            <Text style={styles.label}>From:</Text>
            <CustomDatePicker
              dispatch={dispatch}
              reduxSetter={setFromDate}
              maximumDate={new Date()}
              fromStartOfDay={true}
            />
          </View>
          <View>
            <Text style={styles.label}>To:</Text>
            <CustomDatePicker
              dispatch={dispatch}
              reduxSetter={setToDate}
              maximumDate={new Date()}
              toEndOfDay={true}
            />
          </View>
        </View>
      ) : null}
    </View>
  );
};

export default CalendarModalCustomDate;

const styles = StyleSheet.create({
  dateRangeContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: 10,
    borderBottomColor: grey,
    borderBottomWidth: 1,
  },
  label: {
    fontSize: 15,
    marginBottom: 5,
    color: lighterPurple,
    fontWeight: "bold",
  },
});
