export const SET_USER_EMAIL = "SET_USER_EMAIL";
export const SET_USER_PASSWORD = "SET_USER_PASSWORD";
export const SET_CONFIRM_PASSWORD = "SET_CONFIRM_PASSWORD";
export const SET_USERNAME = "SET_USERNAME";
export const SET_ID = "SET_ID";
export const SET_TOKEN = "SET_TOKEN";
export const SET_IS_LOGGEDIN = "SET_IS_LOGGEDIN";
export const SET_WALLET_BALANCE = "SET_ACCOUNT_BALANCE";
export const SET_WALLET_NAME = "SET_ACCOUNT_NAME";
export const SET_WALLET_ID = "SET_ACCOUNT_ID";
export const SET_WALLETS_LIST = "SET_ACCOUNTS_LIST";
export const SET_CATEGORY_NAME = "SET_CATEGORY_NAME";
export const SET_CATEGORY_TYPE = "SET_CATEGORY_TYPE";
export const SET_INCOME_LIST = "SET_INCOME_LIST";
export const SET_SPENDING_LIST = "SET_SPENDING_LIST";
export const SET_CATEGORY_ID = "SET_CATEGORY_ID";
export const SET_SPENDING_SUM = "SET_SPENDING_SUM";
export const SET_INCOME_SUM = "SET_INCOME_SUM";

export const SET_BUDGET_AMOUNT = "SET_BUDGET_AMOUNT";
export const SET_BUDGET_BALANCE = "SET_BUDGET_BALANCE";
export const SET_BUDGET_ID = "SET_BUDGET_ID";
export const SET_BUDGET_LIST = "SET_BUDGET_LIST";
export const SET_BUDGET_NAME = "SET_BUDGET_NAME";
export const SET_BUDGET_NOTE = "SET_BUDGET_NOTE";
export const SET_END_DATE = "SET_END_DATE";
export const SET_BUDGETS_LIST = "SET_BUDGETS_LIST";
export const SET_TRANSACTION_AMOUNT = "SET_TRANSACTION_AMOUNT";
export const SET_TRANSACTION_ID = "SET_TRANSACTION_ID";
export const SET_TRANSACTION_NOTE = "SET_TRANSACTION_NOTE";
export const SET_TRANSACTION_DATE = "SET_TRANSACTION_DATE";
export const SET_TRANSACTIONS_LIST = "SET_TRANSACTIONS_LIST";
export const SET_TRANSACTIONS_LIST_FOR_CHART =
  "SET_TRANSACTIONS_LIST_FOR_CHART";
export const SET_TRANSACTIONS_LIST_FOR_BUDGET =
  "SET_TRANSACTIONS_LIST_FOR_BUDGET";
export const SET_CATEGORIES2BUDGETS = "SET_CATEGORIES2BUDGETS";

export const SET_START_DATE = "SET_START_DATE";
export const SET_CATEGORY_ICON = "SET_CATEGORY_ICON";
export const SET_WALLETS_FOR_DROPDOWN = "SET_WALLETS_FOR_DROPDOWN";
export const SET_INTERVAL = "SET_INTERVAL";
export const SET_RECURRING_TRANSACTIONS_LIST =
  "SET_RECURRING_TRANSACTIONS_LIST";
export const SET_TRANSACTION_DATE_RANGE_TITLE =
  "SET_TRANSACTION_DATE_RANGE_TITLE";
export const SET_TRANSACTION_CUSTOM_DATE_RANGE =
  "SET_TRANSACTION_CUSTOM_DATE_RANGE";
export const SET_TRANSACTIONS_SUMS_BY_CATEGORY =
  "SET_TRANSACTIONS_SUMS_BY_CATEGORY";
