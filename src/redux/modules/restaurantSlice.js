import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apis } from "./API/api";

export const __getRestaurantList = createAsyncThunk(
  "getRestaurantList",
  async (payload, thunkAPI) => {
    try {
      const { data } = await apis.restaurantlist();

      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __getRstThunk = createAsyncThunk(
  "GET_RST",
  async (restaurantId, thunkAPI) => {
    try {
      const { data } = await apis.restaurantlist();

      const filteredArr = data.data.filter(
        (x) => x.restaurantId === parseInt(restaurantId)
      );
      return thunkAPI.fulfillWithValue(filteredArr[0]);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  restaurantlist: [],
  isLoading: false,
  error: null,
  restaurant: {},
};

const restaurantSlice = createSlice({
  name: "restaurantlist",
  initialState,
  reducers: {
    // getRestaurantList: (state, action) => {
    //   state.restaurantlist = action.payload;
    // },
  },
  extraReducers: {
    [__getRestaurantList.pending]: (state) => {
      state.isLoading = true;
    },
    [__getRestaurantList.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.restaurantlist = action.payload.data;
    },
    [__getRestaurantList.rejected]: (state, action) => {
      state.isLoading = false;
    },
    /////
    [__getRstThunk.pending]: (state) => {},
    [__getRstThunk.fulfilled]: (state, action) => {
      state.restaurant = action.payload;
    },
    [__getRstThunk.rejected]: (state, action) => {},
  },
});

export const { getRestaurantList } = restaurantSlice.actions;
export default restaurantSlice.reducer;
