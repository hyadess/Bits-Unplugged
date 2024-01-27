import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Avatar, InputAdornment, Typography } from "@mui/material";
import Logo from "../Logo";
import SearchBar from "../InputFields/SearchBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { setLoading } from "../../App";
import { faTrello } from "@fortawesome/free-brands-svg-icons";
import { profileApi } from "../../api";
import AuthService from "../../services/authService";
import GlobalContext from "../../store/GlobalContext";
const PrivateNavbar = (props) => {
  const [user, setUser] = useState(null);
  const { type, setType } = useContext(GlobalContext);
  const [search, setSearch] = useState(false);
  const [tab, setTab] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  const setProfile = async () => {
    const isLoggedIn = localStorage.hasOwnProperty("token");
    if (isLoggedIn) {
      const res = await profileApi.getProfile();
      if (res.success) {
        setUser(res.data[0]);
        // break;
      } else {
        // navigate("/login");
      }
    }
  };

  const [darkMode, setDarkMode] = useState(null);

  const toggleDarkMode = () => {
    setDarkMode((prevDarkMode) => !prevDarkMode);
    console.log("Toggled");
  };

  useEffect(() => {
    if (darkMode != null) {
      if (darkMode) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("color-theme", "dark");
        window.dispatchEvent(new Event("storage"));
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("color-theme", "light");
        window.dispatchEvent(new Event("storage"));
      }
    }
  }, [darkMode]);

  useEffect(() => {
    console.log(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    setProfile();

    if (localStorage.getItem("color-theme") === "dark") {
      setDarkMode(true);
    } else {
      setDarkMode(false);
    }
  }, [localStorage]);

  return (
    <>
      {type >= 0 && (
        <div className="flex flex-row w-full justify-between md:justify-center shadow-md">
          <div className="hidden md:flex h-20 w-1/5 items-center px-5">
            <div
              className={`p-5 pl-0 transition-all duration-300 ease-in-out ${
                !search ? "opacity-100" : "opacity-0 hidden"
              }`}
              onClick={() => {
                setLoading(true);
                navigate("/landing");
              }}
            >
              <Logo width={180} height={45} />
            </div>

            <SearchBar label={"user name"} setSearch={setSearch} />
          </div>
          <div className="flex justify-start md:justify-center w-8/12 md:w-3/5">
            <>
              <button
                className={`flex-grow-1 basis-1/3 md:basis-1/6 icon flex flex-col w-30 h-20 md:w-40 md:tooltip md:tooltip-right md:tooltip-info  items-center justify-center border-b-4 ${
                  (type == 0 && location.pathname === "/topics") ||
                  (type == 1 && location.pathname === "/problemSet")
                    ? "border-[#1C5B5F] dark:border-pink-500"
                    : "border-transparent"
                }`}
                data-tip="Home"
                onClick={() => {
                  if (type == 0) {
                    if (location.pathname !== "/topics") {
                      setLoading(true);
                      navigate("/topics");
                    }
                  }
                  if (type == 1) {
                    if (location.pathname !== "/problemSet") {
                      setLoading(true);
                      navigate("/problemSet");
                    }
                  }
                }}
              >
                <div
                  className={`text-xs md:text-lg md:font-bold  flex flex-row items-center gap-3 ${
                    (type == 0 && location.pathname === "/topics") ||
                    (type == 1 && location.pathname === "/problemSet")
                      ? "bu-text-title"
                      : "bu-text-primary-hover"
                  }`}
                >
                  <FontAwesomeIcon icon={faHouse} />
                  Home
                </div>
                <div className="divider hidden md:flex "></div>
              </button>

              <button
                className={`icon basis-1/3 md:basis-1/6 flex flex-col w-20 h-20 md:w-40 md:tooltip md:tooltip-right md:tooltip-info items-center justify-center border-b-4 ${
                  (type == 0 && location.pathname === "/contests") ||
                  (type == 1 && location.pathname === "/setter/contests")
                    ? "border-[#1C5B5F] dark:border-pink-500"
                    : "border-transparent"
                }`}
                data-tip="Marketplace"
                onClick={() => {
                  setLoading(true);
                  navigate((type == 1 ? "setter" : "") + "/contests");
                }}
              >
                <div
                  className={`text-xs md:text-lg md:font-bold  flex flex-row items-center gap-3 ${
                    (type == 0 && location.pathname === "/contests") ||
                    (type == 1 && location.pathname === "/setter/contests")
                      ? "bu-text-title"
                      : "bu-text-primary-hover"
                  }`}
                >
                  <FontAwesomeIcon icon={faTrello} />
                  Contests
                </div>
              </button>

              <button
                className="icon basis-1/3 md:basis-1/6 flex flex-col w-20 h-20 md:w-40 md:tooltip md:tooltip-right md:tooltip-info items-center justify-center border-b-4 border-transparent"
                style={{ alignItems: "center", justifyContent: "center" }}
                data-tip="Marketplace"
                onClick={async () => {
                  setLoading(true);
                  await AuthService.logout();
                  setType(0);
                  navigate("/login");
                }}
              >
                <div className="text-xs md:text-lg md:font-bold flex flex-row gap-3 items-center bu-text-primary-hover ">
                  <FontAwesomeIcon icon={faRightFromBracket} />
                  Logout
                </div>
              </button>
            </>
          </div>
          <div className="flex md:flex h-20 w-1/3 md:w-1/5 items-center justify-end">
            {/* <button
              className="hidden md:flex flex-col w-70 h-20 md:tooltip md:tooltip-right md:tooltip-info w-7/12 md:w-8/12 justify-center items-center"
              data-tip="Marketplace"
              onClick={() => {
                navigate("/profile/" + user.username);
              }}
            >
              <div className="text-xs md:text-lg md:font-bold bu-text-primary-hover">
                {user != null ? user.fullname : "Loading..."}
              </div>{" "}
            </button> */}

            <div className="flex h-20 w-1/3 md:w-1/5 items-center justify-center">
              <div
                className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5"
                onClick={() => toggleDarkMode()}
              >
                <svg
                  id="theme-toggle-dark-icon"
                  className={`w-5 h-5 ${darkMode ? "block" : "hidden"}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                </svg>
                <svg
                  id="theme-toggle-light-icon"
                  className={`w-5 h-5 ${darkMode ? "hidden" : "block"}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
            </div>

            <div className="flex md:flex items-center justify-center w-3/5 md:w-1/3 cursor-pointer">
              <Avatar
                alt="blah"
                src={
                  user != null
                    ? user.image
                    : "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Solid_black.svg/2048px-Solid_black.svg.png"
                }
                onClick={() => {
                  setLoading(true);
                  type == 0
                    ? navigate("/user/" + user.username)
                    : navigate("/setter/" + user.username);
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PrivateNavbar;
