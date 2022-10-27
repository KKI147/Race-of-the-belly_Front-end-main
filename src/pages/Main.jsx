import React from "react";
import MainCard from "../features/mainCard/RestaurantList";
import Header from "../components/Header";
import Layout from "../components/Layout";
import styled from "styled-components";

// cutomer접근,레스토랑,이름 썸네일
function Main() {
  return (
    <>
      <Header />
      <Layout>
        <span>
          <h1>Restaurant List</h1>
        </span>
        <MyLayout>
          <MainCard />
        </MyLayout>
      </Layout>
    </>
  );
}

export default Main;

const MyLayout = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 11px;
`;
