import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "katex/dist/katex.css";
import MarkdownEditor from "./Markdown/MarkdownEditor";
import MarkdownPreview from "./Markdown/MarkdownPreview";
import { useProblemContext } from "../pages/setter/ProblemSetEnv/Model";

function ProblemStatement() {
  const { problemid } = useParams();
  const { state, dispatch } = useProblemContext();
  // const [text, setText] = useState(props.problemStatement);

  // const handleProblemStatementChange = (event) => {
  //   setText(event.target.value);
  // };

  // useEffect(() => {
  //   setText(props.problemStatement);
  // }, [props.problemStatement]);

  function getColorModeFromLocalStorage() {
    return localStorage.getItem("color-theme") || "light";
  }

  const [colorMode, setColorMode] = useState(getColorModeFromLocalStorage());

  useEffect(() => {
    const handleStorageChange = (event) => {
      setColorMode(getColorModeFromLocalStorage);
    };
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);
  return (
    <div className="flex flex-col gap-5 pb-5">
      {/* <MarkdownEditor value={text} onChange={setText} height="200px" /> */}

      <MarkdownEditor
        colorMode={colorMode}
        text={state.statement ?? ""}
        setText={(value) => {
          dispatch({ type: "UPDATE_STATEMENT", payload: value });
        }}
      />

      <MarkdownPreview colorMode={colorMode} text={state.statement ?? ""} />
    </div>
  );
}

export default ProblemStatement;
