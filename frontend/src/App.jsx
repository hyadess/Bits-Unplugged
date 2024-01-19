import React, { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import AppRoutes from "./Routes";

export const showToast = (message, type) => {
  console.log(message, type);
  if (type === "success") toast.success(message, {});
  else if (type === "error") toast.error(message, {});
  else {
    toast.dark(message, {});
  }
};
export const showSuccess = (message, res) => {
  if (res === undefined) showToast("Couldn't connect to server", "error");
  else if (res.success) showToast(message, "success");
  else showToast(res.error, "error");
};
export const showMessage = (message, res) => {
  if (res === undefined) showToast("Couldn't connect to server", "error");
  else if (res.success) showToast(message);
  else showToast(res.error, "error");
};

var setLoading;
const App = () => {
  const [loading, setL] = useState(true);
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
      {loading ? (
        <div className="bu-bg-color fixed z-40 top-0 left-0 w-full h-full flex justify-center items-center">
          <div className="border-[6px] border-solid border-white dark:border-gray-800 rounded-full border-t-[8px] border-t-[#1C5B5F] dark:border-t-pink-600 w-16 h-16 animate-spin"></div>
        </div>
      ) : (
        <></>
      )}

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
export { setLoading };
