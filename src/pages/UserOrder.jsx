import React from "react";
import styled from "styled-components";

import Header from "../components/Header";
import Layout from "../components/Layout";
import OrderItemList from "../features/orders/OrderItemList";

//주문페이지(customer)
function UserOrder() {
  return (
    <>
      <Header />
      <Layout>
        <OrderItemList></OrderItemList>
      </Layout>
    </>
  );
}

export default UserOrder;
