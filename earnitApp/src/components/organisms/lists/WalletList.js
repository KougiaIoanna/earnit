import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
} from "react-native";
import {
  veryLightGrey,
  purple,
  red,
  lightBlue,
  lightGreen,
  lightGrey,
  dark,
} from "../../atoms/Colors";
import { useSelector, useDispatch } from "react-redux";
import { WalletListItem, WalletListItemForCard } from "../../molecules";
import { APIRequestGetWallets } from "../../../services/wallets";
import { BoxItem } from "../../atoms";
import { FontAwesome } from "@expo/vector-icons";

const WalletList = ({ props, width, entity }) => {
  const { token } = useSelector((state) => state.userReducer);
  let header = {
    headers: { Authorization: token },
  };
  const [refreshing, setRefreshing] = useState(false);
  const { walletsList } = useSelector((state) => state.walletReducer);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetchData();
    setIsLoading(false);
  }, []);

  const fetchData = async () => {
    await APIRequestGetWallets(header, dispatch);
  };

  const renderItem = ({ item }) => {
    if (walletsList === []) {
      return (
        <View>
          <TouchableOpacity>
            <Text>Click here to add a wallet!</Text>
          </TouchableOpacity>
        </View>
      );
    }
    if (entity === "home")
      return (
        <WalletListItemForCard item={item} navigation={props.navigation} />
      );
    return <WalletListItem item={item} navigation={props.navigation} />;
  };

  return (
    <SafeAreaView style={(styles.container, { width })}>
      <FlatList
        contentContainerStyle={entity === "home" && styles.home}
        ListFooterComponent={<View />}
        ListFooterComponentStyle={entity !== "home" && { height: 100 }}
        style={entity !== "home" ? styles.list : styles.card}
        data={walletsList}
        numColumns={entity === "home" ? 2 : null}
        //horizontal={entity === "home" ? true : false}
        keyExtractor={(item) => item.wallet_id}
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

export default WalletList;

const styles = StyleSheet.create({
  container: {
    backgroundColor: veryLightGrey,
    //flex: 1,
    justifyContent: "center",
  },
  list: {
    paddingBottom: 50,
  },
  home: {
    //flexDirection: "column",
    // flexWrap: "wrap",
    // display: "flex",
    // flexDirection: "row",
    // justifyContent: "space-around",
    //  flex: 1,
    //  justifyContent: "flex-start",
  },
  card: {},
});
