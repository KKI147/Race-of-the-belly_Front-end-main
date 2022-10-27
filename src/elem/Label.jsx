import React from "react";
import styled from "styled-components";

const Label = (props) => {
  return <StLabel {...props} />;
};

export default Label;

const StLabel = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.textBoxC};
  border-radius: 5px;
  width: ${(props) => props.wd};
  height: ${(props) => props.hg};
  margin: ${(props) => props.mg};
`;
