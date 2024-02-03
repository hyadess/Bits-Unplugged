import React, { useState } from "react";

const CardContainer = (props) => {
  return (
    <div
      className={`grid grid-cols-1 justify-center items-center mx-auto gap-8 md:grid-cols-${props.col} h-full w-full mb-3`}
    >
      {props.children}
    </div>
  );
};

export default CardContainer;
