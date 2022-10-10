import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  mostLightGreenEver,
  darkGreen,
  teal,
  bluepurple,
  lightBlue,
  blue,
  lighterPurple,
  dark,
} from "../../atoms/Colors";
import { BoxItem, BudgetOverspendButton, EntityTitle } from "../../atoms";

const GoalHeader = ({
  name,
  icon,
  targetDate,
  thisMonth,
  thirdBoxTitle,
  thirdBoxValue,
}) => {
  if (thisMonth === null) thisMonth = 0;

  return (
    <View
      style={{
        backgroundColor: blue,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        marginBottom: 10,
        shadowColor: dark,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 5,
      }}
    >
      <EntityTitle name={name} icon={icon} />
      <View style={styles.overview}>
        {targetDate !== "Invalid date" && (
          <BoxItem
            label={"Target date"}
            value={targetDate}
            backgroundStyle={{ backgroundColor: lighterPurple }}
          />
        )}
        <BoxItem
          label={"Added this month"}
          value={thisMonth + "€"}
          backgroundStyle={{ backgroundColor: lighterPurple }}
        />
        {thirdBoxTitle === "Estimated time to reach goal" ? (
          <BoxItem
            label={thirdBoxTitle}
            value={Math.floor(thirdBoxValue) + " months"}
            backgroundStyle={{ backgroundColor: lighterPurple }}
          />
        ) : (
          <BoxItem
            label={thirdBoxTitle}
            value={thirdBoxValue + "€"}
            backgroundStyle={{ backgroundColor: lighterPurple }}
          />
        )}
      </View>
    </View>
  );
};

export default GoalHeader;

const styles = StyleSheet.create({
  overview: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    marginBottom: 13,
    // position: "relative",
  },
});
