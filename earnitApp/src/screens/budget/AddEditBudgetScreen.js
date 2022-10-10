import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { AntDesign } from "@expo/vector-icons";

import { Header } from "../../components/organisms";
import {
  veryLightGrey,
  darkGreen,
  lightGreen,
  purple,
  blue,
  red,
} from "../../components/atoms/Colors";
import { budgetReducer, categoryReducer } from "../../redux/reducers";
import {
  setBudgetAmount,
  setBudgetBalance,
  setBudgetId,
  setEndDate,
  setBudgetName,
  setSpendingList,
  setBudgetsList,
  setCategories2Budgets,
  setStartDate,
  setBudgetNote,
  setBudgetCreationOver,
} from "../../redux/actions";
import { Store } from "../../redux/store";
import {
  CustomTextInput,
  FormButton,
  CustomDatePicker,
  CustomDropdown,
} from "../../components/atoms";
import { LabeledInput } from "../../components/molecules";

import { areFormFieldsFilledOut } from "../../utils/authMethods";
import { fullDateForDatabase, fullDate } from "../../utils/timeMethods";
import {
  makeCategories2BudgetsList,
  onPressQuestionmark,
  setStartDateIfNull,
} from "../../utils/budgetMethods";
import {
  APICallCreateBudget,
  APICallEditBudget,
  APIRequestCreateBudget,
  APIRequestEditBudget,
  APIRequestUpdateCategoriesWithBudget,
} from "../../services/budgets";
import { makeListOfCategoriesForBudgetForm } from "../../utils/categoryMethods";

