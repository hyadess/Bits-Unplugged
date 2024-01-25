import React from "react";
import Layout2 from "./Layout2";

const Layout3 = (props) => {
  return (
    <>
      <div className="fixed bottom-0 left-0 top-0 hidden w-1/5 p-5 md:mt-20 lg:flex">
        {props.left}
      </div>
      <div className="fixed right-0 pb-5 overflow-hidden p-5 pt-0 md:p-5 md:pt-20 min-h-screen w-full md:w-4/5">
        {props.children}
      </div>
    </>
  );
};

export default Layout3;
