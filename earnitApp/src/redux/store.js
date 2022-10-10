import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";

import {
  userReducer,
  walletReducer,
  categoryReducer,
  budgetReducer,
  transactionReducer,
  chartReducer,
  goalReducer,
} from "./reducers";

const allReducers = combineReducers({
  userReducer,
  walletReducer,
  categoryReducer,
  budgetReducer,
  transactionReducer,
  chartReducer,
  goalReducer,
});

export const rootReducer = (state, action) => {
  // if (action.type === "SET_IS_LOGGEDIN") {
  //   state = undefined;
  // }
  return allReducers(state, action);
};

export const Store = createStore(rootReducer, applyMiddleware(thunk));
