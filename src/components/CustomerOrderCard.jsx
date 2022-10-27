import React, { useState } from "react";
import Input from "../elem/Input";
import Label from "../elem/Label";
import styled from "styled-components";
import Button from "../elem/Button";
import { useDispatch, useSelector } from "react-redux";
import { addMenuCnt, minusMenuCnt } from "../redux/modules/orderlistSlice";
import Wrapper from "../elem/Wrapper";

const CustomerOrderCard = ({ menu }) => {
  const initialCnt = menu.count;
  // const [menuCnt, setMenuCnt] = useState(initialCnt);
  const dispatch = useDispatch();

  const addBtnHandler = () => {
    dispatch(addMenuCnt(menu.menuId));
  };

  const minusBtnHandler = () => {
    if (menu.count <= 0) {
      alert("0개 이하는 주문이 불가능 합니다.");
    } else {
      dispatch(minusMenuCnt(menu.menuId));
    }
  };

  return (
    <StLi>
      <StSpan>{menu.menuName}</StSpan>
      <StSpan>{menu.price} 원</StSpan>
      <StBtnDiv>
        <CountBtn onClick={addBtnHandler}>🔼</CountBtn>
        <div> {menu.count}</div>
        <CountBtn onClick={minusBtnHandler}>🔽</CountBtn>
      </StBtnDiv>
    </StLi>
  );
};

export default CustomerOrderCard;

const StLi = styled.li`
  display: flex;
  font-size: 20px;
  height: 50px;
  align-items: center;
  background-color: ${(props) => props.theme.mainC};
  border-radius: 10px;
  margin-bottom: 15px;
  transition: 0.2s ease-in-out;
  :hover {
    box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px,
      rgba(0, 0, 0, 0.23) 0px 6px 6px;
  }
`;
const StSpan = styled(Wrapper)`
  display: flex;
  width: 100%;
  justify-content: center;
`;
const StBtnDiv = styled(Wrapper)`
  display: flex;
  width: 100%;
  justify-content: center;
`;

const CountBtn = styled(Button)`
  display: flex;
  /* color: ${(props) => props.theme.subC}; */
  text-align: center;
  align-items: center;
  justify-content: center;
  height: 30px;
  width: 30px;
  background-color: rgba(0, 0, 0, 0);
  border: 0;
  font-size: 16px;
`;
