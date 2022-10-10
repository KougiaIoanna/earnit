import moment from "moment";
import { combineReducers } from "redux";
import {
  SET_USER_EMAIL,
  SET_USER_PASSWORD,
  SET_CONFIRM_PASSWORD,
  SET_USERNAME,
  SET_ID,
  SET_TOKEN,
  SET_IS_LOGGEDIN,
  SET_WALLETS_LIST,
  SET_WALLET_BALANCE,
  SET_WALLET_NAME,
  SET_WALLET_ID,
  SET_CATEGORY_NAME,
  SET_CATEGORY_TYPE,
  SET_INCOME_LIST,
  SET_SPENDING_LIST,
  SET_CATEGORY_ID,
  SET_BUDGET_ID,
  SET_END_DATE,
  SET_BUDGET_AMOUNT,
  SET_BUDGET_BALANCE,
  SET_BUDGET_NAME,
  SET_BUDGET_NOTE,
  SET_BUDGETS_LIST,
  SET_TRANSACTION_DATE,
  SET_TRANSACTION_AMOUNT,
  SET_TRANSACTION_ID,
  SET_TRANSACTION_NOTE,
  SET_TRANSACTIONS_LIST,
  SET_CATEGORIES2BUDGETS,
  SET_DELETED_TRANSACTION,
  SET_START_DATE,
  SET_CATEGORY_ICON,
  SET_BUDGET_CREATION_OVER,
  SET_WALLETS_FOR_DROPDOWN,
  SET_INTERVAL,
  SET_RECURRING_TRANSACTIONS_LIST,
  SET_GOALS_LIST,
  SET_GOAL_ID,
  SET_GOAL_NAME,
  SET_GOAL_NOTE,
  SET_TARGET_AMOUNT,
  SET_SAVED_AMOUNT,
  SET_TARGET_DATE,
  SET_GOAL_ICON,
  SET_GOAL_MONTHLY_SUM,
  SET_CHART_DATE_RANGE_TITLE,
  SET_TRANSACTION_DATE_RANGE_TITLE,
  SET_TRANSACTION_CUSTOM_DATE_RANGE,
  SET_CHART_CUSTOM_DATE_RANGE,
  SET_TRANSACTIONS_LIST_FOR_CHART,
  SET_TRANSACTIONS_LIST_FOR_BUDGET,
  SET_TRANSACTIONS_SUMS_BY_CATEGORY,
  SET_TRANSACTIONS_BY_WALLET,
  SET_SPENDING_SUM,
  SET_INCOME_SUM,
  SET_UPCOMING_TRANSACTION_NOTIFICATION,
  SET_TRANSACTION_DUE_TODAY,
  SET_TRANSACTION_OVERDUE,
  SET_GOAL_REACHED,
  SET_DAILY_TRANSACTIONS,
} from "./actions";

const userInitialState = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  id: "",
  token: "",
  isLoggedin: false,
};

export function userReducer(state = userInitialState, action) {
  switch (action.type) {
    case SET_USER_EMAIL:
      return { ...state, email: action.payload };
    case SET_USERNAME:
      return { ...state, username: action.payload };
    case SET_USER_PASSWORD:
      return { ...state, password: action.payload };
    case SET_CONFIRM_PASSWORD:
      return { ...state, confirmPassword: action.payload };
    case SET_ID:
      return { ...state, id: action.payload };
    case SET_TOKEN:
      return { ...state, token: action.payload };
    case SET_IS_LOGGEDIN:
      return { ...state, isLoggedin: action.payload };
    default:
      return state;
  }
}

const walletInitialState = {
  walletName: " ",
  walletBalance: " ",
  walletId: " ",
  walletsList: [],
  walletsForDropdown: [],
};

export function walletReducer(state = walletInitialState, action) {
  switch (action.type) {
    case SET_WALLET_ID:
      return { ...state, walletId: action.payload };
      break;
    case SET_WALLET_NAME:
      return { ...state, walletName: action.payload };
      break;
    case SET_WALLET_BALANCE:
      return { ...state, walletBalance: action.payload };
      break;
    case SET_WALLETS_LIST:
      return { ...state, walletsList: action.payload };
      break;
    case SET_WALLETS_FOR_DROPDOWN:
      return { ...state, walletsForDropdown: action.payload };
      break;
    default:
      return state;
      break;
  }
}

const categoryInitialState = {
  categoryName: " ",
  categoryType: " ",
  categoryId: " ",
  incomeList: [],
  spendingList: [],
  categories2Budgets: [],
  icon: " ",
  spendingSum: " ",
  incomeSum: " ",
};

export function categoryReducer(state = categoryInitialState, action) {
  switch (action.type) {
    case SET_CATEGORY_ID:
      return { ...state, categoryId: action.payload };
      break;
    case SET_CATEGORY_NAME:
      return { ...state, categoryName: action.payload };
      break;
    case SET_CATEGORY_TYPE:
      return { ...state, categoryType: action.payload };
      break;
    case SET_INCOME_LIST:
      return { ...state, incomeList: action.payload };
      break;
    case SET_SPENDING_LIST:
      return { ...state, spendingList: action.payload };
      break;
    case SET_CATEGORIES2BUDGETS:
      return { ...state, categories2Budgets: action.payload };
      break;
    case SET_CATEGORY_ICON:
      return { ...state, icon: action.payload };
      break;
    case SET_SPENDING_SUM:
      return { ...state, spendingSum: action.payload };
      break;
    case SET_INCOME_SUM:
      return { ...state, incomeSum: action.payload };
      break;
    default:
      return state;
      break;
  }
}

