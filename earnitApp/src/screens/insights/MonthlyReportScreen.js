import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { CategoryIconForDisplay } from "../../components/atoms";
import {
  darkGreen,
  darkGrey,
  grey,
  lighterPurple,
  lightGreen,
  lightGrey,
  mostLightGreenEver,
  purple,
  red,
  veryLightGrey,
} from "../../components/atoms/Colors";
import { Header, ReportList } from "../../components/organisms";
import {
  findCategory,
  findCategoryIcon,
  findCategoryType,
} from "../../utils/categoryMethods";
import { getListOfMonthsUntilLastMonth } from "../../utils/timeMethods";

const MonthlyReportScreen = (props) => {
  const { title, sums, iSum, sSum, prevISum, prevSSum } = props.route.params;

  const { spendingList, incomeList } = useSelector(
    (state) => state.categoryReducer
  );
  return (
    <View style={styles.container}>
      <Header back title={title} headerColor={darkGreen} />

      <View style={styles.outerBox}>
        <View style={styles.header}>
          <View style={styles.headerCategories}>
            <Text style={{ color: mostLightGreenEver }}>Categories</Text>
          </View>
          <View style={{ marginRight: 8, flex: 1, alignSelf: "center" }}>
            <Text style={{ color: mostLightGreenEver }}>Total</Text>
            <Text style={{ color: mostLightGreenEver }}>amounts</Text>
          </View>
          <View style={{ marginRight: 8, alignSelf: "center" }}>
            <Text style={{ color: mostLightGreenEver }}>VS</Text>
            <Text style={{ color: mostLightGreenEver }}>previous</Text>
            <Text style={{ color: mostLightGreenEver }}>month</Text>
          </View>
        </View>
        <View style={styles.titleLine}>
          <Text style={{ fontWeight: "bold", paddingLeft: 30, flex: 2 }}>
            Income
          </Text>
          <Text style={{ fontWeight: "bold", flex: 1.2 }}>{iSum}</Text>
          {prevISum < iSum && prevISum !== 0 && (
            <Text style={{ color: darkGreen, fontWeight: "bold" }}>
              +{Math.floor(((iSum - prevISum) / prevISum) * 100)}%
            </Text>
          )}
          {prevISum > iSum && prevISum !== 0 && (
            <Text style={{ color: red, fontWeight: "bold" }}>
              -{Math.floor(((prevISum - iSum) / prevISum) * 100)}%
            </Text>
          )}
          {prevISum === 0 && <Text style={{ fontWeight: "bold" }}>---</Text>}
        </View>
        {sums.map((item, key) => {
          let type = findCategoryType(item.category, incomeList, spendingList);
          if (type === "Income") {
            let name = findCategory(item.category, incomeList, spendingList);
            let icon = findCategoryIcon(
              item.category,
              incomeList,
              spendingList
            );
            return (
              <View style={styles.otherLine}>
                <View style={styles.category}>
                  <CategoryIconForDisplay icon={icon} />
                  <Text style={{ marginLeft: 5 }}>{name}</Text>
                </View>
                <View style={styles.sum}>
                  <Text>{item.sum}</Text>
                </View>
                <View style={styles.sum}>
                  {item.sum > item.prevSum && item.prevSum !== "" && (
                    <Text style={{ color: darkGreen }}>
                      +{Math.floor(((item.sum - item.prevSum) / item.prevSum) * 100)}%
                    </Text>
                  )}
                  {item.sum < item.prevSum && item.prevSum !== "" && (
                    <Text style={{ color: red }}>
                      -{Math.floor(((item.prevSum - item.sum) / item.prevSum) * 100)}%
                    </Text>
                  )}
                  {item.prevSum === "" && <Text>---</Text>}
                </View>
              </View>
            );
          }
        })}
        <View style={styles.titleLine}>
          <Text style={{ fontWeight: "bold", flex: 2, paddingLeft: 30 }}>
            Spending
          </Text>
          <Text
            style={{ fontWeight: "bold", flex: 1.2, justifyContent: "flex-end" }}
          >
            {sSum}
          </Text>
          {prevSSum < sSum && prevSSum !== 0 && (
            <Text style={{ color: red, fontWeight: "bold" }}>
              +{Math.floor(((sSum - prevSSum) / prevSSum) * 100)}%
            </Text>
          )}
          {prevSSum > sSum && prevSSum !== 0 && (
            <Text style={{ color: darkGreen, fontWeight: "bold" }}>
              {Math.floor(((sSum - prevSSum) / prevSSum) * 100)}%
            </Text>
          )}
          {prevSSum === 0 && <Text style={{ fontWeight: "bold" }}>---</Text>}
        </View>
        {sums.map((item) => {
          let type = findCategoryType(item.category, incomeList, spendingList);
          if (type === "Spending") {
            let name = findCategory(item.category, incomeList, spendingList);
            let icon = findCategoryIcon(
              item.category,
              incomeList,
              spendingList
            );
            return (
              <View style={styles.otherLine}>
                <View style={styles.category}>
                  <CategoryIconForDisplay icon={icon} />
                  <Text style={{ marginLeft: 5 }}>{name}</Text>
                </View>
                <View style={styles.sum}>
                  <Text>{item.sum}</Text>
                </View>
                <View style={styles.sum}>
                  {item.sum >= item.prevSum && item.prevSum !== "" && (
                    <Text style={{ color: darkGreen }}>
                      +{Math.floor(((item.sum - item.prevSum) / item.prevSum) * 100)}%
                    </Text>
                  )}
                  {item.sum < item.prevSum && item.prevSum !== "" && (
                    <Text style={{ color: red }}>
                      {Math.floor(((item.sum - item.prevSum) / item.prevSum) * 100)}%
                    </Text>
                  )}
                  {item.prevSum === "" && <Text>---</Text>}
                </View>
              </View>
            );
          }
        })}
      </View>
    </View>
  );
};

export default MonthlyReportScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: veryLightGrey,
  },
  outerBox: {
    marginTop: 20,
    paddingBottom: 10,
    backgroundColor: veryLightGrey,
    marginHorizontal: 10,
    borderRadius: 5,
    //paddingTop: 10,
    //flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  titleLine: {
    flexDirection: "row",
    // justifyContent: "space-evenly",
    padding: 5,
    backgroundColor: mostLightGreenEver,
    marginHorizontal: 10,
    //borderBottomColor: lightGrey,
    // borderBottomWidth: 1,
    //marginTop: 10,
    // paddingLeft: 20,
  },
  otherLine: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    padding: 3,
    alignItems: "center",
    borderTopColor: lightGrey,
    borderTopWidth: 1,
    marginHorizontal: 10,
  },
  category: {
    paddingLeft: 20,
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  sum: {
    flexDirection: "row",
    //   alignItems: "flex-end",
    justifyContent: "flex-end",
    flex: 1,
  },
  header: {
    flexDirection: "row",
    backgroundColor: purple,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    marginBottom: 5,
  },
  headerCategories: {
    marginRight: 8,
    flex: 2,
    alignSelf: "center",
    marginLeft: 40,
  },
});
