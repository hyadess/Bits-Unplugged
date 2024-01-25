import React, { useState } from "react";
import Divider from "@mui/material/Divider";
// import UserCard from "../Cards/UserCard";
// import SearchBar from "../InputFields/SearchBar";
// import "./CardContainer.scss";
import Zoom from "@mui/material/Zoom";
import { setLoading } from "../App";

const TableContainer = (props) => {
  return (
    <div className="flex flex-col flex-wrap justify-center items-center pb-8 mx-auto max-w-screen-2xl xl:gap-5 x:gap:5 gap-5 w-full">
      {props.children}
    </div>
  );
};

export default TableContainer;
