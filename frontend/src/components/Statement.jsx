import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Latex from "react-latex";
import ProblemController from "../controller/problemController";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import MDEditor from "@uiw/react-md-editor";
import katex from "katex";
import "katex/dist/katex.css";
import { getCodeString } from "rehype-rewrite";
import MarkdownEditor from "./Markdown/MarkdownEditor";
import MarkdownPreview from "./Markdown/MarkdownPreview";
const problemController = new ProblemController();
function ProblemStatement(props) {
  const { problemid } = useParams();
  // const [text, setText] = useState(props.problemStatement);

  // const handleProblemStatementChange = (event) => {
  //   setText(event.target.value);
  // };

  // useEffect(() => {
  //   setText(props.problemStatement);
  // }, [props.problemStatement]);

  const updateStatement = async () => {
    const res = await problemController.updateStatement(
      problemid,
      props.statement
    );
    if (res.success) {
      console.log(res);
    }
  };

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
        text={props.statement}
        setText={props.setStatement}
      />

      <MarkdownPreview colorMode={colorMode} text={props.statement} />
    </div>
  );
}

export default ProblemStatement;
