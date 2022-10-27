import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { current } from "@reduxjs/toolkit";
import { apis } from "./API/api";
// import { serverUrl } from "../api";
export const __getMenuThunk = createAsyncThunk(
  "GET_MENU",
  async (payload, thunkAPI) => {
    try {
      console.log(payload);
      const { data } = await apis.getmenu(payload);
      return thunkAPI.fulfillWithValue(data);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.code);
    }
  }
);

const initialState = {
  menu: {},
  error: null,
  isLoading: false,
};
export const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    clearMenu: (state) => {
      state.menu = {};
    },
  },
  extraReducers: {
    [__getMenuThunk.pending]: (state) => {
      state.isLoading = true;
    },
    [__getMenuThunk.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.menu = action.payload;
    },
    [__getMenuThunk.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { clearMenu } = menuSlice.actions;
export default menuSlice.reducer;
