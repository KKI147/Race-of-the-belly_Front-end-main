import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import MenuCard from "../../components/MenuCard";
import Wrapper from "../../elem/Wrapper";
import { __getOrderDetailThunk } from "../../redux/modules/orderlistSlice";
import { __getRestaurantList } from "../../redux/modules/restaurantSlice";

const OrderDetailList = () => {
  const dispatch = useDispatch();
  const { orderId } = useParams();
  const orderdetail = useSelector(
    (state) => state.orderdetail.orderdetail.data
  );

  //retaurant id로 메뉴조회
  useEffect(() => {
    // dispatch(__getOrderDetailThunk(orderId));
  }, [dispatch, orderId]);

  return (
    <>
      <StDiv>
        <StNameDiv>Restaurant Name</StNameDiv>
        <StCategoryDiv>
          <span>메뉴</span>
          <span>가격</span>
          <span>갯수</span>
        </StCategoryDiv>
        <ul>
          {orderdetail?.map((item) => (
            <MenuCard key={item.menuId} item={item}></MenuCard>
          ))}
        </ul>
      </StDiv>
    </>
  );
};

export default OrderDetailList;
// new Date().getTime()
const StDiv = styled(Wrapper)`
  display: flex;
  flex-direction: column;
  border: 2px solid #fcbe32;
  height: 80vh;
  width: 100%;
  max-width: 800px;
  min-width: 500px;
  border-radius: 30px;
  padding: 15px 40px;
  box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
`;
const StNameDiv = styled(Wrapper)`
  font-size: 30px;
  margin: 25px 0;
  text-align: center;
`;
const StCategoryDiv = styled(Wrapper)`
  display: flex;

  span {
    display: flex;
    justify-content: center;
    width: 100%;
    font-size: 20px;
    padding: 5px 0;
    margin-bottom: 20px;
    position: relative;
  }
  span:after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -10px;
    width: 0px;
    height: 2px;
    margin: 5px 0 0;
    transition: all 0.2s ease-in-out;
    transition-duration: 0.3s;
    opacity: 0;
    background: #ffb000;
  }
  span:hover:after {
    width: 100%;
    opacity: 1;
  }
`;
