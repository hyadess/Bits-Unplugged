import { createContext, useContext, useReducer } from "react";

const ContestContext = createContext();

const ContestContextProvider = ({ children }) => {
  const reducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
      case "SET_INITIAL_STATE":
        console.log("DISPATCH", payload);
        return payload;
      // Add other cases for updating specific properties as needed
      // For example, "UPDATE_CONTEST_NAME", "UPDATE_START_DATE", etc.
      case "UPDATE_TITLE":
        return {
          ...state,
          title: payload,
        };

      case "UPDATE_EDITORIAL":
        return {
          ...state,
          editorial: payload,
        };

      case "UPDATE_EDITORIAL_IMAGES": {
        const newEditorial = [...state.editorial];
        newEditorial[payload.index].images = payload.images;
        return { ...state, editorial: newEditorial };
      }

      case "ADD_EDITORIAL_SECTION": {
        console.log("Adding new section");
        let newEditorial = [...state.editorial];
        if (payload.type === "markdown") {
          newEditorial.splice(payload.index, 0, {
            boxId: payload.id,
            data: "type here",
            type: "markdown",
          });
        } else if (payload.type === "slideshow") {
          newEditorial.splice(payload.index, 0, {
            boxId: payload.id,
            type: "slideshow",
            images: [],
          });
        }
        return { ...state, editorial: newEditorial };
      }

      case "UPDATE_EDITORIAL_MARKDOWN": {
        const newEditorial = [...state.editorial];
        newEditorial[payload.index].data = payload.textData;
        return { ...state, editorial: newEditorial };
      }

      case "UPDATE_DURATION":
        return {
          ...state,
          duration: payload,
        };

      case "UPDATE_CONTEST_DATE_TIME":
        return {
          ...state,
          startDateTime: payload,
        };

      case "UPDATE_DETAILS":
        return {
          ...state,
          description: payload,
        };
      case "DELETE_PROBLEM":
        return {
          ...state,
          problems: state.problems.filter((problem) => problem.id !== payload),
        };

      case "DELETE_EDITORIAL_SECTION":
        let newEditorial = [...state.editorial];
        newEditorial.splice(payload, 1);
        return { ...state, editorial: newEditorial };

      case "ADD_PROBLEM":
        console.log("ADD_PROBLEM", [...state.problems, ...payload]);
        return {
          ...state,
          problems: [...state.problems, ...payload],
        };

      case "UPDATE_RATING":
        const { problemId, newRating } = payload;
        const updatedProblems = state.problems.map((problem) =>
          problem.id === problemId ? { ...problem, rating: newRating } : problem
        );

        return {
          ...state,
          problems: updatedProblems,
        };

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
