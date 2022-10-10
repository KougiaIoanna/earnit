import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Header } from "../components/organisms";
import { useDispatch, useSelector } from "react-redux";
import { DrawerActions } from "@react-navigation/native";
import {
  veryLightGrey,
  mostLightGreenEver,
  darkGreen,
  purple,
} from "../components/atoms/Colors";
import CategoriesTabNavigator from "../navigators/CategoriesNavigator";
import { APIRequestSignout } from "../services/auth";
import { APIRequestSetGoalReached } from "../services/goals";

const SettingsScreen = (props) => {
  const navigation = props.navigation;
  const { token } = useSelector((state) => state.userReducer);
  var header = {
    headers: { Authorization: token },
  };
  const dispatch = useDispatch();

  const onPressSignout = () => {
    Alert.alert("Log out", "Ready to log out?", [
      {
        text: "Cancel",
      },
      {},
      {
        text: "Yes!",
        onPress: () => {
          APIRequestSignout(token, dispatch, navigation);
        },
      },
    ]);
  };
  const onPressReachedGoals = () => {
    props.navigation.navigate("ReachedGoalsScreen");
  };
  return (
    <View style={styles.container}>
      <Header
        title={"Settings"}
        back
        navigation={props.navigation}
        something
        headerColor={darkGreen}
      />
      <View style={styles.outerBox}>
        <TouchableOpacity
          style={styles.textBox}
          onPress={() => {
            navigation.navigate("CategoriesNavigator");
          }}
        >
          <Text style={styles.name}>{"Configure Categories"}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.outerBox}>
        <TouchableOpacity style={styles.textBox} onPress={onPressReachedGoals}>
          <Text style={styles.name}>{"Reached Goals"}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.outerBox}>
        <TouchableOpacity style={styles.textBox} onPress={onPressSignout}>
          <Text style={styles.name}>{"Sign out"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: veryLightGrey,
    flex: 1,
  },
  outerBox: {
    backgroundColor: mostLightGreenEver,
    marginLeft: 20,
    marginRight: 20,
    margin: 10,
    borderRadius: 10,
    padding: 10,
    flexDirection: "row",
  },
  textBox: { flex: 1 },
  icon: {
    //alignContent: "center",
    //alignSelf: "center",
    justifyContent: "flex-end",
    fontSize: 30,
    padding: 5,
    color: darkGreen,
    // borderColor: darkGreen,
    // borderWidth: 3,
  },
  name: {
    color: darkGreen,
    fontWeight: "bold",
    fontSize: 20,
  },
});
