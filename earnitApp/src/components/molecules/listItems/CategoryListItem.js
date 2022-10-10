import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { dark, lightGrey } from "../../atoms/Colors";
import {
  setCategoryId,
  setCategoryName,
  setCategoryType,
} from "../../../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import { EditButton, DeleteButton } from "../../atoms";
import { APIRequestDeleteCategory } from "../../../services/categories";
import { APIRequestGetBudgets } from "../../../services/budgets";

const CategoryListItem = ({ item, navigation, entity }) => {
  const { token } = useSelector((state) => state.userReducer);
  let header = {
    headers: { Authorization: token },
  };
  const dispatch = useDispatch();

  const onPressEdit = () => {
    dispatch(setCategoryId(item.category_id));
    dispatch(setCategoryName(item.category_name));
    dispatch(setCategoryType(item.category_type));
    navigation.navigate("AddEditCategoryScreen", {
      action: "Edit Category",
    });
  };

  const onPressDelete = () => {
    APIRequestDeleteCategory(item.category_id, navigation);

    APIRequestGetBudgets(header, dispatch);
  };

  return (
    <View style={styles.categoryContainer}>
      <View style={styles.iconContainer}>
        <Image source={item.category_icon} style={styles.categoryIcon} />
      </View>

      <Text style={styles.name}>{item.category_name}</Text>
      <EditButton onPress={onPressEdit} />
      <DeleteButton onPress={onPressDelete} />
    </View>
  );
};
export default CategoryListItem;

const styles = StyleSheet.create({
  categoryContainer: {
    display: "flex",
    flexDirection: "row",
    marginLeft: 20,
    marginRight: 20,
    borderBottomColor: lightGrey,
    borderBottomWidth: 1,
    marginTop: 5,
    alignItems: "center",
  },
  icon: {
    color: dark,
  },
  name: {
    color: dark,
    fontSize: 18,
    flex: 1,
    marginLeft: 5,
  },
  categoryIcon: {
    width: 30,
    height: 30,
  },
  iconContainer: {
    backgroundColor: "#c8c7d7",
    alignSelf: "center",
    margin: 7,
    marginHorizontal: 4,
    padding: 6,
    borderRadius: 10,
  },
});
