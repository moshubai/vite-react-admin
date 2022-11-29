import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { pageSlice } from "./slices";

const reducer = combineReducers({
  page: pageSlice,
});

export const store = configureStore({ reducer });
