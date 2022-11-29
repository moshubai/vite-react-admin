import { createSlice } from "@reduxjs/toolkit";

const initState = {
  title: "",
  onBack: undefined,
};

const page = createSlice({
  name: "page",
  initialState: initState,
  reducers: {
    updatePage: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetPage: (state) => {
      state.title = "";
      state.onBack = undefined;
      return state;
    },
  },
});

export const { updatePage, resetPage } = page.actions;

export default page.reducer;
