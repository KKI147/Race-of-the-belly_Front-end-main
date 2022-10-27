import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../elem/Button";
import Input from "../../elem/Input";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { __addMenuByIdThunk } from "../../redux/modules/menulistSlice";

const AddMenuForm = () => {
  const { restaurantId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [files, setFiles] = useState("");
  const [preview, setPreview] = useState();

  const [menuObj, setMenuObj] = useState({
    menuName: "",
    price: 0,
    // desc: "",
    // restaurantId: restaurantId,
  });

  const { menuName, price, desc } = menuObj;

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setMenuObj({ ...menuObj, [name]: value });
  };

  // const onImgChange = (e) => {
  //   if (e.target.files) {
  //     const uploadFile = e.target.files[0];
  //     const formData = new FormData();
  //     formData.append("files", uploadFile);
  //     setMenuObj({ ...menuObj, img: formData });
  //     setPreview(URL.createObjectURL(uploadFile));
  //   }
  // };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(__addMenuByIdThunk(menuObj));
    // console.log(menuObj);
  };

  return (
    <StContainerDiv>
      <StDiv>
        <img src="" />
        {/* <Input
          type="file"
          name="file"
          accept="image/*"
          // onChange={onImgChange}
        ></Input> */}
      </StDiv>
      <Stform onSubmit={onSubmitHandler}>
        <StInput
          type="text"
          name="menuName"
          value={menuName}
          onChange={onChangeHandler}
          placeholder="음식명"
        />
        {/* <textarea
          value={desc}
          name="desc"
          id=""
          cols="30"
          rows="10"
          onChange={onChangeHandler}
          placeholder="음식 설명"
        ></textarea> */}
        <StInput
          type="number"
          name="price"
          onChange={onChangeHandler}
          value={price}
          placeholder="가격"
        />
        <StBtn onClick={() => navigate(-1)}>메뉴 추가</StBtn>
      </Stform>
    </StContainerDiv>
  );
};

export default AddMenuForm;

const Stform = styled.form`
  display: flex;
  flex-direction: column;
`;
const StContainerDiv = styled.div`
  display: flex;
  img {
    height: 250px;
    width: 250px;
    border: 1px solid ${(props) => props.theme.subC};
    margin-bottom: 20px;
  }
  textarea {
    margin-bottom: 10px;
    border: 1px solid ${(props) => props.theme.subC};
    min-width: 200px;
    max-width: 200px;
    min-height: 185px;
    max-height: 185px;
  }
`;
const StDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 15px;
`;

const StInput = styled(Input)`
  margin-bottom: 20px;
  border: 0;
  border-bottom: 1px solid ${(props) => props.theme.subC};
`;
const StBtn = styled(Button)`
  height: 25px;
  background-color: white;
  border: 1px solid ${(props) => props.theme.subC};
  border-radius: 20px;
  transition: 0.5s ease-in-out;
  :hover {
    color: white;
    background-color: ${(props) => props.theme.subC};
  }
`;
