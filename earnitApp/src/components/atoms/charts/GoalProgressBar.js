import React from "react";
import { View, Text, StyleSheet } from "react-native";
import * as Progress from "react-native-progress";
import { dark, lightBlue } from "../Colors";

const GoalProgressBar = ({ progress, saved, target }) => {
  if (saved === 0) progress = 0;
  return (
    <View style={styles.container}>
      <>
        <Progress.Bar
          progress={progress}
          width={240}
          height={15}
          color={lightBlue}
        />
        <View style={styles.footer}>
          <Text style={{ fontWeight: "bold", color: dark }}>
            Saved: {saved}€
          </Text>
          {target && <Text>Goal: {target}€</Text>}
        </View>
      </>
    </View>
  );
};

export default GoalProgressBar;

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
  },
  footer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: 240,
    paddingRight: 10,
  },
});
