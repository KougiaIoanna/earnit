import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";

import {
  veryLightGrey,
  darkGreen,
  lightGreen,
  purple,
  mostLightGreenEver,
  dimmedRed,
  dark,
} from "../../components/atoms/Colors";
import {
  setCategoryIcon,
  setCategoryName,
  setIncomeList,
  setSpendingList,
} from "../../redux/actions";
import { areFormFieldsFilledOut } from "../../utils/authMethods";

import { LabeledInput } from "../../components/molecules";
import {
  FormButton,
  CustomTextInput,
  CategoryIcon,
  CategoryIconButton,
  CustomDropdown,
} from "../../components/atoms";
import { Header } from "../../components/organisms";
import { icons } from "../../components/atoms/CategoryIcons";
import {
  APIRequestCreateCategory,
  APIRequestUpdateCategory,
  APIRequestGetIncomeCategories,
  APIRequestGetSpendingCategories,
} from "../../services/categories";

const height = Dimensions.get("window").height;

const AddEditCategoryScreen = ({ navigation, route }) => {
  const { action, categoryType } = route.params;
  const { id, token } = useSelector((state) => state.userReducer);
  const { categoryId, categoryName, icon } = useSelector(
    (state) => state.categoryReducer
  );
  const header = {
    headers: { Authorization: token },
  };
  const dispatch = useDispatch();
  const [selected, setSelected] = useState();

  const newCategory = {
    token: token,
    categoryName: categoryName,
    categoryType: categoryType,
    icon: selected,
  };

  const saveNewCategory = async () => {
    if (areFormFieldsFilledOut([categoryName])) {
      await APIRequestCreateCategory(newCategory, header, dispatch);
      await APIRequestGetIncomeCategories(header, dispatch);
      await APIRequestGetSpendingCategories(header, dispatch);
      navigation.navigate("CategoriesNavigator");
    }
  };

  const saveEditedCategory = async () => {
    await APIRequestUpdateCategory(categoryId, categoryName, icon);
    if (categoryType === "Spending") {
      await APIRequestGetSpendingCategories(header, dispatch);
    } else {
      await APIRequestGetIncomeCategories(header, dispatch);
    }
    navigation.navigate("CategoriesNavigator");
  };

  const iconSelect = (i) => {
    setSelected(i);
  };
  return (
    <View style={{ height: height }}>
      <Header
        title={action}
        back
        navigation={navigation}
        headerColor={darkGreen}
      />
      <View style={styles.formContainer}>
        {action === "Edit Category" && (
          <>
            <LabeledInput
              label={"Category name"}
              onChangeFunction={(value) => dispatch(setCategoryName(value))}
              value={categoryName}
            />
            <Text style={styles.categoryIconText}>Select icon</Text>
            <ScrollView
              style={styles.iconContainer}
              contentContainerStyle={styles.contentContainerStyle}
            >
              {icons.map((item) => {
                return (
                  <CategoryIconButton
                    icon={item}
                    onPress={() => {
                      setSelected(item);
                      dispatch(setCategoryIcon(item));
                    }}
                    selected={selected}
                  />
                );
              })}
            </ScrollView>
            <FormButton
              action={"SAVE"}
              onPress={saveEditedCategory}
              color={purple}
            />
          </>
        )}
        {action === "New Category" && (
          <>
            <LabeledInput
              label={"Category name"}
              onChangeFunction={(value) => dispatch(setCategoryName(value))}
            />
            <Text style={styles.categoryIconText}>Select icon</Text>
            <ScrollView
              contentContainerStyle={styles.contentContainerStyle}
              style={styles.iconContainer}
            >
              {icons.map((item) => {
                return (
                  <CategoryIconButton
                    icon={item}
                    onPress={() => {
                      setSelected(item);
                      dispatch(setCategoryIcon(item));
                    }}
                    selected={selected}
                  />
                );
              })}
            </ScrollView>

            <FormButton
              action={"SAVE"}
              onPress={saveNewCategory}
              style={styles.button}
              color={purple}
            />
          </>
        )}
      </View>
    </View>
  );
};

export default AddEditCategoryScreen;
const styles = StyleSheet.create({
  formContainer: {
    backgroundColor: veryLightGrey,
    //margin: 10,
    padding: 30,
    flexGrow: 1,
    //flex: 1,
    paddingBottom: 50,
    height: height - 40,
  },
  checkboxContainer: {
    marginTop: 20,
    marginBottom: 20,
    display: "flex",
    flexDirection: "row",
  },
  title: {
    paddingBottom: 10,
    color: purple,
    fontWeight: "bold",
  },
  text: {
    marginLeft: 10,
  },
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
  checkbox: {},
  iconContainer: {
    backgroundColor: mostLightGreenEver,
    borderRadius: 10,
    marginBottom: 20,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
    //justifyContent: "space-evenly",
    // height: 300,
  },
  categoryIconText: {
    paddingBottom: 10,
    color: purple,
    fontWeight: "bold",
    fontSize: 15,
  },
  contentContainerStyle: {
    justifyContent: "space-evenly",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
