import React from "react";
import styled from "styled-components";

const Layout = ({ children }) => {
  return <Layoutdiv>{children}</Layoutdiv>;
};

export default Layout;

const Layoutdiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
  margin: 50px 0;
`;
