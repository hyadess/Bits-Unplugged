import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Latex from "react-latex";
import ProblemController from "../../controller/problemController";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import MDEditor from "@uiw/react-md-editor";
import katex from "katex";
import "katex/dist/katex.css";
import { getCodeString } from "rehype-rewrite";
import MarkdownEditor from "../../Components/Markdown/MarkdownEditor";
import MarkdownPreview from "../../Components/Markdown/MarkdownPreview";
const problemController = new ProblemController();
function ProblemStatement(props) {
  const { prob_id } = useParams();
  const [text, setText] = useState(props.problemStatement);

  const handleProblemStatementChange = (event) => {
    setText(event.target.value);
  };

  useEffect(() => {
    setText(props.problemStatement);
  }, [props.problemStatement]);

  const updateStatement = async () => {
    console.log(text);
    props.setStatement(text);
    const res = await problemController.updateStatement(prob_id, text);
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

      <MarkdownEditor colorMode={colorMode} text={text} setText={setText} />

      <MarkdownPreview colorMode={colorMode} text={text} />
      <button
        className="text-white font-medium rounded-lg text-lg px-7 py-3.5 text-center bu-button-primary flex flex-row gap-3 items-center justify-center focus:outline-none"
        onClick={updateStatement}
      >
        <FontAwesomeIcon icon={faFloppyDisk} size="sm" />
        SAVE
      </button>
    </div>
  );
}

export default ProblemStatement;
