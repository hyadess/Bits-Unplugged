import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from "../Logo";
import { setLoading } from "../../App";
import AdminNavButton from "./AdminNavButton";
import AuthService from "../../services/authService";
import GlobalContext from "../../store/GlobalContext";

const AdminNavbar = () => {
  const { setType } = useContext(GlobalContext);
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(null);

  const toggleDarkMode = () => {
    setDarkMode((prevDarkMode) => !prevDarkMode);
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
    <div className="flex flex-row w-full justify-between md:justify-center">
      <div className="icon flex-2 hidden md:flex h-20 w-1/5 px-5">
        <div
          className="p-5 pl-0"
          onClick={() => {
            setLoading(true);
            navigate("/home");
          }}
        >
          <Logo />
        </div>
      </div>
      <div className="flex md:justify-center w-full md:w-3/5">
        <>
          <AdminNavButton path="/admin/topics" label="Topics" />
          <AdminNavButton path="/admin/series" label="Series" />
          <AdminNavButton path="/admin/canvas" label="Canvas" />
          <AdminNavButton path="/admin/problems" label="Problems" />
          <AdminNavButton path="/admin/contests" label="Contests" />
          <AdminNavButton path="/admin/setters" label="Setters" />
          <button
            className="flex-grow-1 basis-1/3 md:basis-1/6 icon flex flex-col w-20 h-20 md:w-40 md:tooltip md:tooltip-right md:tooltip-info border-b-4 border-transparent items-center justify-center"
            data-tip="Home"
            onClick={async () => {
              setLoading(true);
              await AuthService.logout();
              setType(0);
              navigate("/admin/login");
            }}
          >
            <div className="text-xs md:text-lg md:font-bold md:text-white-800 bu-text-primary-hover">
              Logout
            </div>
            <div className="divider hidden md:flex "></div>
          </button>
        </>
      </div>
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
    </div>
  );
};

export default AdminNavbar;