export const SET_TRANSACTIONS_BY_WALLET = "SET_TRANSACTIONS_BY_WALLET";
export const SET_TRANSACTION_DUE_TODAY = "SET_TRANSACTION_DUE_TODAY";
export const SET_TRANSACTION_OVERDUE = "SET_TRANSACTION_OVERDUE";
export const SET_DAILY_TRANSACTIONS = "SET_DAILY_TRANSACTIONS";
export const SET_GOAL_ID = "SET_GOAL_ID";
export const SET_GOALS_LIST = "SET_GOALS_LIST";
export const SET_GOAL_NAME = "SET_GOAL_NAME";
export const SET_GOAL_NOTE = "SET_GOAL_NOTE";
export const SET_TARGET_DATE = "SET_TARGET_DATE";
export const SET_TARGET_AMOUNT = "SET_TARGET_AMOUNT";
export const SET_SAVED_AMOUNT = "SET_SAVED_AMOUNT";
export const SET_GOAL_ICON = "SET_GOAL_ICON";
export const SET_GOAL_MONTHLY_SUM = "SET_GOAL_MONTHLY_SUM";
export const SET_CHART_DATE_RANGE_TITLE = "SET_CHART_DATE_RANGE_TITLE";
export const SET_CHART_CUSTOM_DATE_RANGE = "SET_CHART_CUSTOM_DATE_RANGE";
export const SET_GOAL_REACHED = "SET_GOAL_REACHED";
//Auth
export const setUsername = (username) => (dispatch) => {
  dispatch({
    type: SET_USERNAME,
    payload: username,
  });
};
export const setEmail = (email) => (dispatch) => {
  dispatch({
    type: SET_USER_EMAIL,
    payload: email,
  });
};
export const setPassword = (password) => (dispatch) => {
  dispatch({
    type: SET_USER_PASSWORD,
    payload: password,
  });
};
export const setConfirmPassword = (confirmPassword) => (dispatch) => {
  dispatch({
    type: SET_CONFIRM_PASSWORD,
    payload: confirmPassword,
  });
};
export const setId = (id) => (dispatch) => {
  dispatch({
    type: SET_ID,
    payload: id,
  });
};
export const setToken = (token) => (dispatch) => {
  dispatch({
    type: SET_TOKEN,
    payload: token,
  });
};
export const setIsLoggedin = (isLoggedin) => (dispatch) => {
  dispatch({
    type: SET_IS_LOGGEDIN,
    payload: isLoggedin,
  });
};

//wallet
export const setWalletId = (walletId) => (dispatch) => {
  dispatch({
    type: SET_WALLET_ID,
    payload: walletId,
  });
};
export const setWalletName = (walletName) => (dispatch) => {
  dispatch({
    type: SET_WALLET_NAME,
    payload: walletName,
  });
};
export const setWalletBalance = (walletBalance) => (dispatch) => {
  dispatch({
    type: SET_WALLET_BALANCE,
    payload: walletBalance,
  });
};
export const setWalletsList = (walletsList) => (dispatch) => {
  //do not change to lowercase, server crashes AccountsListDetails
  dispatch({
    type: SET_WALLETS_LIST,
    payload: walletsList,
  });
};

export const setWalletsForDropdown = (walletsForDropdown) => (dispatch) => {
  dispatch({
    type: SET_WALLETS_FOR_DROPDOWN,
    payload: walletsForDropdown,
  });
};

