import { combineReducers, configureStore } from "@reduxjs/toolkit";
//import { applyMiddleware } from "@reduxjs/toolkit";
// import {createStore} from 'redux';
import thunk from "redux-thunk";
// import { createStoreHook } from "react-redux";
import stakeAmountReducer from "../reducers/stakeAmountReducer";
import connectMetamaskReducer from "../reducers/connectMetamaskReducer";
import hedgeAmountReducer from "../reducers/hedgeAmountReducer";
import networkReducer from "../reducers/networkReducer";
import modalPageNumberReducer from "../reducers/modalPageNumberReducer";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";
import persistStore from "redux-persist/es/persistStore";
import validatorApplicationReducer from "../reducers/validatorApplicationReducer";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  // list of reducers
  stakeAmount: stakeAmountReducer,
  connectMetamask: connectMetamaskReducer,
  hedgeAmount: hedgeAmountReducer,
  network: networkReducer,
  modalPageNumber: modalPageNumberReducer,
  validatorApplication: validatorApplicationReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

//const middleware = applyMiddleware(thunk);

const store = configureStore({
  // middleware: middleware,
  reducer: persistedReducer,
});

export default store;

export const persistor = persistStore(store);
