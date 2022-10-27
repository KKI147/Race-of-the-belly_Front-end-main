import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import thunk from "redux-thunk";
import { current } from "@reduxjs/toolkit";
import { ServerUrl } from "../../sever";
import { apis } from "./API/api";
// import { serverUrl } from "../api";

// restaurant id로 메뉴조회
export const __getMenuByIdThunk = createAsyncThunk(
  "GET_MENU_LIST",
  async (payload, thunkAPI) => {
    try {
      const { data } = await apis.getmenulist(payload);

      return thunkAPI.fulfillWithValue(data.data);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.code);
    }
  }
);

// restaurant Id로 restaurant를 특정지어서 메뉴를 넣어주는데
// 그냥 restaurant에만 넣어줘도 될 듯
export const __addMenuByIdThunk = createAsyncThunk(
  "ADD_MENU_LIST",
  async (payload, thunkAPI) => {
    try {
      console.log(payload);
      const { data } = await apis.addmenu(payload);
      console.log(data);
      return thunkAPI.fulfillWithValue(data);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.code);
    }
  }
);

export const __delMenuByMenuIdThunk = createAsyncThunk(
  "DEL_MENU_LIST",
  async (payload, thunkAPI) => {
    try {
      await apis.delmenu(payload);
      return thunkAPI.fulfillWithValue(payload);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.code);
    }
  }
);

export const __updateMenuThunk = createAsyncThunk(
  "UPDATE_MENU_LIST",
  async (payload, thunkAPI) => {
    try {
      console.log(payload);
      const { data } = await apis.update(payload);
      return thunkAPI.fulfillWithValue(data);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.code);
    }
  }
);

const initialState = {
  menulist: {
    data: [],
    isLoading: false,
    error: null,
  },
  menulistByResId: {
    data: [],
    isLoading: false,
    error: null,
  },
};
export const menulistSlice = createSlice({
  name: "menulist",
  initialState,
  reducers: {},
  extraReducers: {
    // 메뉴 조회
    [__getMenuByIdThunk.pending]: (state) => {
      state.menulistByResId.isLoading = true;
    },
    [__getMenuByIdThunk.fulfilled]: (state, action) => {
      state.menulistByResId.isLoading = false;
      state.menulistByResId.data = action.payload;
    },
    [__getMenuByIdThunk.rejected]: (state, action) => {
      state.menulistByResId.isLoading = false;
      state.menulistByResId.error = action.payload;
    },

    // 특정 메뉴추가
    [__addMenuByIdThunk.pending]: (state) => {
      state.menulistByResId.isLoading = true;
    },
    [__addMenuByIdThunk.fulfilled]: (state, action) => {
      state.menulistByResId.isLoading = false;
      console.log(action.payload);
      state.menulistByResId.data.push(action.payload);
    },
    [__addMenuByIdThunk.rejected]: (state, action) => {
      state.menulistByResId.isLoading = false;
      state.menulistByResId.error = action.payload;
    },
    // 메뉴 삭제
    [__delMenuByMenuIdThunk.pending]: (state) => {
      state.menulistByResId.isLoading = true;
    },
    [__delMenuByMenuIdThunk.fulfilled]: (state, action) => {
      state.menulistByResId.isLoading = false;
      const target = state.menulistByResId.data.findIndex(
        (menu) => menu.menuId === action.payload
      );
      state.menulistByResId.data.splice(target, 1);
    },
    [__delMenuByMenuIdThunk.rejected]: (state, action) => {
      state.menulistByResId.isLoading = false;
      state.menulistByResId.error = action.payload;
    },

    // 메뉴 수정
    [__updateMenuThunk.pending]: (state) => {
      state.isLoading = true;
    },
    [__updateMenuThunk.fulfilled]: (state, action) => {
      const target = state.menulistByResId.data.findIndex(
        (comment) => comment.id === action.payload.menuId
      );
      state.isLoading = false;
      state.menulistByResId.data.splice(target, 1, action.payload.data);
    },
    [__updateMenuThunk.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {} = menulistSlice.actions;
export default menulistSlice.reducer;
