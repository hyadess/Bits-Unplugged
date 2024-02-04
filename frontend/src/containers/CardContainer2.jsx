import React, { useState } from "react";

const CardContainer = (props) => {
  return (
    <div
      className={`grid grid-cols-1 justify-center items-center mx-auto max-w-screen-2xl gap-8 h-full w-full mb-3 md:grid-cols-2`}
    >
      {props.children}
    </div>
  );
};

export default CardContainer;
