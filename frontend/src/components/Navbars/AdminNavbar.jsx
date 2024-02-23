import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from "../Logo";
import { setLoading } from "../../App";
import AdminNavButton from "./AdminNavButton";
import AuthService from "../../services/authService";
import GlobalContext from "../../store/GlobalContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBarsStaggered,
  faHeadSideVirus,
  faNewspaper,
  faObjectUngroup,
  faRightFromBracket,
  faRightToBracket,
  faTags,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import { faTrello } from "@fortawesome/free-brands-svg-icons";

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

  return (
    <div className="bu-nav-color flex flex-row w-full justify-between md:justify-center">
      <div className="icon flex-2 hidden md:flex h-20 w-1/5 px-5">
        <div
          className="p-5 pl-0 cursor-pointer"
          onClick={() => {
            setLoading(true);
            navigate("/landing");
          }}
        >
          <Logo />
        </div>
      </div>
      <div className="flex md:justify-center w-full md:w-3/5">
        <>
          <AdminNavButton
            path="/admin/topics"
            label="Topics"
            icon={<FontAwesomeIcon icon={faTags} />}
          />
          <AdminNavButton
            path="/admin/series"
            label="Series"
            icon={<FontAwesomeIcon icon={faBarsStaggered} />}
          />
          <AdminNavButton
            path="/admin/canvases"
            label="Canvases"
            icon={<FontAwesomeIcon icon={faObjectUngroup} />}
          />
          <AdminNavButton
            path="/admin/problems"
            label="Problems"
            icon={<FontAwesomeIcon icon={faHeadSideVirus} />}
          />
          <AdminNavButton
            path="/admin/contests"
            label="Contests"
            icon={<FontAwesomeIcon icon={faTrello} />}
          />
          <AdminNavButton
            path="/admin/articles"
            label="Articles"
            icon={<FontAwesomeIcon icon={faNewspaper} />}
          />
          <AdminNavButton
            path="/admin/setters"
            label="Setters"
            icon={<FontAwesomeIcon icon={faUserTie} />}
          />
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
          onClick={async () => {
            setLoading(true);
            await AuthService.logout();
            setType(0);
            navigate("/login");
          }}
        >
          <FontAwesomeIcon icon={faRightFromBracket} />
          <h1 className="align-middle">Log out</h1>
        </button>
      </div>
    </div>
  );
};

export default AdminNavbar;
