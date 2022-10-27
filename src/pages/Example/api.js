import axios from "axios";

const api = axios.create({
  baseURL: "http://13.209.43.135:8080",
  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json,",
  },
});

// 가지고 있는 토큰 넣어주기!
// 로그인 전이면 토큰이 없으니 못 넣어요.
// 그럴 땐 로그인 하고 토큰을 받아왔을 때 넣어줍시다.
api.interceptors.request.use(function (config) {
  const accessToken = document.cookie.split("=")[1];
  config.headers.common["X-AUTH-TOKEN"] = `${accessToken}`;
  return config;
});

export const apis = {
  // user
  login: (id, pw) => api.post("/login", { username: id, password: pw }),
  signup: (id, email, pw, pwcheck) =>
    api.post("/signup", {
      username: id,
      email: email,
      password: pw,
      repassword: pwcheck,
    }),
};
