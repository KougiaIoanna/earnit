import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { BudgetProgressBar, DotAndCategoryName } from "../atoms";
import { dark, darkGreen, dimmedRed, purple, rainbow } from "../atoms/Colors";

const BudgetBarChart = ({
  budgetName,
  balance,
  budgetAmount,
  categoriesNames,
  dontShowName,
  dontShowCategories,
}) => {
  let spent = 0;
  let leftToSpend = 0;
  let overspend = 0;
  let progress = 0;
  let progressOverspend = 0;
  const fraction = balance / budgetAmount;
  progress = 1 - fraction;
  progressOverspend = -fraction;

  return (
    <>
      {!dontShowName && !dontShowCategories ? (
        <Text style={styles.name}>{budgetName}</Text>
      ) : null}
      {!dontShowCategories ? (
        <View style={styles.categories}>
          {categoriesNames.map((category) => {
            return <DotAndCategoryName dotColor={purple} category={category} />;
          })}
        </View>
      ) : null}

      {progress === 0 && (
        <BudgetProgressBar
          balance={balance}
          budgetAmount={budgetAmount}
          leftToSpend={
            0.0000000000000000000000000000000000000000000000000000000000000000000000000001
          }
          footerOnTop={dontShowCategories ? true : false}
          budgetName={budgetName}
        />
      )}
      {balance >= 0 && (
        <BudgetProgressBar
          leftToSpend={progress}
          balance={balance}
          budgetAmount={budgetAmount}
          footerOnTop={dontShowCategories ? true : false}
          budgetName={budgetName}
        />
      )}
      {balance < 0 && (
        <BudgetProgressBar
          overspend={progressOverspend}
          balance={balance}
          budgetAmount={budgetAmount}
          footerOnTop={dontShowCategories ? true : false}
          budgetName={budgetName}
        />
      )}
    </>
  );
};
export default BudgetBarChart;

const styles = StyleSheet.create({
  icon: {
    justifyContent: "flex-end",
    fontSize: 30,
    padding: 5,
    color: darkGreen,
  },
  name: {
    color: dark,
    fontWeight: "bold",
    fontSize: 18,
    marginLeft: 15,
  },
  amount: {
    color: dark,
  },
  categories: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginLeft: 15,
  },
  category: {
    // flexDirection: "row",
  },
});
