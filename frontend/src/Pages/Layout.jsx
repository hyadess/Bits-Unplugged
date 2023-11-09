import React from "react";
import Navbar from "../Components/Navbar";
const Layout = (props) => {
  return (
    <div className="layout-container">
      <div className="body">
        <Navbar />
        <div className="content">{props.children}</div>
      </div>
    </div>
  );
};
export default Layout;
