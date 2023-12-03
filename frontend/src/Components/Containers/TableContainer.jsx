import React, { useState } from "react";
import Divider from "@mui/material/Divider";
// import UserCard from "../Cards/UserCard";
// import SearchBar from "../InputFields/SearchBar";
// import "./CardContainer.scss";
import Zoom from "@mui/material/Zoom";

const TableContainer = (props) => {
  return (
    <div className="flex flex-col flex-wrap items-center justify-center items-center pb-8 mx-auto max-w-screen-2xl xl:gap-8 x:gap:16 gap-8">
      {props.children}
    </div>
  );
};

export default TableContainer;
