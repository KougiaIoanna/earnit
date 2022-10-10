import React, { useEffect, useState } from "react";
import { View, StyleSheet, Dimensions, ActivityIndicator } from "react-native";
import {
  darkGreen,
  purple,
  darkerGreen,
  veryLightGrey,
} from "../../components/atoms/Colors";
import {
  setSpendingList,
  setBudgetsList,
  setBudgetId,
} from "../../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import { BudgetList } from "../../components/organisms";
import { makeCategories2BudgetsList } from "../../utils/budgetMethods";
import { APIRequestGetSpendingCategories } from "../../services/categories";
import { AddEntityButton } from "../../components/atoms";
import { makeListOfCategoriesForBudgetForm } from "../../utils/categoryMethods";
import { APIRequestGetBudgets } from "../../services/budgets";
import client from "../../services/client";

const { width } = Dimensions.get("window");

const BudgetsScreen = (props) => {
  ////////////////////////////////REDUX////////////////////////////////////
  const { token } = useSelector((state) => state.userReducer);
  const { spendingList } = useSelector((state) => state.categoryReducer);
  // const { budgetsList } = useSelector((state) => state.budgetReducer);
  const { transactionsList } = useSelector((state) => state.transactionReducer);

  ////////////////////////////////STATES//////////////////////////////////////
  const [isLoading, setIsLoading] = useState(false);
  ///////////////////////////////FIELDS/////////////////////////////////////
  let header = {
    headers: { Authorization: token },
  };
  const dispatch = useDispatch();
  let listOfCategoriesForNewBudgetForm = [];

  /////////////////////////METHODS////////////////////////////////////////////////

  useEffect(() => {
    let active = true;
    const fetchData = async () => {
      setIsLoading(true);

      if (active) {
        await APIRequestGetSpendingCategories(header, dispatch);
        await APIRequestGetBudgets(header, dispatch);
 
        setIsLoading(false);
      }
    };
    fetchData();
    makeCategories2BudgetsList(spendingList, dispatch);
    return () => {
      active = false;
    };
  }, [transactionsList]);

  const onPressAddButton = async () => {
    await APIRequestGetSpendingCategories(header, dispatch);
    listOfCategoriesForNewBudgetForm = await makeListOfCategoriesForBudgetForm(
      spendingList
    );
    dispatch(setBudgetId(null));
    props.navigation.navigate("AddEditBudgetScreen", {
      action: "New Budget",
      listOfCategoriesForNewBudgetForm: listOfCategoriesForNewBudgetForm,
    });
  };

  return (
    <View style={{ backgroundColor: veryLightGrey, flex: 1 }}>
      <AddEntityButton
        onPress={onPressAddButton}
        color={purple}
        action={"CREATE BUDGET"}
      />
      {isLoading ? (
        <ActivityIndicator size="large" color={darkerGreen} />
      ) : (
        <>
          <BudgetList width={width} props={props} />
        </>
      )}
    </View>
  );
};

export default BudgetsScreen;
const styles = StyleSheet.create({
  btn: {
    alignSelf: "center",
    //backgroundColor: darkGreen,
    // marginLeft: 200,
    //marginRight: 20,
  },
});
