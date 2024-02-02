import React from "react";
import Layout1 from "./Layout1";
import Footer from "../Footer";

const LayoutMain = (props) => {
  return (
    <>
      <div className="fixed bottom-0 left-0 top-0 hidden w-1/5 p-5 md:mt-20 lg:flex">
        {props.left}
      </div>
      <div className="min-h-screen w-full p-5 pb-5 pt-0 md:w-4/5 md:p-5 md:pt-20 lg:mx-auto lg:w-3/5">
        {props.children}
      </div>
      <div className="fixed bottom-0 right-0 top-0 hidden w-1/5 p-5 md:mt-20 md:flex overflow-scroll scroll-smooth">
        {props.right}
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default LayoutMain;
