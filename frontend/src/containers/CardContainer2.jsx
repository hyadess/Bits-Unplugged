import React, { useState } from "react";

const CardContainer = (props) => {
  return (
    <div
      className={`grid grid-cols-1 justify-center items-center mx-auto max-w-screen-2xl xl:gap-8 x:gap:8 gap-8 md:grid-cols-${props.col} h-full w-full mb-3`}
    >
      {props.children}
    </div>
  );
};

export default CardContainer;
