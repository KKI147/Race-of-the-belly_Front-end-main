import React from "react";
import styled from "styled-components";

const Input = (props) => {
  return <StInput {...props} required={true}></StInput>;
};

export default Input;

const StInput = styled.input``;
