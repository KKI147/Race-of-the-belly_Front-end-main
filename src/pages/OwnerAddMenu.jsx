import React from "react";
import { useDispatch } from "react-redux";
import Header from "../components/Header";
import Layout from "../components/Layout";
import AddMenuForm from "../features/menu/AddMenuForm";

//메뉴페이지(owner)
function OwnerAddMenu() {
  const dispatch = useDispatch();

  return (
    <>
      <Header />
      <Layout>
        <AddMenuForm></AddMenuForm>
      </Layout>
    </>
  );
}

export default OwnerAddMenu;
