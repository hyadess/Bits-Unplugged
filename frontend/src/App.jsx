import "./App.scss";

import React, { useState, useEffect } from "react";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { Dialog, DialogContent } from "@mui/material";
import { Circles } from "react-loader-spinner";

import AppRoutes from "./Routes";

const showToast = (message, type) => {
  console.log(message, type);
  if (type === "success") toast.success(message, {});
  else if (type === "error") toast.error(message, {});
  else {
    toast.dark(message, {});
  }
};

var setLoading;
const App = () => {
  const [loading, setL] = useState(false);
  useEffect(() => {
    if (
      localStorage.getItem("color-theme") === "dark" ||
      (!("color-theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      console.log("Dark Mode");
      document.documentElement.classList.add("dark");
      localStorage.setItem("color-theme", "dark");
    } else {
      console.log("Light Mode");
      document.documentElement.classList.remove("dark");
      localStorage.setItem("color-theme", "light");
    }
  }, []);
  setLoading = setL;

  return (
    <div>
      <Dialog open={loading}>
        <DialogContent>
          <Circles color="#00BFFF" height={100} width={100} />
          {/* <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", top: "0" }}>
              <P1 />
            </div>
            <div style={{ position: "absolute" }}>
              <P1 />
            </div>
          </div> */}
        </DialogContent>
      </Dialog>
      <ToastContainer
        style={{ width: "270px" }}
        position="top-right"
        theme="colored"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <AppRoutes />
    </div>
  );
};

export default App;
export { showToast, setLoading };
