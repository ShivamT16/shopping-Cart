import { applyMiddleware, createStore } from "redux";
import { thunk } from "redux-thunk";
import { shoppingReducer } from "./reducers";

export const store = createStore(shoppingReducer,applyMiddleware(thunk))