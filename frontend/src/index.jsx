import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
export const COOKIE_AGE = 31536000;
let API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

// debugger;
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
export { API_BASE_URL };
