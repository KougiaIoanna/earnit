import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  FlatList,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import { veryLightGrey, purple, red } from "../../atoms/Colors";
import { useSelector, useDispatch } from "react-redux";
import {
  setBudgetAmount,
  setBudgetBalance,
  setBudgetName,
  setBudgetsList,
  setTransactionsList,
} from "../../../redux/actions";
import moment from "moment";
import {
  findPeriodUntil,
  isExpiredBudget,
  makeCategories2BudgetsList,
  makeListOfBudgetCategories,
} from "../../../utils/budgetMethods";
import { APIRequestGetBudgets } from "../../../services/budgets";
import { APIRequestDeleteCategoriesFromBudget } from "../../../services/categories";
import {
  BudgetBarChart,
  BudgetListItem,
  BudgetListItemForCard,
} from "../../molecules";

const BudgetList = ({ props, width, entity }) => {
  const { token } = useSelector((state) => state.userReducer);
  const { transactionsList } = useSelector((state) => state.transactionReducer);

  const [refreshing, setRefreshing] = useState(false);
  const { budgetsList } = useSelector((state) => state.budgetReducer);
  const { categories2Budgets, spendingList } = useSelector(
    (state) => state.categoryReducer
  );
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  let categoriesNames = [];
  var period = "";
  let header = {
    headers: { Authorization: token },
  };

 

  const renderItem = ({ item }) => {
    if (categories2Budgets !== undefined)
      categoriesNames = makeListOfBudgetCategories(item, categories2Budgets);
    if (isExpiredBudget(item.end_date)) {
      APIRequestDeleteCategoriesFromBudget(categoriesNames, header, dispatch);
    }
    if (categoriesNames.length !== 0 && item !== undefined) {
      if (entity === "home") {
        return (
          <BudgetListItemForCard
            item={item}
            navigation={props.navigation}
            categoriesNames={categoriesNames}
          />
        );
      }
      var periodChanged = false;
      if (period !== findPeriodUntil(item.end_date)) {
        periodChanged = true;
        period = findPeriodUntil(item.end_date);
      }
      return (
        <BudgetListItem
          item={item}
          navigation={props.navigation}
          categoriesNames={categoriesNames}
          periodChanged={periodChanged}
          period={period}
        />
      );
    }
  };
  return (
    <SafeAreaView style={(styles.container, { width })}>
      <FlatList
        ListFooterComponent={<View />}
        ListFooterComponentStyle={
          entity !== "home" && { height: 100, marginBottom: 20 }
        }
        style={entity !== "home" ? styles.list : styles.card}
        data={budgetsList}
        keyExtractor={(item) => item.budget_id}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
              APIRequestGetBudgets(header, dispatch);
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

export default BudgetList;

const styles = StyleSheet.create({
  container: {
    backgroundColor: veryLightGrey,
  },
  list: {
    paddingBottom: 50,
  },
});
