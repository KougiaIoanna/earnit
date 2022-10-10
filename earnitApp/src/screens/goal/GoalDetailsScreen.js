import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  TouchableHighlight,
  Alert,
} from "react-native";
import { AddEntityButton, FormButton } from "../../components/atoms";
import {
  purple,
  teal,
  mostLightGreenEver,
  bluepurple,
  lightBlue,
  blue,
  lightGreen,
  veryLightGrey,
} from "../../components/atoms/Colors";
import { useDispatch, useSelector } from "react-redux";
import {
  setGoalIcon,
  setGoalId,
  setGoalName,
  setGoalNote,
  setTargetDate,
  setGoalsList,
  setSavedAmount,
  setTargetAmount,
} from "../../redux/actions";
import {
  Header,
  AddSavedAmountModal,
  GoalHeader,
  GoalsList,
} from "../../components/organisms";
import moment from "moment";
import { CustomProgressCircle } from "../../components/atoms";
import { useIsFocused } from "@react-navigation/native";
import {
  APIRequestDeleteGoal,
  APIRequestGetGoals,
  APIRequestSetGoalReached,
} from "../../services/goals";
const { width } = Dimensions.get("window");

const GoalDetailsScreen = (props) => {
  const { item, monthlySum, thirdBoxTitle, thirdBoxValue } = props.route.params;
  const { token } = useSelector((state) => state.userReducer);
  const { spendingList } = useSelector((state) => state.categoryReducer);
  const [isLoading, setIsLoading] = useState(false);
  const isFocused = useIsFocused();

  let header = {
    headers: { Authorization: token },
  };
  const dispatch = useDispatch();
  ///////////////////////////////METHODS//////////////////////////////////
  useEffect(() => {
    if (isFocused) {
      fetchData();
    }
  }, [isFocused]);

  const fetchData = async () => {
    setIsLoading(true);

    setIsLoading(false);
  };
  const [visible, setVisible] = useState(false);
  const showModal = () => {
    setVisible(true);
  };
  const onPressAddSavedAmount = () => {};

  const onPressSetGoalReached = () => {
    Alert.alert(
      "REACHED GOAL",
      "Are you sure you want to set this goal as reached?",
      [
        {
          text: "Cancel",
        },
        {},
        {
          text: "Yes!",
          onPress: async () => {
            await APIRequestSetGoalReached(item.goal_id, dispatch);
            APIRequestGetGoals(header, dispatch);
            props.navigation.navigate("EnvelopeNavigator");
          },
        },
      ]
    );
  };

  const onPressEdit = () => {
    dispatch(setGoalId(item.goal_id));
    dispatch(setGoalName(item.goal_name));
    dispatch(setTargetAmount(item.target_amount));
    dispatch(setTargetDate(item.target_date));
    dispatch(setSavedAmount(item.saved_amount));
    dispatch(setGoalIcon(item.icon));
    dispatch(setGoalNote(item.goal_note));

    props.navigation.navigate("AddEditGoalScreen", {
      action: "Edit Goal",
    });
  };
  const onPressDelete = () => {
    APIRequestDeleteGoal(item.goal_id, props, header, dispatch);
  };
  return (
    <View>
      <Header
        back
        headerColor={blue}
        navigation={props.navigation}
        editButton
        deleteButton
        title={"Goal Details"}
        onPressEdit={onPressEdit}
        onPressDelete={onPressDelete}
      />
      {isLoading ? (
        <ActivityIndicator size="large" color={darkerGreen} />
      ) : (
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: veryLightGrey,
            paddingBottom: 50,
          }}
        >
          <GoalHeader
            name={item.goal_name}
            icon={item.icon}
            targetDate={moment(item.target_date).format("DD/MM/YY")}
            thisMonth={monthlySum}
            thirdBoxTitle={thirdBoxTitle}
            thirdBoxValue={thirdBoxValue}
          />
          <View>
            <CustomProgressCircle
              saved={item.saved_amount}
              target={item.target_amount}
            />
          </View>
          <View style={{ marginTop: 10 }}>
            <FormButton
              action={"Add Saved Amount"}
              onPress={showModal}
              color={purple}
            />
            <TouchableHighlight
              underlayColor={mostLightGreenEver}
              activeOpacity={1}
              style={[styles.buttonWithoutBackground]}
              onPress={onPressSetGoalReached}
            >
              <Text style={styles.buttonText}>{"Set Goal as Reached"}</Text>
            </TouchableHighlight>
          </View>
        </View>
      )}
      <AddSavedAmountModal
        visible={visible}
        setVisible={setVisible}
        goalId={item.goal_id}
        props={props}
        monthlySum={monthlySum}
      />
    </View>
  );
};

export default GoalDetailsScreen;
const styles = StyleSheet.create({
  // container: { flex: 1 },
  btn: {
    alignSelf: "center",
    //backgroundColor: darkGreen,
    // marginLeft: 200,
    //marginRight: 20,
  },

  transactionsContainer: {},

  overview: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 13,
    // position: "relative",
  },
  buttonWithoutBackground: {
    height: 40,
    borderRadius: 5,
    marginHorizontal: 70,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  buttonText: {
    alignSelf: "center",
    color: lightBlue,
    paddingTop: 10,
  },
});
