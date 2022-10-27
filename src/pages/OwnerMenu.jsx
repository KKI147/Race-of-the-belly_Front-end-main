import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Layout from "../components/Layout";
import OwnerMenuList from "../features/menu/OwnerMenuList";

//메뉴페이지
function OwnerMenu() {
  return (
    <>
      <Header />
      <Layout>
        <OwnerMenuList></OwnerMenuList>
      </Layout>
    </>
  );
}

export default OwnerMenu;
