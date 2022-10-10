import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { mostLightGreenEver } from "../Colors";
import { Title } from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons";
import BudgetOverspendButton from "../buttons/BudgetOverspendButton";

const EntityTitle = ({ name, balance, entity, icon }) => {
  return (
    <View style={styles.titleContainer}>
      {icon ? (
        <View style={styles.iconContainer}>
          <Image source={icon} style={styles.categoryIcon} />
        </View>
      ) : (
        <View style={{ marginLeft: 15 }}></View>
      )}
      {entity === "wallet" ? (
        <>
          <View style={styles.iconContainer}>
            <FontAwesome
              name="bank"
              size={24}
              color="black"
              style={styles.icon}
            />
          </View>
          <Title style={styles.name}>{name}</Title>
        </>
      ) : (
        <>
          <Title style={styles.name}>
            {entity} {name}
          </Title>
          {balance < 0 ? <BudgetOverspendButton /> : null}
        </>
      )}
    </View>
  );
};

export default EntityTitle;

const styles = StyleSheet.create({
  titleContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  name: {
    fontSize: 28,
    alignSelf: "center",
    marginLeft: 5,
    color: mostLightGreenEver,
    marginBottom: 5,
    marginRight: 5,
  },
  categoryIcon: {
    width: 40,
    height: 40,
  },
  iconContainer: {
    backgroundColor: mostLightGreenEver,
    alignSelf: "center",
    margin: 7,
    padding: 6,
    borderRadius: 25,
    marginLeft: 20,
  },
});
