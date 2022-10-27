import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { Navigate, useNavigate } from "react-router-dom";
import { setCookie } from "../../shared/Cookie";
import { apis } from "../modules/API/api";

export const __postSignup = createAsyncThunk(
  "postSignUp",
  async (payload, thunkAPI) => {
    try {
      const res = await apis.signup(payload);
      // setCookie("Authorization", res.headers.authorization, 7);
      localStorage.setItem("Authorization", res.headers.authorization);

      // setCookie("Refresh-token", res.headers["refresh-token"], 7);
      localStorage.setItem("Refresh-token", res.headers["refresh-token"]);

      return thunkAPI.fulfillWithValue(res.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __postLogin = createAsyncThunk(
  "postLogin",
  async (payload, thunkAPI) => {
    try {
      const res = await apis.login(payload);
      // token이란 이름으로 쿠키 저장, 마지막은 파라미터는 만료시간 설정해주는 것.
      // setCookie("Authorization", res.headers.authorization, 7);
      // setCookie("Refresh-token", res.headers["refresh-token"], 7);
      // setCookie("Authorization", res.headers.authorization, 7);
      localStorage.setItem("Authorization", res.headers.authorization);
      console.log(res.headers.authorization);
      // setCookie("Refresh-token", res.headers["refresh-token"], 7);
      localStorage.setItem("Refresh-token", res.headers["refresh-token"]);
      if (res.data.data.userType === "Restaurant") {
        localStorage.setItem("Restaurant", res.data.data.username);
      } else if (res.data.data.userType === "Customer") {
        localStorage.setItem("Customer", res.data.data.username);
      }

      return thunkAPI.fulfillWithValue(res.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  user: {},
  isLogin: false,
  isLoading: false,
  error: null,
};

const loginiSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // postSignUp: (state, action) => {
    //   state.user.push(action.payload);
    // },
    // postLogin: (state, action) => {
    //   state.user.push(action.payload);
    // },
  },

  extraReducers: {
    [__postSignup.pending]: (state) => {
      state.isLoading = true;
    },
    [__postSignup.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    },
    [__postSignup.rejected]: (state) => {
      state.isLoading = false;
    },

    [__postLogin.pending]: (state) => {
      state.isLoading = true;
    },
    [__postLogin.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    },
    [__postLogin.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export const { postLogin, postSignUp } = loginiSlice.actions;
export default loginiSlice.reducer;
