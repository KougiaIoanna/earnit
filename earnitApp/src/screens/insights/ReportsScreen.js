import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  darkGreen,
  lightGreen,
  mostLightGreenEver,
  veryLightGrey,
} from "../../components/atoms/Colors";
import { Header, ReportList } from "../../components/organisms";
import { getListOfMonthsUntilLastMonth } from "../../utils/timeMethods";

const ReportsScreen = (props) => {
  const [months, setMonths] = useState([]);
  useEffect(() => {
    setMonths(getListOfMonthsUntilLastMonth());
  }, []);
  return (
    <View style={styles.container}>
      <ReportList props={props} months={months} />
    </View>
  );
};

export default ReportsScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: veryLightGrey,
    paddingTop: 20,
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
});
