import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthController from "../controller/authController";
import { Avatar, InputAdornment, Typography } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import Cookies from "universal-cookie";
import ProfileController from "../controller/profileController";
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
      }
      setType(cookies.get("type"));
    }
  };
  useEffect(() => {
    setProfile();
  }, []);
  return (
    <div
      className="flex flex-row w-screen z-10 h-20 md:flex-col md:w-screen bg-gray-100 fixed bottom-0 md:top-0 dark:bg-slate-800"
      style={{ alignItems: "space-between", justifyContent: "center" }}
    >
      <div className="flex flex-row w-full sm:justify-between">
        <div
          className="icon flex-2 hidden md:flex h-20 "
          style={{ width: "20%" }}
        >
          <img
            src="https://i.postimg.cc/SsnSSJVq/image.png"
            style={{ padding: "10px" }}
            onClick={() => {
              switchPath("/");
            }}
          />
        </div>
        <div
          className="flex justify-start md:justify-center"
          style={{ width: "55%" }}
        >
          {type >= 0 ? (
            <>
              <button
                className="flex-grow-1 basis-1/4 md:basis-1/6 icon flex flex-col w-30 h-20 md:w-40 md:tooltip md:tooltip-right md:tooltip-info "
                style={{ alignItems: "center", justifyContent: "center" }}
                data-tip="Home"
                onClick={() => switchPath("/")}
              >
                <div className="text-xs md:text-lg md:font-bold md:text-white-800 hover:text-pink-500 dark:hover:text-pink-500 dark:text-white">
                  Home
                </div>
                <div className="divider hidden md:flex "></div>
              </button>
              {type == 0 ? (
                <button
                  className="flex-grow-1 basis-1/4 md:basis-1/6 icon flex flex-col w-20 h-20 md:w-40 md:tooltip md:tooltip-right md:tooltip-info "
                  style={{ alignItems: "center", justifyContent: "center" }}
                  data-tip="Home"
                  onClick={() => switchPath("/playground")}
                >
                  <div className="text-xs md:text-lg md:font-bold md:text-white-800 hover:text-pink-500 dark:hover:text-pink-500 dark:text-white">
                    Playground
                  </div>
                  <div className="divider hidden md:flex "></div>
                </button>
              ) : (
                <></>
              )}

              {type == 0 ? (
                <button
                  className="flex-grow-1 basis-1/4 md:basis-1/6 icon flex flex-col w-20 h-20 md:w-40 md:tooltip md:tooltip-right md:tooltip-info "
                  style={{ alignItems: "center", justifyContent: "center" }}
                  data-tip="Home"
                  onClick={() => switchPath("/topics")}
                >
                  <div className="text-xs md:text-lg md:font-bold md:text-white-800 hover:text-pink-500 dark:hover:text-pink-500 dark:text-white">
                    Topics
                  </div>
                  <div className="divider hidden md:flex "></div>
                </button>
              ) : (
                <></>
              )}

              {type == 1 ? (
                <button
                  className="flex-grow-1 basis-1/4 md:basis-1/6 icon flex flex-col w-20 h-20 md:w-40 md:tooltip md:tooltip-right md:tooltip-info "
                  style={{ alignItems: "center", justifyContent: "center" }}
                  data-tip="Home"
                  onClick={() => switchPath("/problemSet")}
                >
                  <div className="text-xs md:text-lg md:font-bold md:text-white-800 hover:text-pink-500 dark:hover:text-pink-500 dark:text-white">
                    Set Problems
                  </div>
                  <div className="divider hidden md:flex "></div>
                </button>
              ) : (
                <></>
              )}
            </>
          ) : (
            <></>
          )}

          {/* <button
          className="icon flex flex-col w-20 h-20 md:w-40 md:tooltip md:tooltip-right md:tooltip-info "
          style={{ alignItems: "center", justifyContent: "center" }}
          data-tip="Marketplace"
          onClick={() => switchPath("/profile")}
        >
          <div className="text-xs md:text-lg md:font-bold md:text-white-800 hover:text-pink-500 dark:hover:text-pink-500 dark:text-white">
            Profile
          </div>
        </button> */}
          {/* <button
          className="icon flex flex-col w-20 h-20 md:w-40 md:tooltip md:tooltip-right md:tooltip-info "
          style={{ alignItems: "center", justifyContent: "center" }}
          data-tip="Marketplace"
          onClick={() => {
            authController.logout();
            switchPath("/login");
          }}
        >
          <div className="text-xs md:text-lg md:font-bold md:text-white-800 hover:text-pink-500 dark:hover:text-pink-500 dark:text-white">
            Logout
          </div>
        </button> */}
        </div>
        <div className="icon  md:flex h-20 w-1/3 md:w-1/4">
          <div
            className="hbox"
            style={{ justifyContent: "center", width: "100%" }}
          >
            <div className="hbox w-70" style={{ width: "75%" }}>
              <button
                className="icon flex flex-col w-70 h-20 md:tooltip md:tooltip-right md:tooltip-info"
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  width: "75%",
                }}
                data-tip="Marketplace"
                onClick={() => {
                  switchPath("/profile/" + user.username);
                }}
              >
                <div className="text-xs md:text-lg md:font-bold md:text-white-800 hover:text-pink-500 dark:hover:text-pink-500 dark:text-white">
                  {user != null ? user.fullname : "Loading..."}
                </div>{" "}
              </button>
              <div
                className="flex md:flex items-center justify-center"
                style={{ width: "25%" }}
              >
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
            </div>
            <button
              className="icon flex flex-col w-30 h-20 md:tooltip md:tooltip-right md:tooltip-info items-center"
              style={{
                // alignItems: "right",
                justifyContent: "center",
                width: "25%",
              }}
              data-tip="Marketplace"
              onClick={() => {
                authController.logout();
                switchPath("/login");
              }}
            >
              <LogoutIcon
                className="text-xs md:text-lg md:font-bold md:text-white-800 hover:text-pink-500 dark:hover:text-pink-500 dark:text-white"
                sx={{ fontSize: "2rem", color: "white" }}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
