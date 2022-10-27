import React from "react";
import OrderCards from "../components/OrderCard";
import Header from "../components/Header";
import Layout from "../components/Layout";

//order 접근, customer의 주문이 보여짐
function OwnerOrders() {
  return (
    <>
      <Header />
      <Layout>
        <span>
          <h1>Customer List</h1>
        </span>
        <OrderCards />
      </Layout>
    </>
  );
}

export default OwnerOrders;