//category
export const setCategoryId = (categoryId) => (dispatch) => {
  dispatch({
    type: SET_CATEGORY_ID,
    payload: categoryId,
  });
};
export const setCategoryName = (categoryName) => (dispatch) => {
  dispatch({
    type: SET_CATEGORY_NAME,
    payload: categoryName,
  });
};
export const setCategoryType = (categoryType) => (dispatch) => {
  dispatch({
    type: SET_CATEGORY_TYPE,
    payload: categoryType,
  });
};
export const setSpendingList = (spendingList) => (dispatch) => {
  dispatch({
    type: SET_SPENDING_LIST,
    payload: spendingList,
  });
};
export const setIncomeList = (incomeList) => (dispatch) => {
  dispatch({
    type: SET_INCOME_LIST,
    payload: incomeList,
  });
};
export const setCategoryIcon = (icon) => (dispatch) => {
  dispatch({
    type: SET_CATEGORY_ICON,
    payload: icon,
  });
};
export const setSpendingSum = (spendingSum) => (dispatch) => {
  dispatch({
    type: SET_SPENDING_SUM,
    payload: spendingSum,
  });
};
export const setIncomeSum = (incomeSum) => (dispatch) => {
  dispatch({
    type: SET_INCOME_SUM,
    payload: incomeSum,
  });
};
//////CATEGORIES CORRESPONDING TO BUDGETs list//////////
export const setCategories2Budgets = (categories2Budgets) => (dispatch) => {
  dispatch({
    type: SET_CATEGORIES2BUDGETS,
    payload: categories2Budgets,
  });
};
//////////////////////////////////////////////////

//budgets
export const setBudgetId = (budgetId) => (dispatch) => {
  dispatch({
    type: SET_BUDGET_ID,
    payload: budgetId,
  });
};
export const setBudgetName = (budgetName) => (dispatch) => {
  dispatch({
    type: SET_BUDGET_NAME,
    payload: budgetName,
  });
};
export const setEndDate = (endDate) => (dispatch) => {
  dispatch({
    type: SET_END_DATE,
    payload: endDate,
  });
};
export const setBudgetAmount = (budgetAmount) => (dispatch) => {
  dispatch({
    type: SET_BUDGET_AMOUNT,
    payload: budgetAmount,
  });
};
export const setBudgetBalance = (budgetBalace) => (dispatch) => {
  dispatch({
    type: SET_BUDGET_BALANCE,
    payload: budgetBalace,
  });
};
export const setBudgetNote = (budgetNote) => (dispatch) => {
  dispatch({
    type: SET_BUDGET_NOTE,
    payload: budgetNote,
  });
};
export const setBudgetsList = (budgetsList) => (dispatch) => {
  dispatch({
    type: SET_BUDGETS_LIST,
    payload: budgetsList,
  });
};

export const setStartDate = (startDate) => (dispatch) => {
  dispatch({
    type: SET_START_DATE,
    payload: startDate,
  });
};

//savings
export const setGoalId = (goalId) => (dispatch) => {
  dispatch({
    type: SET_GOAL_ID,
    payload: goalId,
  });
};

export const setGoalName = (goalName) => (dispatch) => {
  dispatch({
    type: SET_GOAL_NAME,
    payload: goalName,
  });
};

export const setTargetAmount = (targetAmount) => (dispatch) => {
  dispatch({
    type: SET_TARGET_AMOUNT,
    payload: targetAmount,
  });
};

export const setTargetDate = (targetDate) => (dispatch) => {
  dispatch({
    type: SET_TARGET_DATE,
    payload: targetDate,
  });
};

export const setGoalNote = (goalNote) => (dispatch) => {
  dispatch({
    type: SET_GOAL_NOTE,
    payload: goalNote,
  });
};

export const setGoalsList = (goalsList) => (dispatch) => {
  dispatch({
    type: SET_GOALS_LIST,
    payload: goalsList,
  });
};

export const setSavedAmount = (savedAmount) => (dispatch) => {
  dispatch({
    type: SET_SAVED_AMOUNT,
    payload: savedAmount,
  });
};

export const setGoalIcon = (goalIcon) => (dispatch) => {
  dispatch({
    type: SET_GOAL_ICON,
    payload: goalIcon,
  });
};

export const setGoalMonthlySum = (goalMonthlySum) => (dispatch) => {
  dispatch({
    type: SET_GOAL_MONTHLY_SUM,
    payload: goalMonthlySum,
  });
};

export const setGoalReached = (goalReached) => (dispatch) => {
  dispatch({
    type: SET_GOAL_REACHED,
    payload: goalReached,
  });
};

