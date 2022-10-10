import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  FlatList,
  RefreshControl,
} from "react-native";
import { purple, mostLightGreenEver, red } from "../../atoms/Colors";
import { useSelector, useDispatch } from "react-redux";
import { setIncomeList, setSpendingList } from "../../../redux/actions";
import { CategoryListItem } from "../../molecules";
import {
  APIRequestGetIncomeCategories,
  APIRequestGetSpendingCategories,
} from "../../../services/categories";
import client from "../../../services/client";

const { width } = Dimensions.get("window");

const CatgegoryList = ({ props, list, entity }) => {
  const { token } = useSelector((state) => state.userReducer);
  const header = {
    headers: { Authorization: token },
  };
  //const query = { category_type: "income" };
  const [refreshing, setRefreshing] = useState(false);
  const { spendingList, incomeList } = useSelector(
    (state) => state.categoryReducer
  );
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let active = true;
    const fetchData = async () => {
      setIsLoading(true);
      const res = await client.get("/category/spending", header);
      const res1 = await client.get("/category/income", header);
      if (active) {
        dispatch(setSpendingList(res.data.message.data));
        dispatch(setIncomeList(res1.data.message.data));
        setIsLoading(false);
      }
    };
    fetchData();
    return () => {
      active = false;
    };
  }, [props.incomeList, props.spendingList]);

  const fetchData = async () => {
    await APIRequestGetIncomeCategories(header, dispatch);
    await APIRequestGetSpendingCategories(header, dispatch);
  };

  const renderItem = ({ item }) => {
    if (item.hide === null) {
      return (
        <CategoryListItem
          item={item}
          navigation={props.navigation}
          entity={entity}
        />
      );
    } else return;
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ListFooterComponent={<View />}
        ListFooterComponentStyle={{ height: 40 }}
        style={styles.list}
        data={list}
        keyExtractor={(item) => item.category_id}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
              fetchData();
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

export default CatgegoryList;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    //paddingBottom: 100,
    //marginBottom: 20,
    marginTop: 10,
    // backgroundColor: red,
  },
  list: {
    backgroundColor: mostLightGreenEver,
    marginLeft: 15,
    marginRight: 15,
    // margin: 8,
    borderRadius: 10,
    flexGrow: 1,
    //padding: 8,
    marginBottom: 20,
  },
});
