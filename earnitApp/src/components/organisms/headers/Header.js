import React from "react";
import { View, StyleSheet, StatusBar } from "react-native";
import {
  darkerGreen,
  darkGreen,
  lightGreen,
  mostLightGreenEver,
  veryLightGrey,
} from "../../atoms/Colors";
import SettingsNavigator from "../../../navigators/SettingsNavigator";
import { useDispatch } from "react-redux";
import { Surface, Title } from "react-native-paper";
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import {
  DeleteButton,
  EditButton,
  GoBackButton,
  HeaderTitle,
  SettingsButton,
} from "../../atoms";

const iSize = 25;
const headerColor = darkGreen;
const iColor = mostLightGreenEver;

const Header = ({
  back,
  title,
  settingsButton,
  navigation,
  editButton,
  onPressEdit,
  deleteButton,
  onPressDelete,
  headerColor,
}) => {
  const dispatch = useDispatch();

  const RightView = () => (
    <View style={[styles.view, styles.rightView]}>
      {settingsButton && <SettingsButton navigation={navigation} />}
      {editButton && (
        <EditButton
          onPress={onPressEdit}
          color={{ color: mostLightGreenEver }}
        />
      )}
      {deleteButton && (
        <DeleteButton
          onPress={onPressDelete}
          color={{ color: mostLightGreenEver }}
        />
      )}
    </View>
  );

  return (
    <Surface style={[styles.header, { backgroundColor: headerColor }]}>
      <StatusBar backgroundColor={headerColor} />
      {back && <GoBackButton navigation={navigation} />}
      <HeaderTitle title={title} />
      <RightView />
    </Surface>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    height: 60,
    elevation: 8,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    display: "flex",
  },
  view: {
    marginHorizontal: 16,
    flexDirection: "row",
    alignSelf: "center",
  },

  rightView: {
    justifyContent: "flex-end",
    paddingLeft: 10,
  },
  btn: {
    flexDirection: "row",
    alignSelf: "center",
  },
});
