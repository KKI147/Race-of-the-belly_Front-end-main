// 로그인시 쿠키저장
const setCookie = (name, value, exp = 5) => {
  let date = new Date();
  // 만료시간 생성
  date.setTime(date.getTime() + exp * 24 * 60 * 60 * 1000);
  // 브라우저 쿠키 저장
  document.cookie = `${name}=${value}; expires=${date.toUTCString()}`;
};

// 로그 아웃시
const deleteCookie = (name) => {
  let date = new Date().toUTCString();
  document.cookie = name + "=; expires=" + date;
};

export { setCookie, deleteCookie };
