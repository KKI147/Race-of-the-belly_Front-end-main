import axios from "axios";
import { JasonUrl, ServerUrl } from "../../../sever/index";

const api = axios.create({
  baseURL: ServerUrl,
  headers: {
    "Content-Type": "application/json",
    accept: "*/*",
  },
});

api.interceptors.request.use(function (config) {
  // const accessToken = document.cookie.split(";")[0].split["="][1];
  // .find((row) => row.startsWith("Authorization"))
  // .split("=")
  // .find((row) => row.startsWith("Bearer"));
  const accessToken = localStorage.getItem("Authorization");
  // console.log(accessToken);
  config.headers.Authorization = accessToken;
  return config;
});

export const apis = {
  // loginSlice
  login: (payload) => api.post(`/member/login`, payload.postLogin),
  // login: (payload) => api.post(`/user`, payload),

  // signupSlice
  signup: (payload) => api.post(`/member/signup`, payload),

  //restaurantSlice
  restaurantlist: () => api.get("/restaurant"),

  // customerlistSlice
  // customerlist: () => api.get("/customerlist/"),
  customerlist: (restaurantId) => api.get(`/restaurant/order/${restaurantId}`),

  // menulistSlice
  getmenulist: (payload) => api.get(`/restaurant/${payload}`),

  addmenu: (payload) => api.post(`/menu`, payload),

  delmenu: (payload) => api.delete(`/menu/${payload}`),

  update: (payload) => api.put(`/menu/${payload.id}`, payload.menuObj),

  //menuSlice
  getmenu: (payload) => api.get(`/restaurant/${payload}`),

  //orderlistSlice
  postorder: (payload) => api.post(`/order`, payload),
  getorderdetail: (payload) => api.get(`/order/${payload}`),
  getorderingmenu: (payload) => api.get(`/restaurant/${payload}`),
};
