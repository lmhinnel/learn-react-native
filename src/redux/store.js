import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import gameReducer from "./reducer";

const rootReducer = combineReducers({ gameReducer });

export const Store = createStore(rootReducer, applyMiddleware(thunk));