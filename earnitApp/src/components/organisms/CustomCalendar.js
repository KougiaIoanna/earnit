import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  mostLightGreenEver,
  darkGreen,
  dark,
  lightGrey,
} from "../atoms/Colors";
import { Calendar } from "react-native-calendars";

const CustomCalendar = ({ data, startDate }) => {
  return (
    <View style={styles.calendarContainer}>
      <Calendar
        initialDate={startDate} //to start date
        style={styles.calendar}
        theme={{
          calendarBackground: mostLightGreenEver,
          monthTextColor: dark,
          dayTextColor: dark,
          textDisabledColor: lightGrey,
          textDayFontSize: 14,
          // textMonthFontSize: 15,
          weekVerticalMargin: 0,
          "stylesheet.calendar.header": {
            header: {
              flexDirection: "row",
              justifyContent: "space-between",
              paddingLeft: 5,
              paddingRight: 5,
              marginTop: 0,
              alignItems: "center",
            },
            dayHeader: {
              color: dark,
            },
            week: {
              marginTop: 3,
              flexDirection: "row",
              justifyContent: "space-around",
              paddingHorizontal: 0,
              color: dark,
            },
          },
          "stylesheet.calendar.day.basic": {
            container: {
              alignSelf: "stretch",
              alignItems: "center",
            },
            text: {
              marginTop: 0,
              marginBottom: 0,
              fontSize: 2,
            },
          },
        }}
        markingType={"period"}
        markedDates={data}
      />
    </View>
  );
};

export default CustomCalendar;

const styles = StyleSheet.create({
  calendarContainer: {
    //backgroundColor: red,
    borderRadius: 10,
    height: 280,
    width: 350,
    alignSelf: "center",
    //borderRadius: 10,

    //alignItems: "center",
  },
  calendar: {
    backgroundColor: mostLightGreenEver,
    marginLeft: 20,
    marginRight: 20,
    margin: 5,
    borderRadius: 10,
    padding: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
});
