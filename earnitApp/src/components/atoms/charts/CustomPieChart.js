import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { veryLightGrey } from "../Colors";
import { PieChart } from "react-native-svg-charts";
import { Text, G, Line, Circle } from "react-native-svg";
import { ScrollView } from "react-native-gesture-handler";
const { width } = Dimensions.get("window");

const CustomPieChart = ({ data }) => {
  const Labels = ({ slices }) => {
    return slices.map((slice, index) => {
      const { labelCentroid, pieCentroid, data } = slice;
      return (
        <G key={index}>
          <Line
            x1={labelCentroid[0]}
            y1={labelCentroid[1]}
            x2={pieCentroid[0]}
            y2={pieCentroid[1]}
            stroke={data.svg.fill}
          />
          <G x={labelCentroid[0]} y={labelCentroid[1]}>
            <Circle r={15} fill={veryLightGrey} />
            <Text
              textAnchor="middle"
              alignmentBaseline="middle"
              fontWeight="bold"
              fontSize={16}
              fill={data.svg.fill}
            >
              {data.amount}
            </Text>
          </G>
        </G>
      );
    });
  };

  return (
    <ScrollView style={styles.container}>
      <PieChart
        style={{ height: 200, width: 200 }}
        valueAccessor={({ item }) => item.amount}
        data={data}
        outerRadius={55}
        labelRadius={80}
        innerRadius={20}
      >
        <Labels />
      </PieChart>
    </ScrollView>
  );
};

export default CustomPieChart;

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  list: {
    paddingBottom: 50,
  },
  chart: {},
});
//https://github.com/JesperLekland/react-native-svg-charts-examples/blob/master/storybook/stories/pie-chart/with-centered-labels.js
