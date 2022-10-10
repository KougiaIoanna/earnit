import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Header, CustomDropdown } from "../../components/organisms";
import {
  veryLightGrey,
  darkGreen,
  lightGreen,
  purple,
  mostLightGreenEver,
  blue,
} from "../../components/atoms/Colors";
import { LabeledInput } from "../../components/molecules";
import {
  FormButton,
  CustomDatePicker,
  CategoryIconButton,
} from "../../components/atoms";
import {
  setGoalIcon,
  setGoalName,
  setGoalNote,
  setTargetDate,
  setGoalsList,
  setSavedAmount,
  setTargetAmount,
} from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { areFormFieldsFilledOut } from "../../utils/authMethods";
import { flushSync } from "react-dom";
import { Store } from "../../redux/store";
import { goalIcons } from "../../components/atoms/CategoryIcons";
import {} from "../../components/atoms";
import {
  APIRequestCreateGoal,
  APIRequestEditGoal,
  APIRequestGetGoals,
} from "../../services/goals";
import { fullDate } from "../../utils/timeMethods";
import moment from "moment";

const AddEditGoalScreen = (props) => {
  ////////////////////////////FIELDS////////////////////////////////////
  const { token } = useSelector((state) => state.userReducer);
  const { action, previusAmount } = props.route.params;
  const [selected, setSelected] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const {
    goalId,
    goalName,
    goalNote,
    targetDate,
    targetAmount,
    savedAmount,
    goalIcon,
  } = useSelector((state) => state.goalReducer);
  const mandatoryFields = [goalName, selected];

  let header = {
    headers: { Authorization: token },
  };
  ///////////////////////////METHODS////////////////////////////////////
  const onPressSaveNew = async () => {
    setIsLoading(true);

    const newGoal = {
      goalName: goalName,
      targetAmount: targetAmount,
      savedAmount: savedAmount,
      targetDate: targetDate,
      goalNote: goalNote,
      icon: selected,
    };
    if (areFormFieldsFilledOut(mandatoryFields)) {
      await APIRequestCreateGoal(header, newGoal, dispatch);
      await APIRequestGetGoals(header, dispatch);
      props.navigation.navigate("EnvelopeNavigator");
    }
    setIsLoading(false);
  };

  const onPressSaveEdited = () => {
    setIsLoading(true);
    const newGoal = {
      goalId: parseInt(goalId),
      goalName: goalName,
      targetAmount: targetAmount,
      savedAmount: savedAmount,
      targetDate: moment(targetDate).format("YYYY-MM-DD"),
      goalNote: null,
      icon: goalIcon,
    };
    APIRequestEditGoal(newGoal, header, dispatch);
    setIsLoading(false);
    props.navigation.navigate("EnvelopeNavigator");
  };
  return (
    <View style={{ backgroundColor: veryLightGrey, flex: 1 }}>
      <Header
        title={action}
        back
        navigation={props.navigation}
        headerColor={action === "Edit Goal" ? blue : darkGreen}
        //previousScreen={"BudgetsScreen"}
      />
      <ScrollView>
        <View style={styles.formContainer}>
          {action === "Edit Goal" && (
            <>
              <LabeledInput
                label={"Goal name"}
                onChangeFunction={(value) => dispatch(setGoalName(value))}
                value={goalName}
              />

              <LabeledInput
                label={"Tagret amount"}
                onChangeFunction={(value) => {
                  dispatch(setTargetAmount(parseInt(value)));
                }}
                keyboardType={"number-pad"}
                value={targetAmount ? JSON.stringify(targetAmount) : null}
              />

              <View>
                <Text style={styles.title}>Desired Date</Text>
                <CustomDatePicker
                  dispatch={dispatch}
                  reduxSetter={setTargetDate}
                  value={targetDate ? fullDate(targetDate) : null}
                  minimumDate={new Date()}
                  previusEndDate={new Date(targetDate)}
                />
              </View>

              <LabeledInput
                label={"Note"}
                onChangeFunction={(value) => {
                  dispatch(setGoalNote(value));
                }}
                value={goalNote}
              />
              <FormButton
                action={"SAVE"}
                onPress={() => {
                  onPressSaveEdited();
                }}
                color={purple}
              />
            </>
          )}
          {action === "New Goal" && (
            <>
              <LabeledInput
                label={"Goal Name *"}
                onChangeFunction={(value) => dispatch(setGoalName(value))}
              />
              <LabeledInput
                label={"Target Amount"}
                onChangeFunction={(value) => {
                  dispatch(setTargetAmount(value));
                }}
                keyboardType={"numeric"}
              />

              <Text style={styles.title}>Desired Date</Text>
              <CustomDatePicker
                dispatch={dispatch}
                reduxSetter={setTargetDate}
                showCurrentDate={false}
                //value={"dd/mm/yy"}
                minimumDate={new Date()}
              />

              <LabeledInput
                label={"Note"}
                onChangeFunction={(value) => {
                  dispatch(setGoalNote(value));
                }}
              />
              <Text style={styles.title}>Select icon</Text>
              <ScrollView horizontal={true} style={styles.iconContainer}>
                {goalIcons.map((item) => {
                  return (
                    <CategoryIconButton
                      icon={item}
                      onPress={() => {
                        setSelected(item);
                        dispatch(setGoalIcon(item));
                      }}
                      selected={selected}
                    />
                  );
                })}
              </ScrollView>
              <View style={styles.button}>
                <FormButton
                  action={"SAVE"}
                  onPress={() => {
                    onPressSaveNew();
                    props.navigation.navigate("EnvelopeNavigator");
                  }}
                  color={purple}
                />
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default AddEditGoalScreen;

const styles = StyleSheet.create({
  formContainer: {
    marginTop: 20,
    backgroundColor: veryLightGrey,
    // margin: 20,
    padding: 30,
    borderRadius: 20,
    flex: 1,
  },
  iconContainer: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: mostLightGreenEver,
    borderRadius: 10,
    marginBottom: 20,
    flex: 1,
  },
  title: {
    paddingBottom: 10,
    color: purple,
    fontWeight: "bold",
  },
  checkboxContainer: {
    marginTop: 20,
    marginBottom: 20,
    display: "flex",
    flexDirection: "row",
  },
  box: {},
  button: {
    paddingTop: 20,
  },
  input: {
    //flexDirection: "row",
    backgroundColor: veryLightGrey,
  },
  multiline: {
    display: "flex",
  },
  label: {
    paddingBottom: 10,
    color: purple,
    fontWeight: "bold",
    fontSize: 15,
  },
});
