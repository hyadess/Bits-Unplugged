import React, { useState } from "react";

const CardContainer = (props) => {
  return (
    <div
      className={`grid grid-cols-1 justify-center items-center mx-auto max-w-screen-2xl xl:gap-16 x:gap:16 gap-16 md:grid-cols-${props.col} h-full`}
    >
      {props.children}
    </div>
  );
};

export default CardContainer;
