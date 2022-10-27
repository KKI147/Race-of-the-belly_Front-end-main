import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import thunk from "redux-thunk";
import { current } from "@reduxjs/toolkit";
import { ServerUrl } from "../../sever";
import { apis } from "./API/api";
import { Navigate } from "react-router-dom";
// import { serverUrl } from "../api";

export const __getOrderDetailThunk = createAsyncThunk(
  "GET_ORDER_DETAIL",
  async (payload, thunkAPI) => {
    try {
      const { data } = await apis.getorderdetail(payload);
      return thunkAPI.fulfillWithValue(data);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.code);
    }
  }
);

// user가 메뉴 주문시, 메뉴 받아오기
export const __getOrderingMenuThunk = createAsyncThunk(
  "GET_ORDERING_MENU",
  async (payload, thunkAPI) => {
    try {
      const { data } = await apis.getorderingmenu(payload);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.code);
    }
  }
);

// user가 메뉴 order시, 메뉴 post
export const __postOrderMenuThunk = createAsyncThunk(
  "POST_ORDER_MENU",
  async (payload, thunkAPI) => {
    try {
      console.log(payload);
      const orderDetail = payload.orderMenuObj.orderDetailsList;
      const dupArr = [];
      for (let i = 0; i < orderDetail.length; i++) {
        const obj = {};

        obj.menuName = orderDetail[i].menuName;
        obj.count = orderDetail[i].count;

        dupArr.push(obj);
      }
      payload.orderMenuObj.orderDetailsList = dupArr;
      const { data } = await apis.postorder(payload.orderMenuObj);
      console.log(data);
      // payload.navigate(`/orderdetail/${data.data.orderId}`);
      return thunkAPI.fulfillWithValue(data);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.code);
    }
  }
);

const initialState = {
  orderdetail: { data: [], error: null, isLoading: false },
  orderingList: [],
};
export const orderdetailSlice = createSlice({
  name: "orderdetail",
  initialState,
  reducers: {
    addMenuCnt: (state, action) => {
      state.orderingList.map((obj) => {
        if (obj.menuId === action.payload) {
          return (obj.count += 1);
        } else {
          return { ...obj };
        }
      });
    },
    minusMenuCnt: (state, action) => {
      state.orderingList.map((obj) => {
        if (obj.menuId === action.payload) {
          return (obj.count -= 1);
        } else {
          return { ...obj };
        }
      });
    },
  },

  extraReducers: {
    [__getOrderDetailThunk.pending]: (state) => {
      state.orderdetail.isLoading = true;
    },
    [__getOrderDetailThunk.fulfilled]: (state, action) => {
      state.orderdetail.isLoading = false;
      state.orderdetail.data = action.payload;
    },
    [__getOrderDetailThunk.rejected]: (state, action) => {
      state.orderdetail.isLoading = false;
      state.orderdetail.error = action.payload;
    },

    // 주문할 메뉴 조회, menuCnt property가 없기 때문에 추가해서 orderingList에 넣어준다.
    [__getOrderingMenuThunk.pending]: (state) => {},
    [__getOrderingMenuThunk.fulfilled]: (state, action) => {
      const dupArr = action.payload.map((obj) => ({
        ...obj,
        count: 0,
      }));
      state.orderingList = dupArr;
    },

    // 포스트 한 후 받아올 주문데이터를 orderDetail에 넣는다.
    [__postOrderMenuThunk.pending]: (state) => {},
    [__postOrderMenuThunk.fulfilled]: (state, action) => {
      state.orderdetail.data = action.payload.data;
    },
    [__postOrderMenuThunk.rejected]: (state, action) => {},
  },
});

export const { addMenuCnt, minusMenuCnt } = orderdetailSlice.actions;
export default orderdetailSlice.reducer;

// {
//   "memberUsername": "String",
//   "restaurantUsername": "String",
//   "orderDetailsList": [
//     {
//       "menuName": "초밥",
//       "count": 2
//     },
//     {
//       "menuName": "김밥",
//       "count": 1
//     }
//   ]
// }
