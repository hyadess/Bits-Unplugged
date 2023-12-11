import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthController from "../controller/authController";
import { Avatar, InputAdornment, Typography } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import Cookies from "universal-cookie";
import ProfileController from "../controller/profileController";
import Logo from "./Logo";
import Banner from "./Banner";
const authController = new AuthController();
const profileController = new ProfileController();
const PublicNavbar = (props) => {
  const navigator = useNavigate();
  const switchPath = (pathname) => {
    navigator(pathname);
  };

  return (
    <div
      className="flex flex-row w-screen z-10 h-20 md:flex-col md:w-screen bg-gray-100 fixed bottom-0 md:top-0 bg-slate-800"
      style={{ alignItems: "space-between", justifyContent: "center" }}
    >
      <div className="flex flex-row w-full justify-between md:justify-center">
        <div className="icon flex-2 hidden md:flex h-20 w-1/5 px-5">
          <div
            className="p-5 pl-0"
            onClick={() => {
              switchPath("/home");
            }}
          >
            {/* <Banner width={180} height={45} /> */}
            <Logo />
          </div>
        </div>
        <div className="flex md:justify-center w-full md:w-3/5">
          <>
            <button
              className="flex-grow-1 basis-1/3 md:basis-1/6 icon flex flex-col w-30 h-20 md:w-40 md:tooltip md:tooltip-right md:tooltip-info "
              style={{ alignItems: "center", justifyContent: "center" }}
              data-tip="Home"
              onClick={() => switchPath("/home")}
            >
              <div className="text-xs md:text-lg md:font-bold md:text-white-800 hover:text-pink-500 hover:text-pink-500 text-white">
                Home
              </div>
              <div className="divider hidden md:flex "></div>
            </button>

            <button
              className="flex-grow-1 basis-1/3 md:basis-1/6 icon flex flex-col w-20 h-20 md:w-40 md:tooltip md:tooltip-right md:tooltip-info "
              style={{ alignItems: "center", justifyContent: "center" }}
              data-tip="Home"
              onClick={() => switchPath("/home")}
            >
              <div className="text-xs md:text-lg md:font-bold md:text-white-800 hover:text-pink-500 hover:text-pink-500 text-white">
                About Us
              </div>
              <div className="divider hidden md:flex "></div>
            </button>
            <button
              className="icon basis-1/3 md:basis-1/6 flex flex-col w-20 h-20 md:w-40 md:tooltip md:tooltip-right md:tooltip-info "
              style={{ alignItems: "center", justifyContent: "center" }}
              data-tip="Marketplace"
              onClick={() => switchPath("/home")}
            >
              <div className="text-xs md:text-lg md:font-bold md:text-white-800 hover:text-pink-500 hover:text-pink-500 text-white">
                Features
              </div>
            </button>

            <button
              className="flex-grow-1 basis-1/3 md:basis-1/6 icon flex flex-col w-20 h-20 md:w-40 md:tooltip md:tooltip-right md:tooltip-info "
              style={{ alignItems: "center", justifyContent: "center" }}
              data-tip="Home"
              onClick={() => switchPath("/login")}
            >
              <div className="text-xs md:text-lg md:font-bold md:text-white-800 hover:text-pink-500 hover:text-pink-500 text-white">
                Login
              </div>
              <div className="divider hidden md:flex "></div>
            </button>
          </>
        </div>
        <div className="hidden md:flex h-20 w-1/3 md:w-1/5 items-center justify-center"></div>
        {/* </div> */}
      </div>
    </div>
  );
};

export default PublicNavbar;
