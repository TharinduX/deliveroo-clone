import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./layout/NavBar";
import Footer from "./layout/Footer";

function Layout() {
  return (
    <>
      <NavBar />
      <Outlet />;
      <Footer />
    </>
  );
}
export default Layout;
