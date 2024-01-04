import React from "react";
import Layout2 from "./Layout2";

const Layout3 = (props) => {
  return (
    <Layout2 nav={props.nav}>
      <div className="left p-5 md:mt-20 hidden md:flex fixed left-0 bottom-0 top-0 w-1/5">
        {props.left}
      </div>
      <div className="mx-auto pb-5 overflow-hidden p-5 pt-0 md:p-5 md:pt-20 min-h-screen w-full md:w-4/5">
        {props.children}
      </div>
    </Layout2>
  );
};

export default Layout3;
