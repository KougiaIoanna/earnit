import React, { useState } from "react";
import { View, StyleSheet, Alert, TouchableOpacity, Text } from "react-native";
import { mostLightGreenEver } from "./../Colors";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  endOfCurrentDay,
  fullDate,
  fullDateForDatabase,
} from "../../../utils/timeMethods";
import { AntDesign } from "@expo/vector-icons";
import moment from "moment";
import { setTransactionDate } from "../../../redux/actions";

const CustomDatePicker = ({
  dispatch,
  reduxSetter,
  value,
  changable,
  maximumDate,
  minimumDate,
  previusEndDate,
  fromStartOfDay,
  toEndOfDay,
}) => {
  const [date, setDate] = useState(
    previusEndDate ? previusEndDate : new Date()
  );
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [text, setText] = useState(value);

  const onChangeDatePicker = (event, selectedDate) => {
    var currentDate;
    if (reduxSetter === setTransactionDate) {
      currentDate = moment(selectedDate).format("YYYY-MM-DD HH:mm:SS");
      if (fromStartOfDay) {
        currentDate = moment(selectedDate)
          .startOf("day")
          .format("YYYY-MM-DD HH:mm:SS");
      } else if (toEndOfDay) {
        currentDate = moment(selectedDate).format("YYYY-MM-DD HH:mm:SS");
      }
    } else {
      currentDate = fullDateForDatabase(selectedDate); //JSON.stringify(new Date(selectedDate)).substring(0, 11);
    }
    setShow(false);
    setDate(currentDate);
    setText(fullDate(selectedDate));
    dispatch(reduxSetter(currentDate));
  };

  const showDatepicker = () => {
    setShow(true);
    setMode("date");
  };

  const onPress = () => {
    if (changable === false) {
      Alert.alert(
        "No can do 😛",
        "You can't change a budget's starting date. You could make a new one instead!",
        [{ text: "Got it" }]
      );
      return;
    }
    showDatepicker();
  };

  return (
    <View>
      <View style={{ display: "flex" }}>
        <TouchableOpacity
          onPress={() => {
            onPress();
          }}
          style={styles.button}
        >
          <AntDesign
            name="calendar"
            size={24}
            color="black"
            style={styles.icon}
          />
          <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
      </View>

      {show && (
        <DateTimePicker
          minimumDate={minimumDate}
          maximumDate={maximumDate}
          testID="dateTimePicker"
          value={new Date(date)}
          mode={mode}
          onChange={onChangeDatePicker}
        />
      )}
    </View>
  );
};

export default CustomDatePicker;

const styles = StyleSheet.create({
  button: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: mostLightGreenEver,
    height: 40,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
  },

  text: {
    marginLeft: 5,
    alignSelf: "center",
  },
  icon: {
    alignSelf: "center",
    paddingRight: 10,
  },
});
