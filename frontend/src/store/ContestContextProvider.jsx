import { createContext, useContext, useReducer } from "react";

const ContestContext = createContext();

const ContestContextProvider = ({ children }) => {
  const reducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
      case "SET_INITIAL_STATE":
        return payload;
      // Add other cases for updating specific properties as needed
      // For example, "UPDATE_CONTEST_NAME", "UPDATE_START_DATE", etc.

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, { contestId: 0 });

  return (
    <ContestContext.Provider value={{ state, dispatch }}>
      {children}
    </ContestContext.Provider>
  );
};

export const useContestContext = () => {
  return useContext(ContestContext);
};

export default ContestContextProvider;
