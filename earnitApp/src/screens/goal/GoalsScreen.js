import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { AddEntityButton } from "../../components/atoms";
import {
  purple,
  darkerGreen,
  veryLightGrey,
} from "../../components/atoms/Colors";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import {
  setGoalIcon,
  setGoalNote,
  setTargetDate,
  setGoalsList,
  setSavedAmount,
  setTargetAmount,
} from "../../redux/actions";
import { GoalList } from "../../components/organisms";
import { APIRequestGetGoals } from "../../services/goals";
const { width } = Dimensions.get("window");

const GoalsScreen = (props) => {
  const { token } = useSelector((state) => state.userReducer);
  const { spendingList } = useSelector((state) => state.categoryReducer);
  const { goalsList } = useSelector((state) => state.goalReducer);

  const [isLoading, setIsLoading] = useState(false);

  let header = {
    headers: { Authorization: token },
  };
  const dispatch = useDispatch();

  ///////////////////////////////METHODS//////////////////////////////////



  useEffect(() => {
    let active = true;
    const fetchData = async () => {
      setIsLoading(true);
      if (active) {
        await APIRequestGetGoals(header, dispatch);

        setIsLoading(false);
      }
    };
    fetchData();
    return () => {
      active = false;
    };
  }, []);

 

  const onPressAddButton = async () => {
    dispatch(setTargetAmount(null));
    dispatch(setTargetDate(null));
    dispatch(setGoalNote(null));
    dispatch(setGoalIcon(null));
    dispatch(setSavedAmount(0));
    props.navigation.navigate("AddEditGoalScreen", {
      action: "New Goal",
    });
  };
  return (
    <View style={{ flex: 1, backgroundColor: veryLightGrey }}>
      <AddEntityButton
        onPress={onPressAddButton}
        color={purple}
        action={"CREATE GOAL"}
      />
      {isLoading ? (
        <ActivityIndicator size="large" color={darkerGreen} />
      ) : (
        <>
          <GoalList width={width} props={props} screen={"goals"} />
        </>
      )}
    </View>
  );
};

export default GoalsScreen;
