import React from "react";
import styled from "styled-components";
import Wrapper from "../elem/Wrapper";

const MenuCard = ({ item }) => {
  return (
    <>
      <StLi>
        <StSpan>{item.menuName}</StSpan> <StSpan>{item.price}원</StSpan>
        <StSpan>{item.count}개</StSpan>
      </StLi>
    </>
  );
};

export default MenuCard;

const Stdiv = styled.div`
  display: flex;
  font-size: 30px;
`;
const StSpan = styled(Wrapper)`
  display: flex;
  width: 100%;
  justify-content: center;
`;
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