const budgetInitialState = {
  budgetName: " ",
  budgetAmount: "",
  budgetBalance: "",
  endDate: "",
  budgetNote: null,
  startDate: "",
  budgetId: " ",
  budgetsList: [],
};

export function budgetReducer(state = budgetInitialState, action) {
  switch (action.type) {
    case SET_BUDGET_ID:
      return { ...state, budgetId: action.payload };
      break;
    case SET_BUDGET_NAME:
      return { ...state, budgetName: action.payload };
      break;
    case SET_END_DATE:
      return { ...state, endDate: action.payload };
      break;
    case SET_BUDGET_AMOUNT:
      return { ...state, budgetAmount: action.payload };
      break;
    case SET_BUDGET_BALANCE:
      return { ...state, budgetBalance: action.payload };
      break;
    case SET_BUDGET_NOTE:
      return { ...state, budgetNote: action.payload };
      break;
    case SET_BUDGETS_LIST:
      return { ...state, budgetsList: action.payload };
      break;
    case SET_START_DATE:
      return { ...state, startDate: action.payload };
      break;
    default:
      return state;
      break;
  }
}

const goalInitialState = {
  goalName: " ",
  targetAmount: null,
  targetDate: null,
  goalNote: null,
  savedAmount: 0,
  goalId: null,
  goalMonthlySum: [],
  goalsList: [],
};

export function goalReducer(state = goalInitialState, action) {
  switch (action.type) {
    case SET_GOAL_ID:
      return { ...state, goalId: action.payload };
      break;
    case SET_GOAL_NAME:
      return { ...state, goalName: action.payload };
      break;
    case SET_TARGET_DATE:
      return { ...state, targetDate: action.payload };
      break;
    case SET_TARGET_AMOUNT:
      return { ...state, targetAmount: action.payload };
      break;
    case SET_GOAL_NOTE:
      return { ...state, goalNote: action.payload };
      break;
    case SET_GOALS_LIST:
      return { ...state, goalsList: action.payload };
      break;
    case SET_SAVED_AMOUNT:
      return { ...state, savedAmount: action.payload };
      break;
    case SET_GOAL_ICON:
      return { ...state, goalIcon: action.payload };
      break;
    case SET_GOAL_MONTHLY_SUM:
      return { ...state, goalMonthlySum: action.payload };
      break;
    case SET_GOAL_REACHED:
      return { ...state, goalReached: action.payload };
      break;

    default:
      return state;
      break;
  }
}

const transactionInitialState = {
  transactionAmount: " ",
  transactionDate: "",
  transactionNote: null,
  transactionDateRangeTitle: moment().format("MMMM"),
  transactionCustomDateRange: "",
  transactionDueToday: false,
  transactionOverdue: false,
  transactionsList: [],
  transactionsListForChart: [],
  transactionsListForBudget: [],
  recurringTransactionsList: [],
  transactionsSumsByCategory: [],
  interval: null,
  transactionsByWallet: [],
};

export function transactionReducer(state = transactionInitialState, action) {
  switch (action.type) {
    case SET_TRANSACTION_ID:
      return { ...state, transactionId: action.payload };
      break;
    case SET_TRANSACTION_DATE:
      return { ...state, transactionDate: action.payload };
      break;
    case SET_TRANSACTION_AMOUNT:
      return { ...state, transactionAmount: action.payload };
      break;
    case SET_TRANSACTION_NOTE:
      return { ...state, transactionNote: action.payload };
      break;
    case SET_TRANSACTIONS_LIST:
      return { ...state, transactionsList: action.payload };
      break;
    case SET_TRANSACTIONS_LIST_FOR_CHART:
      return { ...state, transactionsListForChart: action.payload };
      break;
    case SET_TRANSACTIONS_LIST_FOR_BUDGET:
      return { ...state, transactionsListForBudget: action.payload };
      break;
    case SET_RECURRING_TRANSACTIONS_LIST:
      return { ...state, recurringTransactionsList: action.payload };
      break;
    case SET_INTERVAL:
      return { ...state, interval: action.payload };
      break;
    case SET_TRANSACTION_DATE_RANGE_TITLE:
      return { ...state, transactionDateRangeTitle: action.payload };
      break;
    case SET_TRANSACTION_CUSTOM_DATE_RANGE:
      return { ...state, transactionCustomDateRange: action.payload };
      break;
    case SET_TRANSACTIONS_SUMS_BY_CATEGORY:
      return { ...state, transactionsSumsByCategory: action.payload };
      break;
    case SET_TRANSACTIONS_BY_WALLET:
      return { ...state, transactionsByWallet: action.payload };
      break;
    case SET_TRANSACTION_DUE_TODAY:
      return { ...state, transactionDueToday: action.payload };
      break;
    case SET_TRANSACTION_OVERDUE:
      return { ...state, transactionOverdue: action.payload };
      break;
    case SET_DAILY_TRANSACTIONS:
      return { ...state, dailyTransactions: action.payload };
      break;
    default:
      return state;
      break;
  }
}

const chartInitialState = {
  chartDateRangeTitle: moment().format("MMMM"),
  chartCustomDateRange: "",
};

export function chartReducer(state = chartInitialState, action) {
  switch (action.type) {
    case SET_CHART_DATE_RANGE_TITLE:
      return { ...state, chartDateRangeTitle: action.payload };
      break;
    case SET_CHART_CUSTOM_DATE_RANGE:
      return { ...state, chartCustomDateRange: action.payload };
      break;

    default:
      return state;
      break;
  }
}
