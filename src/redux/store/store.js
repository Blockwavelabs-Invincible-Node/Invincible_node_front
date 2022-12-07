import { combineReducers, configureStore } from "@reduxjs/toolkit";
//import { applyMiddleware } from "@reduxjs/toolkit";
// import {createStore} from 'redux';
//import thunk from "redux-thunk";
// import { createStoreHook } from "react-redux";
import stakeAmountReducer from "../reducers/stakeAmountReducer";
import connectMetamaskReducer from "../reducers/connectMetamaskReducer";

const rootReducer = combineReducers({
    // list of reducers
    stakeAmount: stakeAmountReducer,
    connectMetamask: connectMetamaskReducer
});

//const middleware = applyMiddleware(thunk);

const store = configureStore({
    // middleware: middleware,
    reducer: rootReducer
});

export default store;