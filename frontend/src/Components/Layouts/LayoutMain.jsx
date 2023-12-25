import React from "react";
import Layout1 from "./Layout1";

const LayoutMain = (props) => {
  return (
    <>
      <div className="p-5 md:mt-20 hidden lg:flex fixed left-0 bottom-0 top-0 w-1/5">
        {props.left}
      </div>
      <div className="lg:mx-auto pb-5 overflow-hidden p-5 pt-0 md:p-5 md:pt-20 min-h-screen w-full md:w-4/5 lg:w-3/5">
        {props.children}
      </div>
      <div className="p-5 md:mt-20 hidden md:flex fixed right-0 bottom-0 top-0 w-1/5">
        {props.right}
      </div>
    </>
  );
};

export default LayoutMain;
