import React from "react";
import Navbar from "../Components/Navbar";
import Main from "./SolverLayout";
import { Card } from "@mui/material";
const Layout = (props) => {
  return (
    <div className="layout-container">
      <div className="body dark:bg-gray-900">
        <Navbar />
        <div className="content mt-20 min-h-screen dark:bg-gray-900">
          {props.children}
        </div>
      </div>
    </div>
  );
};
export default Layout;
