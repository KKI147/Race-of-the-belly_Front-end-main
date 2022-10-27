import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
// import Button from "../elem/Button";
import { setCookie, deleteCookie } from "../shared/Cookie";

const Header = () => {
  const navigate = useNavigate();
  return (
    <>
      <StDiv>
        <Img
          onClick={() => navigate(-1)}
          src={process.env.PUBLIC_URL + "/img/logo.png"}
        ></Img>
        <Img1 src={process.env.PUBLIC_URL + "/img/logo2.png"}></Img1>
        <Button
          onClick={(e) => {
            localStorage.removeItem("Authorization" && "Refresh-token");
            // localStorage.removeIteme();
            alert("로그아웃 되셨습니다.");
            navigate("/");
          }}
        >
          Logo out
        </Button>
      </StDiv>
    </>
  );
};

export default Header;

const Img = styled.img`
  width: 150px;
  height: 99px;
  object-fit: cover;
`;

const Img1 = styled.img`
  width: 200px;
  height: 80px;
  margin: 10px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

const StDiv = styled.div`
  display: flex;
  height: 100px;
  border-bottom: 1px solid #fcbe32;
  justify-content: space-between;
`;

const Button = styled.button`
  background: white;
  border-radius: 20px;
  height: 50px;
  width: 100px;
  border: 1px solid #fcbe32;
  margin: 20px 30px;
  :hover {
    color: white;
    background: #fcbe32;
  }
`;
