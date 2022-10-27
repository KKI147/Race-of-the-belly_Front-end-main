import React from "react";
import styled from "styled-components";

const Wrapper = (props) => {
  return <WrapperDiv {...props}>{props.children}</WrapperDiv>;
};

export default Wrapper;

const WrapperDiv = styled.div`
  margin: ${(props) => props.mg};
  padding: ${(props) => props.pd};
  width: ${(props) => props.wd};
  height: ${(props) => props.hg};
  ${(props) => props.inline};
`;
