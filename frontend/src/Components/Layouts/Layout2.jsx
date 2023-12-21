import React from "react";
import Layout1 from "./Layout1";
import Navbar from "../Navbar";

const Layout2 = (props) => {
  return (
    <Layout1>
      <Navbar>{props.nav}</Navbar>
      <div className="content mb-20 md:mb-0 min-h-screen">{props.children}</div>
    </Layout1>
  );
};

export default Layout2;
