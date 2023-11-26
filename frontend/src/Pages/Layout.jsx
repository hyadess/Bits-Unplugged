import React from "react";
import Navbar from "../Components/Navbar";
const Layout = (props) => {
  return (
    <div className="layout-container">
      <div className="body">
        <Navbar />
        <div className="content">
          <div className="flex flex-col min-h-screen dark:bg-gray-900">
            <div className="left"></div>
            <div className="w-1/2 mx-auto pb-5">{props.children}</div>
            <div className="right"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Layout;
