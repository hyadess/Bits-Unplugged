import React from "react";
import Navbar from "../Components/Navbar";
import Main from "./Main";
import { Card } from "@mui/material";
const Layout = (props) => {
  return (
    <div className="layout-container">
      <div className="body dark:bg-gray-900">
        <Navbar />
        <div className="content mt-20 w-1/2 mx-auto min-h-screen">
          {/* <div className="flex min-h-screen dark:bg-gray-900"> */}
          {props.children}
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};
export default Layout;
