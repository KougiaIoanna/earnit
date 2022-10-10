import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  FlatList,
  RefreshControl,
} from "react-native";
import { GoalListItem } from "../../molecules";
import { useDispatch, useSelector } from "react-redux";
import { mostLightGreenEver, purple, red } from "../../atoms/Colors";
import { setGoalsList } from "../../../redux/actions";
import {
  APIRequestGetGoals,
  APIRequestGetMonthlySum,
} from "../../../services/goals";
import { monthPeriod } from "../../../utils/timeMethods";
import GoalListItemForCard from "../../molecules/listItems/GoalListItemForCard";

const GoalList = ({ props, width, screen }) => {
  const { goalsList } = useSelector((state) => state.goalReducer);
  const [refreshing, setRefreshing] = useState(false);
  const { token } = useSelector((state) => state.userReducer);
  let header = {
    headers: { Authorization: token },
  };
  const dispatch = useDispatch();

  const renderItem = ({ item }) => {
    if (screen === "home" && item.reached === null) {
      return <GoalListItemForCard item={item} navigation={props.navigation} />;
    } else if (screen === "goals" && item.reached === null) {
      return <GoalListItem item={item} navigation={props.navigation} />;
    } else if (screen === "reached" && item.reached === "true") {
      return <GoalListItem item={item} navigation={props.navigation} />;
    }
  };

  const fetchData = async () => {
    await APIRequestGetGoals(header, dispatch);
  };
  var height;
  if (screen === "home") {
    height = 0;
  } else {
    height = 20;
  }
  return (
    <SafeAreaView style={screen === "home" ? styles.home : styles.container}>
      <FlatList
        ListFooterComponent={<View />}
        ListFooterComponentStyle={{ height: height }}
        style={screen === "home" ? styles.home : styles.list}
        data={goalsList}
        keyExtractor={(item) => item.goal_id}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
              fetchData();
              setTimeout(() => {
                setRefreshing(false);
              }, 3000);
              //setRefreshing(false);
            }}
            tintColor={purple}
          />
        }
      ></FlatList>
    </SafeAreaView>
  );
};

export default GoalList;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingBottom: 100,
    marginBottom: 20,
  },
  home: {
    marginTop: 5,
    marginLeft: 5,
    // backgroundColor: red,
  },
  list: {
    paddingBottom: 50,
  },
});
