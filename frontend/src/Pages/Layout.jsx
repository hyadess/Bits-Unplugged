import React from "react";
import Navbar from "../Components/Navbar";
import Main from "./SolverLayout";
import { Card } from "@mui/material";
import PrivateNavbar from "../Components/PrivateNavbar";
const Layout = (props) => {
  return (
    <div className="layout-container">
      <div className="body bu-bg-color">
        <Navbar>
          <PrivateNavbar />
        </Navbar>
        <div className="content mb-20 md:mb-0 min-h-screen">
          {props.children}
        </div>
      </div>
    </div>
  );
};
export default Layout;
