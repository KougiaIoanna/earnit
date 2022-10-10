import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import {
  darkGreen,
  lightGreen,
  veryLightGrey,
  rainbow,
  red,
  darkerGreen,
  grey,
  lightGrey,
  dark,
} from "../../atoms/Colors";

import { Store } from "../../../redux/store";
import { Title } from "react-native-paper";
import { useSelector } from "react-redux";
import { DotAndCategoryName, CustomPieChart } from "../../atoms";
const { width } = Dimensions.get("window");

const PieChart = ({ sum, datalist, type }) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          paddingLeft: 10,
          paddingTop: 5,
          borderBottomColor: grey,
          borderBottomWidth: 1,
          alignItems: "center",
        }}
      >
        <Title style={{ color: dark, fontSize: 22 }}>{type}</Title>
      </View>
      <View style={styles.innerContainer}>
        <CustomPieChart style={styles.chart} data={datalist} />
        <View style={styles.list}>
          {datalist.map((item) => {
            return (
              <DotAndCategoryName
                dotColor={item.svg.fill}
                category={item.name}
              />
            );
          })}
        </View>
      </View>
    </View>
  );
};
export default PieChart;

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    backgroundColor: veryLightGrey,
    margin: 8,
    borderRadius: 5,
    marginTop: 10,
    borderBottomColor: grey,
    borderBottomWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  innerContainer: {
    display: "flex",
    flexDirection: "row",
  },

  balanceList: {
    marginLeft: 40,
  },
  chart: {
    //left: 10,
    //flex: 1,
    // alignSelf: "flex-start",
    //alignContent: "flex-start",
  },
  list: {
    marginLeft: -120,
    flex: 1,
    marginTop: 10,
  },
});
