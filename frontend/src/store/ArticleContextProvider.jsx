import { PlaylistAddCheckCircleTwoTone } from "@mui/icons-material";
import React, { createContext, useContext, useReducer } from "react";

const ArticleContext = createContext();
const ArticleContextProvider = ({ children }) => {
  const reducer = (state, action) => {
    const { type, payload } =
      typeof action === "function" ? action(state) : action;

    switch (type) {
      //for canvas.................................
      case "SET_INITIAL_STATE":
        return payload;
      case "UPDATE_PROBLEM":
        return {
          ...state,
          ...payload,
        };
      case "UPDATE_CHECKER_CODE":
        {
          const {boxId,checkerCode}=payload;
          return {
            ...state,
            content:state.content.map(item =>
              item.boxId === boxId ? { ...item, checkerCode:checkerCode } : item
            ),
          };
        };

      case "UPDATE_CHECKER_CANVAS":
        {
          const {boxId,checkerCanvas}=payload;
          return {
            ...state,
            content:state.content.map(item =>
              item.boxId === boxId ? { ...item, checkerCanvas:checkerCanvas } : item
            ),
          };  
        };
        
      case "CHANGE_CANVAS":
        {
          const {boxId,canvasId}=payload;
          return {
            ...state,
            content:state.content.map(item =>
              item.boxId === boxId ? { ...item, canvasId:canvasId } : item
            ),
          };
        };

      case "UPDATE_CANVAS_ID":
        {
          const {boxId,canvasId}=payload;
          return {
            ...state,
            content:state.content.map(item =>
              item.boxId === boxId ? { ...item, canvasId:canvasId } : item
            ),
          };
        };

      case "UPDATE_CANVAS":
        {
          const {boxId,canvasData}=payload;
          return {
            ...state,
            content:state.content.map(item =>
              item.boxId === boxId ? { ...item, canvasData:{...item.canvasData,...canvasData} } : item
            ),
          };
        };

      case "UPDATE_TEST_CANVAS":
        {
          const {boxId,text}=payload;
          return {
            ...state,
            content:state.content.map(item =>
              item.boxId === boxId ? { ...item, text:{...item.text,...text} } : item
            ),
          };
        };

      case "UPDATE_TEST_ACTIVITY":
        {
          const {boxId,textActivity}=payload;
          return {
            ...state,
            content:state.content.map(item =>
              item.boxId === boxId ? { ...item, textActivity:{...item.textActivity,...textActivity} } : item
            ),
          };
        };
      case "UPDATE_USER_ACTIVITY":
        {
          const {boxId,activityData}=payload;
          return {
            ...state,
            content:state.content.map(item =>
              item.boxId === boxId ? { ...item, activityData:{...item.activityData,...activityData} } : item
            ),
          };
        };

      case "UPDATE_EDIT_OPTIONS":
        return {
          ...state,
          editOptions: {
            ...state.editOptions,
            [payload.key]: {
              ...state.editOptions[payload.key],
              value: payload.value,
            },
          },
        };

      case "UPDATE_PREVIEW_OPTIONS":
        return {
          ...state,
          previewOptions: {
            ...state.previewOptions,
            [payload.key]: {
              ...state.previewOptions[payload.key],
              value: payload.value,
            },
          },
        };

      //for markdown.................................
      case "UPDATE_MARKDOWN":
        return {
          ...state,
          data: payload,
        };
      default:
        return state;
    }
  };

  const initialState = { boxId: 0 };
  const [state, dispatch] = useReducer(reducer, initialState);

  const contexts = []; // Array to store contexts

  // Generate contexts for each child
  React.Children.forEach(children, (child) => {
    const context = createContext();
    contexts.push(context);
  });

  return (
    <ArticleContext.Provider value={{ state, dispatch }}>
      <DndProvider backend={HTML5Backend}>
      { React.Children.map(children, (child, index) => (
          <contexts[index].Provider value={{ state, dispatch }}>
            {child}
          </contexts[index].Provider>
        ))}
      </DndProvider>
    </ArticleContext.Provider>
  );
};

export const useArticleContext = (index) => {
  const context = useContext(ArticleContext);
  return useContext(contexts[index]);
};

export default ArticleContextProvider;
