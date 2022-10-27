import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Button from "../elem/Button";
import Input from "../elem/Input";
import Wrapper from "../elem/Wrapper";
import {
  __delMenuByMenuIdThunk,
  __updateMenuThunk,
} from "../redux/modules/menulistSlice";
import { __getMenuThunk } from "../redux/modules/menuSlice";

const OwnerMenuCard = ({ menu }) => {
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const menuItem = useSelector((state) => state.menu.menu);
  // const menuList = useSelector((state) => state.menulist.menulistByResId.data);
  const initialState = { ...menu };
  const [menuObj, setMenuObj] = useState(initialState);
  const [updateMenu, setUpdateMenu] = useState();

  const { menuName, price } = menuObj;

  // 메뉴가 업데이트, 수정될때마다 리랜더링
  useEffect(() => {
    setUpdateMenu(menuItem);
  }, [menuItem]);

  // 수정된 값을 menuObj에 넣기
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setMenuObj({ ...menuObj, [name]: value });
  };

  // 완료하기 버튼 누를시
  const CompleteChangeHandler = (e) => {
    e.preventDefault();
    if (menuName.trim() === "") {
      return alert("입력된 내용이 없습니다.");
    }
    if (isEdit) {
      // menuObj에 menuId를 삭제
      setMenuObj(delete menuObj.menuId);
      console.log(menuObj);
      const id = menu.menuId;
      dispatch(__updateMenuThunk({ menuObj, id }));
    }
    setIsEdit(false);
  };
  // 수정 버튼 누를시
  const editChangeHandler = () => {
    setIsEdit(true);
    dispatch(__getMenuThunk(menu.menuId));
  };

  const delBtnHandler = () => {
    const result = window.confirm("삭제하시겠습니까?");
    if (result) {
      dispatch(__delMenuByMenuIdThunk(menu.menuId));
    } else {
      return;
    }
  };

  return (
    <>
      {!isEdit ? (
        <StLi>
          <StSpan>{menu.menuName}</StSpan> <StSpan>{menu.price}원</StSpan>
          <StBtnDiv>
            <CountBtn onClick={delBtnHandler}>🗑️</CountBtn>
            <CountBtn onClick={editChangeHandler}>✏️</CountBtn>
          </StBtnDiv>
        </StLi>
      ) : (
        <>
          <StLi>
            <StInput
              type="text"
              name="menuName"
              onChange={onChangeHandler}
              value={menuName}
            />
            <StInput
              type="number"
              name="price"
              onChange={onChangeHandler}
              value={price}
            />
            <StBtnDiv>
              <CountBtn type="submit" onClick={CompleteChangeHandler}>
                ✅
              </CountBtn>
            </StBtnDiv>
          </StLi>
        </>
      )}
    </>
  );
};

export default OwnerMenuCard;

// const Stdiv = styled.div`
//   display: flex;
//   font-size: 30px;
// `;
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
  font-size: 20px;
`;
const StBtnDiv = styled(Wrapper)`
  display: flex;
  width: 100%;
  justify-content: center;
`;
const StInput = styled(Input)`
  padding: 0 30px;
  display: flex;
  width: 100%;
  justify-content: center;
  height: 60%;
  background-color: rgba(0, 0, 0, 0);
  border: 0;
  font-size: 20px;

  /* border-bottom: 1px solid ${(props) => props.theme.subC};
  font-size: 20px; */
`;
