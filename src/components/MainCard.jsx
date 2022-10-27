import React, { useEffect } from "react";
import Wrapper from "../elem/Wrapper";
import { useDispatch, useSelector } from "react-redux";
import { __getRestaurantList } from "../redux/modules/restaurantSlice";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const MainCard = () => {
  const mainlist = useSelector((state) => state.restaurantlist.restaurantlist);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log(mainlist);
  useEffect(() => {
    dispatch(__getRestaurantList());
  }, [dispatch]);

  return (
    <>
      {/* <Super>
        <div class="wave -one"></div>
        <div class="wave -two"></div>
        <div class="wave -three"></div>
        <div class="title">어느게 더 맘에 드시나요</div>
      </Super> */}
      {mainlist && mainlist.length > 0
        ? mainlist.map((restaurant, idx) => {
            return (
              <StDiv
                key={idx}
                mg="50px 0px 0px 40px"
                pd="20px"
                inline="background: #e1eef6 ; "
                onClick={() => {
                  navigate(`/order/${restaurant.restaurantId}`);
                }}
              >
                <Stdiv>
                  <Img src={process.env.PUBLIC_URL + "/img/logo.png"}></Img>
                  <br />
                  <div>{restaurant.name}</div>
                  <br />
                </Stdiv>
              </StDiv>
            );
          })
        : ""}
    </>
  );
};

export default MainCard;

const Stdiv = styled.div`
  font-size: 30px;
`;

const Img = styled.img`
  width: 150px;
  height: 99px;
  object-fit: cover;
  margin: 0px 20px 20px 0px;
  background-color: #eaeef6;
  border-bottom: 5px solid black;
`;

const StDiv = styled(Wrapper)`
  background: #eaeef6;
  width: 200px;
  height: 300px;
  display: flex;
  flex-wrap: wrap;
  border-style: outset;
  border-radius: 12px;
`;

const Super = styled.div`
  width: 300px;
  height: 300px;
  border-style: outset;
  border-radius: 12px;
  box-shadow: 0 2px 30px rgba(black, 0.2);
  background: lighten(#f0f4c3, 10%);
  position: relative;
  overflow: hidden;
  transform: translate3d(0, 0, 0);
  background: #e8a;

  .wave {
    opacity: 0.4;
    position: absolute;
    top: 3%;
    left: 50%;
    background: #0af;
    width: 500px;
    height: 500px;
    margin-left: -250px;
    margin-top: -250px;
    transform-origin: 50% 48%;
    border-radius: 43%;
    animation: drift 3000ms infinite linear;
    .wave.-three {
      animation: drift 5000ms infinite linear;
    }

    .wave.-two {
      animation: drift 7000ms infinite linear;
      opacity: 0.1;
      background: yellow;
    }
  }
  .box:after {
    content: "";
    display: block;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to bottom,
      rgba(#e8a, 1),
      rgba(#def, 0) 80%,
      rgba(white, 0.5)
    );
    z-index: 11;
    transform: translate3d(0, 0, 0);
  }

  .title {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    z-index: 1;
    line-height: 300px;
    text-align: center;
    transform: translate3d(0, 0, 0);
    color: white;
    text-transform: uppercase;
    font-family: "Playfair Display", serif;
    letter-spacing: 0.4em;
    font-size: 18px;
    text-shadow: 0 1px 0 rgba(black, 0.1);
    text-indent: 0.3em;
  }
  @keyframes drift {
    from {
      transform: rotate(0deg);
    }
    from {
      transform: rotate(360deg);
    }
  }
`;
