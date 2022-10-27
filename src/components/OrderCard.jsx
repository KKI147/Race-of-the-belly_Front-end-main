import React, { useEffect } from "react";
import Wrapper from "../elem/Wrapper";
import { useDispatch, useSelector } from "react-redux";
import {
  __getCustomerlist,
  __getCustomerThunk,
} from "../redux/modules/customerlistSlice";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

const OrderCard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { restaurantId } = useParams();
  console.log(restaurantId);

  const newlist = useSelector((state) => state.customerlist.customerlist);

  useEffect(() => {
    dispatch(__getCustomerlist(restaurantId));
    console.log(3);
  }, [dispatch, restaurantId]);
  console.log(newlist);
  console.log(5);

  // {restaurantUsername: 'asd', memberUsername: 'assd', price: 13000, id: 1}
  return (
    <>
      {newlist && newlist.length > 0
        ? newlist.map((val, idx) => {
            return (
              <StDiv
                key={idx}
                mg="50px 0px 0px 40px"
                pd="30px"
                wd="300px"
                hg="200px"
                inline="background: #e1eef6 ; "
                onClick={() => {
                  navigate(`/order/${val.id}`);
                }}
              >
                <Stdiv>
                  <div>{val.restaurantId}</div>
                  <br />
                </Stdiv>
              </StDiv>
            );
          })
        : ""}
    </>
  );
};

export default OrderCard;
const Stdiv = styled.div`
  font-size: 30px;
  border: none;
  border-radius: 24px;
`;

const StDiv = styled(Wrapper)`
  border: 3px solid #fcbe32;
  border-radius: 24px;
  background: #eaeef6;
  width: 300px;
`;
