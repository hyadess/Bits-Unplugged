import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import GlobalContextProvider from "./store/GlobalContextProvider";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  GridContextProvider,
  GridDropZone,
  GridItem,
  swap,
} from "react-grid-dnd";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export const COOKIE_AGE = 31536000;

let API_BASE_URL = "/api";

if (import.meta?.env?.VITE_APP_API_BASE_URL ?? false) {
  // Development environment using Vite
  API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;
} else if (process.env.REACT_APP_API_BASE_URL) {
  // Production environment using React
  API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
}

// debugger;
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GlobalContextProvider>
      {/* <DragDropContext> */}
      {/* <DndProvider backend={HTML5Backend}> */}
      <App />
      {/* </DragDropContext> */}
      {/* </DndProvider> */}
    </GlobalContextProvider>
  </React.StrictMode>
);
export { API_BASE_URL };
