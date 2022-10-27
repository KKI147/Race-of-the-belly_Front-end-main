import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Layout from "../components/Layout";
import Button from "../elem/Button";
import OrderDetailList from "../features/orders/OrderDetailList";
import { __getOrderDetailThunk } from "../redux/modules/orderlistSlice";

// 주문상세페이지
function OrderDetail() {
  const dispatch = useDispatch();
  const restaurant = localStorage.getItem("Restaurant");
  const customer = localStorage.getItem("Customer");
  const [isOwner, setIsOwner] = useState(false);
  const { orderId } = useParams();

  if (restaurant) {
    setIsOwner(true);
  } else if (customer) {
    setIsOwner(false);
  }

  return (
    <>
      <Header />
      <Layout>
        <OrderDetailList></OrderDetailList>
        {isOwner && <Button>ACCEPT</Button>}
        {isOwner && <Button>CANCEL</Button>}
      </Layout>
    </>
  );
}

export default OrderDetail;
