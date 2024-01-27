import { createContext, useContext, useReducer } from "react";

const ProblemContext = createContext();
const ProblemContextProvider = ({ children }) => {
  const reducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
      case "SET_INITIAL_STATE":
        return payload;
      case "UPDATE_PROBLEM":
        return {
          ...state,
          ...payload,
        };
      case "UPDATE_TITLE":
        return {
          ...state,
          title: payload,
        };
      case "UPDATE_STATEMENT":
        return {
          ...state,
          statement: payload,
        };

      case "UPDATE_CHECKER_CODE":
        return {
          ...state,
          checkerCode: payload,
        };

      case "UPDATE_CHECKER_CANVAS":
        return {
          ...state,
          checkerCanvas: { ...state.checkerCanvas, ...payload },
        };

      case "CHANGE_CANVAS":
        return {
          ...state,
          canvasId: payload,
        };

      case "UPDATE_CANVAS_ID":
        return {
          ...state,
          canvasId: payload,
        };

      case "UPDATE_CANVAS":
        return {
          ...state,
          canvasData: { ...state.canvasData, ...payload },
        };

      case "UPDATE_TEST_CANVAS":
        return {
          ...state,
          test: { ...state.test, ...payload },
        };

      case "UPDATE_TEST_ACTIVITY":
        return {
          ...state,
          testActivity: { ...state.testActivity, ...payload },
        };
      case "UPDATE_USER_ACTIVITY":
        return {
          ...state,
          activityData: { ...state.activityData, ...payload },
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
        // key, value
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
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(reducer, { problemId: 0 });
  return (
    <ProblemContext.Provider value={{ state, dispatch }}>
      {children}
    </ProblemContext.Provider>
  );
};

export const useProblemContext = () => {
  return useContext(ProblemContext);
};

export default ProblemContextProvider;
