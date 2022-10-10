import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { mostLightGreenEver, purple, darkGreen } from "../Colors";
import { ProgressCircle } from "react-native-svg-charts";

const CustomProgressCircle = ({ saved, target }) => {
  return (
    <View style={styles.container}>
      {target !== null ? (
        <ProgressCircle
          style={{ height: 200 }}
          progress={saved / target}
          progressColor={purple}
          strokeWidth={8}
          backgroundColor={mostLightGreenEver}
        ></ProgressCircle>
      ) : (
        <ProgressCircle
          style={{ height: 200 }}
          progress={1}
          progressColor={purple}
          strokeWidth={8}
          backgroundColor={mostLightGreenEver}
        ></ProgressCircle>
      )}

      <View style={styles.label}>
        {target !== null ? (
          <>
            <Text style={styles.percentage}>
              {Math.floor((saved / target) * 100)}%
            </Text>
            <Text>
              {saved}/{target}
            </Text>
          </>
        ) : (
          <Text style={styles.percentage}>{saved}</Text>
        )}

        <Text>€</Text>
      </View>
    </View>
  );
};

export default CustomProgressCircle;

const styles = StyleSheet.create({
  container: {
    //backgroundColor: mostLightGreenEver,
    marginLeft: 20,
    marginRight: 20,
    margin: 10,
    borderRadius: 10,
    padding: 10,
    //flexDirection: "row",
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.5,
    // shadowRadius: 5,
    // elevation: 5,
    height: 220,
  },
  footer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    width: 300,
    paddingRight: 10,
  },
  label: {
    position: "relative",
    //left: width / 3,
    display: "flex",
    //justifyContent: "center",
    //alignSelf: "center",
    alignItems: "center",
    bottom: 150,
  },
  percentage: {
    fontSize: 45,
    color: darkGreen,
    marginBottom: 5,
  },
});