////transactions
export const setTransactionId = (transactionId) => (dispatch) => {
  dispatch({
    type: SET_TRANSACTION_ID,
    payload: transactionId,
  });
};
export const setTransactionAmount = (transactionAmount) => (dispatch) => {
  dispatch({
    type: SET_TRANSACTION_AMOUNT,
    payload: transactionAmount,
  });
};
export const setTransactionDate = (transactionDate) => (dispatch) => {
  dispatch({
    type: SET_TRANSACTION_DATE,
    payload: transactionDate,
  });
};
export const setTransactionNote = (transactionNote) => (dispatch) => {
  dispatch({
    type: SET_TRANSACTION_NOTE,
    payload: transactionNote,
  });
};
export const setTransactionsList = (transactionsList) => (dispatch) => {
  dispatch({
    type: SET_TRANSACTIONS_LIST,
    payload: transactionsList,
  });
};

export const setTransactionsListForBudget =
  (transactionsListForBudget) => (dispatch) => {
    dispatch({
      type: SET_TRANSACTIONS_LIST_FOR_BUDGET,
      payload: transactionsListForBudget,
    });
  };

export const setTransactionsListForChart = //paizei na mhn to thelw
  (transactionsListForChart) => (dispatch) => {
    dispatch({
      type: SET_TRANSACTIONS_LIST_FOR_CHART,
      payload: transactionsListForChart,
    });
  };

export const setRecurringTransactionsList =
  (recurringTransactionsList) => (dispatch) => {
    dispatch({
      type: SET_RECURRING_TRANSACTIONS_LIST,
      payload: recurringTransactionsList,
    });
  };

export const setInterval = (interval) => (dispatch) => {
  dispatch({
    type: SET_INTERVAL,
    payload: interval,
  });
};

export const setTransactionDateRangeTitle =
  (transactionDateRangeTitle) => (dispatch) => {
    dispatch({
      type: SET_TRANSACTION_DATE_RANGE_TITLE,
      payload: transactionDateRangeTitle,
    });
  };

export const setTransactionCustomDateRange =
  (transactionCustomDateRange) => (dispatch) => {
    dispatch({
      type: SET_TRANSACTION_CUSTOM_DATE_RANGE,
      payload: transactionCustomDateRange,
    });
  };

export const setTransactionsSumsByCategory =
  (transactionsSumsByCategory) => (dispatch) => {
    dispatch({
      type: SET_TRANSACTIONS_SUMS_BY_CATEGORY,
      payload: transactionsSumsByCategory,
    });
  };

export const setTransactionsByWallet = (transactionsByWallet) => (dispatch) => {
  dispatch({
    type: SET_TRANSACTIONS_BY_WALLET,
    payload: transactionsByWallet,
  });
};

export const setTransactionDueToday = (transactionDueToday) => (dispatch) => {
  dispatch({
    type: SET_TRANSACTION_DUE_TODAY,
    payload: transactionDueToday,
  });
};
export const setTransactionOverdue = (transactionOverdue) => (dispatch) => {
  dispatch({
    type: SET_TRANSACTION_OVERDUE,
    payload: transactionOverdue,
  });
};
export const setDailyTransactions = (dailyTransactions) => (dispatch) => {
  dispatch({
    type: SET_DAILY_TRANSACTIONS,
    payload: dailyTransactions,
  });
};
///insights

export const setChartDateRangeTitle = (chartDateRangeTitle) => (dispatch) => {
  dispatch({
    type: SET_CHART_DATE_RANGE_TITLE,
    payload: chartDateRangeTitle,
  });
};

export const setChartCustomDateRange = (chartCustomDateRange) => (dispatch) => {
  dispatch({
    type: SET_CHART_CUSTOM_DATE_RANGE,
    payload: chartCustomDateRange,
  });
};

// export const setReloadCharts = (reloadCharts) => (dispatch) => {
//   dispatch({
//     type: SET_RELOAD_CHARTS,
//     payload: reloadCharts,
//   });
// };
