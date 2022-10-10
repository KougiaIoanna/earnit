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
  darkGreen,
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
import { GoalList, Header } from "../../components/organisms";
import { APIRequestGetGoals } from "../../services/goals";
const { width } = Dimensions.get("window");

const ReachedGoalsScreen = (props) => {
  const { token } = useSelector((state) => state.userReducer);
  const { spendingList } = useSelector((state) => state.categoryReducer);
  const { reachedGoalsList } = useSelector((state) => state.goalReducer);

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

  return (
    <View style={{ flex: 1, backgroundColor: veryLightGrey }}>
      <Header
        title={"My Reached Goals!"}
        back
        headerColor={darkGreen}
        navigation={props.navigation}
      />
      {isLoading ? (
        <ActivityIndicator size="large" color={darkerGreen} />
      ) : (
        <>
          <GoalList width={width} props={props.navigation} screen="reached" />
        </>
      )}
    </View>
  );
};

export default ReachedGoalsScreen;
