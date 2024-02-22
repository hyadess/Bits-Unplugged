import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from "../../components/Logo";
import { setLoading } from "../../App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faList,
  faPeopleGroup,
  faRightToBracket,
} from "@fortawesome/free-solid-svg-icons";
import Banner from "../../components/Banner";
import GlobalContext from "../../store/GlobalContext";
const PublicNavbar = ({ nav, setNav }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [darkMode, setDarkMode] = useState(null);
  const { setColorMode } = useContext(GlobalContext);
  const toggleDarkMode = () => {
    setColorMode(darkMode ? "light" : "dark");
    setDarkMode((prevDarkMode) => !prevDarkMode);
    console.log("Toggled");
  };

  useEffect(() => {
    if (darkMode != null) {
      if (darkMode) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("color-theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("color-theme", "light");
      }
    }
  }, [darkMode]);

  useEffect(() => {
    console.log("Color-scheme: ", localStorage.getItem("color-theme"));
    if (localStorage.getItem("color-theme") === "dark") {
      setDarkMode(true);
    } else {
      setDarkMode(false);
    }
  }, []);

  return (
    <div
      className={
        `flex flex-row w-full justify-between md:justify-center bu-nav-color bg-opacity-5 ` +
        (nav !== "home" ? "" : "")
      }
    >
      <div className="icon flex-2 hidden md:flex h-20 w-1/5 items-center">
        <div
          className="p-5 pr-2"
          onClick={() => {
            if (location.pathname !== "/landing") {
              setLoading(true);
              navigate("/landing");
            }
          }}
        >
          <Logo />
          {/* <Banner height={41} width={156} /> */}
        </div>
        <div className="bu-text-title text-2xl font-serif font-bold font-logo">
          Bits Unplugged
        </div>
      </div>
      <div className="flex md:justify-center w-full md:w-3/5">
        <>
          {/* <div className="py-3">
            <Banner width={300} height={60} />
          </div> */}
          {/* <div>
            <span className="text-5xl font-bold">BITS</span> <br />
            <span className="font-bold text-center">UNPLUGGED</span>
          </div> */}
          <button
            className={`flex-grow-1 basis-1/3 md:basis-1/6 icon flex flex-col w-30 h-20 md:w-40 md:tooltip md:tooltip-right md:tooltip-info  items-center justify-center border-b-4 ${
              nav === "home"
                ? "border-[#1C5B5F] dark:border-pink-500"
                : "border-transparent"
            }`}
            data-tip="Home"
            // href="#home"
            onClick={() => {
              setNav("home");
            }}
          >
            <div
              className={`text-xs md:text-lg md:font-bold  flex flex-row items-center gap-3 ${
                nav === "home" ? "bu-text-title" : "bu-text-primary-hover"
              }`}
            >
              <FontAwesomeIcon icon={faHouse} />
              Home
            </div>
            <div className="divider hidden md:flex "></div>
          </button>

          <button
            className={`flex-grow-1 basis-1/3 md:basis-1/6 icon flex flex-col w-30 h-20 md:w-40 md:tooltip md:tooltip-right md:tooltip-info  items-center justify-center border-b-4 ${
              nav === "features"
                ? "border-[#1C5B5F] dark:border-pink-500"
                : "border-transparent"
            }`}
            data-tip="Features"
            // href="#features"
            onClick={() => {
              setNav("features");
            }}
          >
            <div
              className={`text-xs md:text-lg md:font-bold  flex flex-row items-center gap-3 ${
                nav === "features" ? "bu-text-title" : "bu-text-primary-hover"
              }`}
            >
              <FontAwesomeIcon icon={faList} />
              Features
            </div>
            <div className="divider hidden md:flex "></div>
          </button>
          <button
            className={`flex-grow-1 basis-1/3 md:basis-1/6 icon flex flex-col w-30 h-20 md:w-40 md:tooltip md:tooltip-right md:tooltip-info  items-center justify-center border-b-4 ${
              nav === "aboutus"
                ? "border-[#1C5B5F] dark:border-pink-500"
                : "border-transparent"
            }`}
            data-tip="About Us"
            // href="#aboutus"
            onClick={() => {
              setNav("aboutus");
            }}
          >
            <div
              className={`text-xs md:text-lg md:font-bold  flex flex-row items-center gap-3 ${
                nav === "aboutus" ? "bu-text-title" : "bu-text-primary-hover"
              }`}
            >
              <FontAwesomeIcon icon={faPeopleGroup} />
              About us
            </div>
            <div className="divider hidden md:flex "></div>
          </button>
          {/* <button
            className={`flex-grow-1 basis-1/3 md:basis-1/6 icon flex flex-col w-30 h-20 md:w-40 md:tooltip md:tooltip-right md:tooltip-info  items-center justify-center border-b-4 ${
              location.pathname === "/login"
                ? "border-[#1C5B5F] dark:border-pink-500"
                : "border-transparent"
            }`}
            data-tip="Home"
            onClick={() => navigate("/login")}
          >
            <div
              className={`text-xs md:text-lg md:font-bold  flex flex-row items-center gap-3 ${
                location.pathname === "/login"
                  ? "bu-text-title"
                  : "bu-text-primary-hover"
              }`}
            >
              <FontAwesomeIcon icon={faRightToBracket} />
              Login
            </div>
            <div className="divider hidden md:flex "></div>
          </button> */}
        </>
      </div>
      <div className="flex flex-row h-20 w-1/3 md:w-1/5 items-center justify-end px-5 gap-5">
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
        <button
          className="font-semibold flex-row items-center gap-3 rounded-lg text-lg px-7 py-2 text-center bu-button-primary hidden md:flex"
          onClick={() => {
            document.body.style.cursor = "default";
            navigate("/login");
          }}
        >
          <FontAwesomeIcon icon={faRightToBracket} />
          <h1 className="align-middle">Sign in</h1>
        </button>
      </div>
    </div>
  );
};

export default PublicNavbar;
