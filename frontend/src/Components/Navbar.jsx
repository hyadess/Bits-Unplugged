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
const Navbar = (props) => {
  const [user, setUser] = useState(null);
  const [type, setType] = useState(-1);
  const navigator = useNavigate();
  const switchPath = (pathname) => {
    navigator(pathname);
  };

  const setProfile = async () => {
    const cookies = new Cookies();
    const isLoggedIn = !!cookies.get("token");
    if (isLoggedIn) {
      const res = await profileController.getProfile();
      if (res.success) {
        setUser(res.data[0]);
      } else {
        authController.logout();
        switchPath("/login");
      }
      setType(cookies.get("type"));
    }
  };
  useEffect(() => {
    setProfile();
  }, []);
  return (
    <div
      className="flex flex-row w-screen z-10 h-20 md:flex-col md:w-screen bg-gray-100 fixed bottom-0 md:top-0 bg-slate-800"
      style={{ alignItems: "space-between", justifyContent: "center" }}
    >
      {type >= 0 ? (
        <div className="flex flex-row w-full justify-between md:justify-center">
          <div className="icon flex-2 hidden md:flex h-20 w-1/5">
            <div className="p-5" onClick={() => navigator("/")}>
              <Banner width={180} height={45} />
              {/* <Logo /> */}
            </div>

            {/* <img
              src="%PUBLIC_URL%/icon.png"
              alt="bitsunplugged"
              style={{ padding: "10px" }}
              onClick={() => {
                switchPath("/");
              }}
            /> */}
          </div>
          <div className="flex justify-start md:justify-center w-8/12 md:w-3/5">
            <>
              <button
                className="flex-grow-1 basis-1/3 md:basis-1/6 icon flex flex-col w-30 h-20 md:w-40 md:tooltip md:tooltip-right md:tooltip-info "
                style={{ alignItems: "center", justifyContent: "center" }}
                data-tip="Home"
                onClick={() =>
                  type == 0 ? navigator("/topics") : navigator("/problemSet")
                }
              >
                <div className="text-xs md:text-lg md:font-bold md:text-white-800 hover:text-pink-500 hover:text-pink-500 text-white">
                  Home
                </div>
                <div className="divider hidden md:flex "></div>
              </button>
              {/* {type == 0 ? (
                <button
                  className="flex-grow-1 basis-1/3 md:basis-1/6 icon flex flex-col w-20 h-20 md:w-40 md:tooltip md:tooltip-right md:tooltip-info "
                  style={{ alignItems: "center", justifyContent: "center" }}
                  data-tip="Home"
                  onClick={() => switchPath("/playground")}
                >
                  <div className="text-xs md:text-lg md:font-bold md:text-white-800 hover:text-pink-500 hover:text-pink-500 text-white">
                    Playground
                  </div>
                  <div className="divider hidden md:flex "></div>
                </button>
              ) : (
                <></>
              )} */}

              {/* {type == 0 ? (
                <button
                  className="flex-grow-1 basis-1/3 md:basis-1/6 icon flex flex-col w-20 h-20 md:w-40 md:tooltip md:tooltip-right md:tooltip-info "
                  style={{ alignItems: "center", justifyContent: "center" }}
                  data-tip="Home"
                  onClick={() => switchPath("/topics")}
                >
                  <div className="text-xs md:text-lg md:font-bold md:text-white-800 hover:text-pink-500 hover:text-pink-500 text-white">
                    Topics
                  </div>
                  <div className="divider hidden md:flex "></div>
                </button>
              ) : (
                <></>
              )} */}

              {/* {type == 1 ? (
                <button
                  className="flex-grow-1 basis-1/3 md:basis-1/6 icon flex flex-col w-20 h-20 md:w-40 md:tooltip md:tooltip-right md:tooltip-info "
                  style={{ alignItems: "center", justifyContent: "center" }}
                  data-tip="Home"
                  onClick={() => switchPath("/problemSet")}
                >
                  <div className="text-xs md:text-lg md:font-bold md:text-white-800 hover:text-pink-500 hover:text-pink-500 text-white">
                    Set Problems
                  </div>
                  <div className="divider hidden md:flex "></div>
                </button>
              ) : (
                <></>
              )} */}
              <button
                className="icon basis-1/3 md:basis-1/6 flex flex-col w-20 h-20 md:w-40 md:tooltip md:tooltip-right md:tooltip-info "
                style={{ alignItems: "center", justifyContent: "center" }}
                data-tip="Marketplace"
                onClick={() => {
                  authController.logout();
                  switchPath("/login");
                }}
              >
                <div className="text-xs md:text-lg md:font-bold md:text-white-800 hover:text-pink-500 hover:text-pink-500 text-white">
                  Logout
                </div>
              </button>
            </>

            {/* <button
          className="icon flex flex-col w-20 h-20 md:w-40 md:tooltip md:tooltip-right md:tooltip-info "
          style={{ alignItems: "center", justifyContent: "center" }}
          data-tip="Marketplace"
          onClick={() => switchPath("/profile")}
        >
          <div className="text-xs md:text-lg md:font-bold md:text-white-800 hover:text-pink-500 hover:text-pink-500 text-white">
            Profile
          </div>
        </button> */}
          </div>
          <div className="flex md:flex h-20 w-1/3 md:w-1/5 items-center justify-end">
            {/* <div className="hbox justify-center w-full"> */}
            {/* <div className="justify-end hbox w-4/5 md:w-3/4"> */}
            <button
              className="hidden md:flex flex-col w-70 h-20 md:tooltip md:tooltip-right md:tooltip-info w-7/12 md:w-8/12"
              style={{
                alignItems: "center",
                justifyContent: "center",
                // width: "75%",
              }}
              data-tip="Marketplace"
              onClick={() => {
                switchPath("/profile/" + user.username);
              }}
            >
              <div className="text-xs md:text-lg md:font-bold md:text-white-800 hover:text-pink-500 hover:text-pink-500 text-white">
                {user != null ? user.fullname : "Loading..."}
              </div>{" "}
            </button>
            <div className="flex md:flex items-center justify-center w-3/5 md:w-1/3">
              {/* <img
                  src={
                    user != null
                      ? user.image
                      : "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Solid_black.svg/2048px-Solid_black.svg.png"
                  }
                  style={
                    {
                      // padding: "15%",
                      // borderRadius: "50%",
                      // width: "100%",
                      // maxHeight: "100%",
                      // objectFit: "cover",
                      // objectPosition: "center",
                      // display: "inline",
                    }
                  }
                  onClick={() => {
                    switchPath("/profile/" + user.username);
                  }}
                  className="object-cover w-14 h-14 rounded-full"
                /> */}
              <Avatar
                alt="blah"
                src={
                  user != null
                    ? user.image
                    : "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Solid_black.svg/2048px-Solid_black.svg.png"
                }
                // sx={{ width: "100%", height: "100%" }}
              />
            </div>
            {/* </div> */}
            {/* <button
              className="icon flex flex-col w-30 h-20 md:tooltip md:tooltip-right md:tooltip-info items-center w-1/5 md:w-3/12 justify-center"
              data-tip="Marketplace"
              onClick={() => {
                authController.logout();
                switchPath("/login");
              }}
            >
              <LogoutIcon
                className="text-xs md:text-lg md:font-bold md:text-white-800 hover:text-pink-500 hover:text-pink-500 text-white"
                sx={{ fontSize: "2rem", color: "white" }}
              />
            </button> */}
          </div>
          {/* </div> */}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Navbar;
