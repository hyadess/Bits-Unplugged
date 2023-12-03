import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthController from "../controller/authController";
const authController = new AuthController();
export default function Navbar() {
  const navigator = useNavigate();
  const switchPath = (pathname) => {
    navigator(pathname);
  };
  return (
    <div
      className="flex flex-row w-screen z-10 h-20 md:flex-col md:w-screen bg-gray-100 fixed bottom-0 md:top-0 bg-slate-800"
      style={{ alignItems: "space-between", justifyContent: "center" }}
    >
      <div className="flex flex-row">
        <div className="icon flex-2 hidden md:flex w-20 h-20 ">
          <img
            src="https://i.postimg.cc/SsnSSJVq/image.png"
            style={{ padding: "10px" }}
          />
        </div>
        <div className="flex flex-1" style={{ justifyContent: "center" }}>
          <button
            className="icon flex flex-col w-30 h-20 md:w-40 md:tooltip md:tooltip-right md:tooltip-info "
            style={{ alignItems: "center", justifyContent: "center" }}
            data-tip="Home"
            onClick={() => switchPath("/")}
          >
            <div className="text-xs md:text-lg md:font-bold md:text-white-800 hover:text-pink-500 hover:text-pink-500 text-white">
              Home
            </div>
            <div className="divider hidden md:flex "></div>
          </button>
          <button
            className="icon flex flex-col w-20 h-20 md:w-40 md:tooltip md:tooltip-right md:tooltip-info "
            style={{ alignItems: "center", justifyContent: "center" }}
            data-tip="Home"
            onClick={() => switchPath("/playground")}
          >
            <div className="text-xs md:text-lg md:font-bold md:text-white-800 hover:text-pink-500 hover:text-pink-500 text-white">
              Playground
            </div>
            <div className="divider hidden md:flex "></div>
          </button>
          <button
            className="icon flex flex-col w-20 h-20 md:w-40 md:tooltip md:tooltip-right md:tooltip-info "
            style={{ alignItems: "center", justifyContent: "center" }}
            data-tip="Home"
            onClick={() => switchPath("/problems")}
          >
            <div className="text-xs md:text-lg md:font-bold md:text-white-800 hover:text-pink-500 hover:text-pink-500 text-white">
              Topics
            </div>
            <div className="divider hidden md:flex "></div>
          </button>
          <button
            className="icon flex flex-col w-20 h-20 md:w-40 md:tooltip md:tooltip-right md:tooltip-info "
            style={{ alignItems: "center", justifyContent: "center" }}
            data-tip="Home"
            onClick={() => switchPath("/problemSet")}
          >
            <div className="text-xs md:text-lg md:font-bold md:text-white-800 hover:text-pink-500 hover:text-pink-500 text-white">
              Set Problems
            </div>
            <div className="divider hidden md:flex "></div>
          </button>
          <button
            className="icon flex flex-col w-20 h-20 md:w-40 md:tooltip md:tooltip-right md:tooltip-info "
            style={{ alignItems: "center", justifyContent: "center" }}
            data-tip="Marketplace"
            onClick={() => switchPath("/profile")}
          >
            <div className="text-xs md:text-lg md:font-bold md:text-white-800 hover:text-pink-500 hover:text-pink-500 text-white">
              Profile
            </div>
          </button>
          <button
            className="icon flex flex-col w-20 h-20 md:w-40 md:tooltip md:tooltip-right md:tooltip-info "
            style={{ alignItems: "center", justifyContent: "center" }}
            data-tip="Marketplace"
            onClick={() => {
              authController.logout();
              switchPath("/");
            }}
          >
            <div className="text-xs md:text-lg md:font-bold md:text-white-800 hover:text-pink-500 hover:text-pink-500 text-white">
              Logout
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
