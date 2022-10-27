import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Example from "../pages/Example";
import Login from "../pages/Login";
import Main from "../pages/Main";
import OrderDetail from "../pages/OrderDetail";
import OwnerAddMenu from "../pages/OwnerAddMenu";
import OwnerMenu from "../pages/OwnerMenu";
import OwnerOrders from "../pages/OwnerOrders";
import SignUp from "../pages/SignUp";
import UserOrder from "../pages/UserOrder";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* 회원가입, 로그인 */}
        {/* <Route path="/" element={<Example />} /> */}
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/" element={<Login />} />

        {/* // 로그인 boolean 값 이동페이지 */}
        <Route path="/member/signup" element={<SignUp />} />
        {/* user 접근가능 */}
        <Route path="/restaurant-list" element={<Main />} />
        <Route path="/order/:restaurantId" element={<UserOrder />} />

        {/* owner 접근가능 */}
        <Route path="/owner/:restaurantId" element={<OwnerMenu />} />
        <Route path="/owner/menu/:restaurantId" element={<OwnerAddMenu />} />
        <Route path="/owner/orders/:restaurantId" element={<OwnerOrders />} />
        {/* 내부분 */}
        {/* 둘 다 접근 가능 */}
        <Route path="/orderdetail/:orderId" element={<OrderDetail />} />
        {/* <Route path="/order/:id" element={<UserOrderDetail />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
