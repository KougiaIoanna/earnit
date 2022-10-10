import React from "react";
import { Path, Circle } from "react-native-svg";
import { AreaChart, Grid, YAxis, LineChart } from "react-native-svg-charts";
import * as shape from "d3-shape";
import { View, Text } from "react-native";
import { blue, lightBlue, purple } from "../Colors";

const CustomLineChart = ({
  dates,
  dailySums,
  dotPositions,
  todaysPosition,
}) => {
  const data = [...dailySums];

  const axesSvg = { fontSize: 10, fill: "grey" };
  const verticalContentInset = { top: 10, bottom: 10 };
  for (let day = 0; day < dailySums.length; day++) {
    if (day > todaysPosition) {
      dailySums[day] = null;
    }
  }

  const Line = ({ line }) => (
    <Path key={"line"} d={line} stroke={blue} fill={"none"} strokeWidth={2} />
  );

  const Dot = ({ x, y, dailySums }) => {
    return data.map((value, index) => (
      <Circle
        key={index}
        cx={x(index)}
        cy={y(value)}
        r={dotPositions.includes(index) ? 4 : 0}
        stroke={purple}
        fill={purple}
      />
    ));
  };

  return (
    <>
      <View
        style={{
          height: 180,
          flexDirection: "row",
        }}
      >
        <YAxis
          data={dailySums}
          contentInset={verticalContentInset}
          svg={axesSvg}
          numberOfTicks={6}
        />
        <View style={{ flex: 1, marginLeft: 5, marginRight: 11 }}>
          <AreaChart
            gridMin={0}
            style={{ flex: 1 }}
            data={dailySums}
            contentInset={verticalContentInset}
            svg={{
              fill: lightBlue,
              stroke: blue,
            }}
            curve={shape.curveStep}
            numberOfTicks={6}
          >
            <Grid />
            <Line />
            <Dot />
          </AreaChart>
        </View>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontSize: 10 }}>{dates[0]}</Text>
        <Text style={{ fontSize: 10 }}>{dates[1]}</Text>
        <Text style={{ fontSize: 10 }}>{dates[2]}</Text>
        <Text style={{ fontSize: 10 }}>{dates[3]}</Text>
      </View>
    </>
  );
};

export default CustomLineChart;
