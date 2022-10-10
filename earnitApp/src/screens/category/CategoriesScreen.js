import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { red, veryLightGrey } from "../../components/atoms/Colors";
import { useSelector, useDispatch } from "react-redux";

import {
  APIRequestGetIncomeCategories,
  APIRequestGetSpendingCategories,
} from "../../services/categories";
import { AddEntityButton } from "../../components/atoms";
import { CategoryList } from "../../components/organisms";

const CategoriesScreen = (props) => {
  let category_id;
  const navigation = props.navigation;
  const category = props.route.name;
  const { spendingList, incomeList } = useSelector(
    (state) => state.categoryReducer
  );
  const { id, token } = useSelector((state) => state.userReducer);

  const header = {
    headers: { Authorization: token },
  };
  const dispatch = useDispatch();

  useEffect(() => {
    APIRequestGetIncomeCategories(header, dispatch);
    APIRequestGetSpendingCategories(header, dispatch);
  }, []);
  return (
    <View style={styles.container}>
      {category === "Spending" ? (
        <>
          <AddEntityButton
            action={"ADD SPENDING CATEGORY"}
            onPress={() => {
              navigation.navigate("AddEditCategoryScreen", {
                action: "New Category",
                categoryType: props.route.name,
              });
            }}
          />
          <CategoryList list={spendingList} props={props} entity={"Spending"} />
        </>
      ) : (
        <>
          <AddEntityButton
            action={"ADD INCOME CATEGORY"}
            onPress={() => {
              navigation.navigate("AddEditCategoryScreen", {
                action: "New Category",
                categoryType: props.route.name,
              });
            }}
          />
          <CategoryList list={incomeList} props={props} entity={"Income"} />
        </>
      )}
    </View>
  );
};
export default CategoriesScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: veryLightGrey,
    flex: 1,
  },
});
