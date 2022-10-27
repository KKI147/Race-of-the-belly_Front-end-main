import { configureStore } from "@reduxjs/toolkit";
import user from "../modules/loginSlice";
import orderdetail from "../modules/orderlistSlice";
import menulist from "../modules/menulistSlice";
import menu from "../modules/menuSlice";
import restaurantlist from "../modules/restaurantSlice";
import customerlist from "../modules/customerlistSlice";

const store = configureStore({
  reducer: { user, menulist, orderdetail, menu, restaurantlist, customerlist },
});
export default store;
