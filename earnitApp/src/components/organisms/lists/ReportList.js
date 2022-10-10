import moment from "moment";
import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
} from "react-native";

import { useSelector, useDispatch } from "react-redux";
import { APIRequestGetTransactionsSumsForReports } from "../../../services/transactions";
import { findSum } from "../../../utils/categoryMethods";
import {
  darkGreen,
  grey,
  lightGrey,
  mostLightGreenEver,
  red,
  veryLightGrey,
} from "../../atoms/Colors";
import { ReportListItem } from "../../molecules";

const ReportList = ({ props, months }) => {
  // const months = props.months;
  const { token } = useSelector((state) => state.userReducer);
  let header = {
    headers: { Authorization: token },
  };
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {}, []);

  const renderItem = ({ item }) => {
    return <ReportListItem navigation={props.navigation} item={item} />;
  };

  return (
    <SafeAreaView style={styles.outerBox}>
      <View
        style={{
          marginTop: 20,
          //paddingLeft: 20,
          flexDirection: "row",
          marginHorizontal: 10,
          borderBottomColor: lightGrey,
          borderBottomWidth: 1,
          //justifyContent: "space-evenly",
          paddingBottom: 10,
          display: "flex",
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
            flex: 2,
            alignContent: "center",
            paddingLeft: 5,
          }}
        >
          Month
        </Text>
        <Text
          style={{
            color: darkGreen,
            fontWeight: "bold",
            flex: 1,
          }}
        >
          Income
        </Text>
        <Text style={{ color: red, fontWeight: "bold", flex: 1 }}>
          Expenses
        </Text>
      </View>
      <FlatList
        //contentContainerStyle={entity === "home" && styles.home}
        //ListFooterComponent={<View />}
        //ListFooterComponentStyle={entity !== "home" && { height: 100 }}
        //style={}
        data={months}
        // numColumns={entity === "home" ? 2 : null}
        //horizontal={entity === "home" ? true : false}
        keyExtractor={(item) => item.key}
        renderItem={renderItem}
      ></FlatList>
    </SafeAreaView>
  );
};

export default ReportList;

const styles = StyleSheet.create({
  outerBox: {
    backgroundColor: veryLightGrey,
    marginHorizontal: 10,
    borderRadius: 5,
    //paddingTop: 10,
    //flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
});
