import { createContext, useContext, useReducer } from "react";
import ProblemSetEnvController from "./Controller";

const ProblemContext = createContext();
const ProblemContextProvider = ({ children }) => {
  const reducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
      case "SET_INITIAL_STATE":
        return payload;
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
        console.log("UPDAAAAAAAAAATE", payload);
        return {
          ...state,
          checkerCode: payload,
        };

      case "UPDATE_CHECKER_CANVAS":
        return {
          ...state,
          checkerCanvas: payload,
        };
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
