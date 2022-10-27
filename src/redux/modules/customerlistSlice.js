import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apis } from "./API/api";

// export const __getCustomerlist = createAsyncThunk(
//   "getCustomerList",
//   async (payload, thunkAPI) => {
//     try {
//       const { data } = await apis.customerlist(payload);

//       return thunkAPI.fulfillWithValue(data.data);
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error);
//     }
//   }
// );

export const __getCustomerlist = createAsyncThunk(
  "getCustomerList",
  async (restaurantId, thunkAPI) => {
    try {
      const { data } = await apis.customerlist(restaurantId);

      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// export const __getCustomerThunk = createAsyncThunk(
//   "getCustomer",
//   async (restaurantId, thunkAPI) => {
//     try {
//       const { data } = await apis.customerlist();
//       const filteredArr = data.data.filter(
//         (restaurantId) => restaurantId.id === id
//       );
//       return thunkAPI.fulfillWithValue(filteredArr[0]);
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error);
//     }
//   }
// );
const initialState = {
  customerlist: {
    data: [],
    error: null,
    isLoading: false,
  },
};

const customerlistSlice = createSlice({
  name: "customerlist",
  initialState,
  reducers: {},
  extraReducers: {
    [__getCustomerlist.pending]: (state) => {
      state.isLoading = true;
    },
    [__getCustomerlist.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.customerlist = action.restaurantId;
    },
    [__getCustomerlist.rejected]: (state, action) => {
      state.isLoading = false;
    },

    // [__getCustomerThunk.pending]: (state) => {},
    // [__getCustomerThunk.fulfilled]: (state, action) => {
    //   state.customerlist = action.payload;
    // },
    // [__getCustomerThunk.rejected]: (state, action) => {},
  },
});

export const {} = customerlistSlice.actions;
export default customerlistSlice.reducer;