const AddEditBudgetScreen = ({ navigation, route }) => {
  const [selected, setSelected] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isBoxSelected, setBoxSelection] = useState(false);

  /////////////////////////////FIELDS/////////////////////////////////////////
  const {
    action,
    listOfCategoriesForNewBudgetForm,
    listOfCategoriesForEditForm,
    previusAmount,
    previusBalance,
  } = route.params;
  const { token } = useSelector((state) => state.userReducer);
  let header = {
    headers: { Authorization: token },
  };
  const signs = [
    { label: "+", value: "+" },
    { label: "-", value: "-" },
  ];
  const [selectedSign, setSelectedSign] = useState();

  //const { categories2Budgets } = useSelector((state) => state.categoryReducer);
  var budgetsList = Store.getState().budgetReducer.budgetsList;
  const {
    budgetId,
    budgetName,
    budgetAmount,
    budgetBalance,
    endDate,
    budgetNote,
    startDate,
    setBudgetsListDetails,
  } = useSelector((state) => state.budgetReducer);
  const dispatch = useDispatch();
  const mandatoryFields = [budgetName, budgetAmount, budgetBalance, endDate];
  const newBudget = {
    budgetName: budgetName,
    budgetAmount: budgetAmount,
    budgetBalance: budgetBalance,
    endDate: endDate,
    budgetNote: budgetNote,
    startDate: startDate,
  };
  //////////////////////////////METHODS///////////////////////////////////////
  const onPressSave = async () => {
    setIsLoading(true);
    setStartDateIfNull(startDate, dispatch);
    if (areFormFieldsFilledOut(mandatoryFields)) {
      await APIRequestCreateBudget(newBudget, header, selected, dispatch);
      setIsLoading(false);
    }
  };

  const saveEditedBudget = async () => {
    setIsLoading(true);
    const newBudget = {
      budgetId: budgetId,
      budgetName: budgetName,
      budgetAmount: parseInt(budgetAmount),
      budgetBalance: parseInt(budgetBalance),
      startDate: startDate,
      endDate: fullDateForDatabase(endDate),
      budgetNote: budgetNote,
    };
    await APIRequestEditBudget(newBudget, header, dispatch);
    setIsLoading(false);
    navigation.navigate("EnvelopeNavigator");
  };

  const changeAmount = (value) => {
    if (selectedSign === "-") {
      dispatch(setBudgetAmount(previusAmount - parseInt(value)));
      dispatch(setBudgetBalance(previusBalance - parseInt(value)));
    } else {
      dispatch(setBudgetAmount(previusAmount + parseInt(value)));
      dispatch(setBudgetBalance(previusBalance + parseInt(value)));
    }
  };

  return (
    <>
      <>
        <Header
          title={action}
          back
          navigation={navigation}
          headerColor={action === "Edit Budget" ? blue : darkGreen}
        />
      </>

      <ScrollView style={styles.page}>
        <View style={styles.formContainer}>
          {action === "Edit Budget" && (
            <>
              <LabeledInput
                label={"Budget Name"}
                onChangeFunction={(value) => dispatch(setBudgetName(value))}
                value={budgetName}
              />
              <Text style={styles.label}>
                Current Budget Amount: {previusAmount}€
              </Text>
              <Text style={styles.label}>Add or subtrack amount</Text>
              <View style={styles.changeAmount}>
                <CustomDropdown
                  data={signs}
                  placeholder={"+"}
                  selected={selectedSign}
                  setSelected={setSelectedSign}
                  width={50}
                />
                <CustomTextInput
                  number={10}
                  width={200}
                  keyboardType={"numeric"}
                  onChangeFunction={(value) => {
                    changeAmount(value);
                  }}
                />
                <Text style={{ fontSize: 30, color: purple }}>€</Text>
              </View>

              <View>
                <Text style={styles.title}>End Date</Text>
                <CustomDatePicker
                  dispatch={dispatch}
                  reduxSetter={setEndDate}
                  value={fullDate(endDate)}
                  minimumDate={new Date(startDate)}
                  previusEndDate={new Date(endDate)}
                />
              </View>
              <LabeledInput
                label={"Note"}
                onChangeFunction={(value) => {
                  dispatch(setBudgetNote(value));
                }}
                value={budgetNote}
              />
              <View style={styles.button}>
                <FormButton
                  action={"SAVE"}
                  onPress={() => {
                    saveEditedBudget();
                  }}
                  color={purple}
                />
              </View>
            </>
          )}
          {action === "New Budget" && (
            <>
              <LabeledInput
                label={"Budget Name *"}
                onChangeFunction={(value) => dispatch(setBudgetName(value))}
                placeholder={"e.x. super market"}
              />
              <LabeledInput
                label={"Budget Amount *"}
                onChangeFunction={(value) => {
                  dispatch(setBudgetAmount(value));
                  dispatch(setBudgetBalance(value));
                }}
                keyboardType={"numeric"}
                placeholder={"e.x 100"}
              />
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "baseline",
                }}
              >
                <Text style={[styles.label, { marginRight: 5 }]}>
                  Spending categories:
                </Text>
                <AntDesign
                  name="questioncircle"
                  size={15}
                  color={purple}
                  onPress={onPressQuestionmark}
                />
              </View>

              <CustomDropdown
                data={listOfCategoriesForNewBudgetForm}
                placeholder={"Select from available Categories"}
                selected={selected}
                setSelected={setSelected}
                multi
              />
              <View style={styles.dates}>
                <View>
                  <Text style={styles.label}>Start Date</Text>
                  <CustomDatePicker
                    dispatch={dispatch}
                    reduxSetter={setStartDate}
                    value={fullDate(new Date())}
                    minimumDate={new Date()}
                  />
                </View>
                <View>
                  <Text style={styles.label}>End Date *</Text>
                  <CustomDatePicker
                    dispatch={dispatch}
                    reduxSetter={setEndDate}
                    showCurrentDate={false}
                    value={"dd/mm/yy"}
                  />
                </View>
              </View>

              <LabeledInput
                label={"Note"}
                onChangeFunction={(value) => {
                  dispatch(setBudgetNote(value));
                }}
              />
              <View style={styles.button}>
                <FormButton
                  action={"SAVE"}
                  onPress={async () => {
                    await onPressSave();

                    navigation.navigate("EnvelopeNavigator");
                  }}
                  color={purple}
                />
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </>
  );
};

export default AddEditBudgetScreen;

const styles = StyleSheet.create({
  page: {
    backgroundColor: veryLightGrey,
    flex: 1,
  },
  formContainer: {
    marginTop: 20,
    // margin: 20,
    padding: 30,
    borderRadius: 20,
    display: "flex",
    flexDirection: "column",
    //justifyContent: "center",
    // backgroundColor: red,
    flex: 1,
  },
  title: {
    paddingBottom: 10,
    color: purple,
    fontWeight: "bold",
  },
  changeAmount: {
    display: "flex",
    flexDirection: "row",
    // alignSelf: "center",
    justifyContent: "space-between",
  },
  dates: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  checkboxContainer: {
    marginTop: 20,
    marginBottom: 20,
    display: "flex",
    flexDirection: "row",
  },
  startDate: {},
  box: {},
  button: {
    paddingTop: 20,
    //marginTop: 20,
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
