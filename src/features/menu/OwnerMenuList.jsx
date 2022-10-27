import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import OwnerMenuCard from "../../components/OwnerMenuCard";
import { __getMenuByIdThunk } from "../../redux/modules/menulistSlice";
import styled from "styled-components";
import Wrapper from "../../elem/Wrapper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const OwnerMenuList = () => {
  const { restaurantId } = useParams();
  const menuList = useSelector((state) => state.menulist.menulistByResId.data);

  const dispatch = useDispatch();
  console.log(restaurantId);
  // 레스토랑 아이디로 menulist 가져오기 => menulistByResId
  useEffect(() => {
    dispatch(__getMenuByIdThunk(restaurantId));
  }, [dispatch, restaurantId]);

  return (
    <>
      <StDiv>
        <StNameDiv>Restaurant Name</StNameDiv>
        <StCategoryDiv>
          <span>메뉴</span>
          <span>가격</span>
          <span>기능</span>
        </StCategoryDiv>
        <ul>
          {menuList?.map((menu) => (
            <OwnerMenuCard menu={menu} key={menu.menuId} />
          ))}
        </ul>
      </StDiv>
      <StLink to={`/owner/menu/${restaurantId}`}>+</StLink>
      <StLinkChev to={`/owner/orders/${restaurantId}`}>></StLinkChev>
    </>
  );
};

export default OwnerMenuList;

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
const StLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-content: center;
  text-align: center;
  font-size: 70px;
  font-weight: 700;
  border: 0;
  border-radius: 50%;
  line-height: 60px;
  width: 80px;
  height: 80px;
  background-color: ${(props) => props.theme.mainC};
  color: #ffb000;
  position: absolute;
  transform: translate(450px, 0px);
  transition: 0.2s ease-in-out;

  :hover {
    box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px,
      rgba(0, 0, 0, 0.23) 0px 6px 6px;
  }
`;
const StLinkChev = styled(Link)`
  display: flex;
  justify-content: center;
  align-content: center;
  text-align: center;
  font-size: 70px;
  font-weight: 700;
  border: 0;
  border-radius: 50%;
  line-height: 60px;
  width: 80px;
  height: 80px;
  background-color: ${(props) => props.theme.mainC};
  color: #ffb000;
  position: absolute;
  transform: translate(450px, 100px);
  transition: 0.2s ease-in-out;

  :hover {
    box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px,
      rgba(0, 0, 0, 0.23) 0px 6px 6px;
  }
`;
