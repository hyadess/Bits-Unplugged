import React, { useState, useEffect, useRef } from "react";
import { useAsyncError, useNavigate, useParams } from "react-router-dom";
import Editor, { loader, useMonaco } from "@monaco-editor/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPlay } from "@fortawesome/free-solid-svg-icons";
import monaco_theme from "../themes/my_theme.json";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import SaveIcon from "@mui/icons-material/Save";
// import Confirmation from "../../components/Confirmation";
import { Button, IconButton } from "@mui/material";
import EyeIcon from "../components/Icons/EyeIcon";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import SubmissionService from "../services/submissionService";
import { useProblemContext } from "../store/ProblemContextProvider";
// loader.init().then((monaco) => {
//   // fetch("../Components/themes/Monokai.json")
//   //   .then((data) => data.json())
//   //   .then((data) => {
//   //     console.log(data);
//   //     monaco.editor.defineTheme("light-theme", data);
//   //     monaco.editor.setTheme("light-theme");
//   //   })
//   //   .catch((error) => {
//   //     console.error("Error loading theme:", error);
//   //   });
//   monaco.editor.defineTheme("light-theme", monaco_theme);
// });

const defineEditorTheme = (monaco) => {
  monaco.editor.defineTheme("light-theme", monaco_theme);
};

const setEditorTheme = (editor, monaco) => {
  monaco.editor.setTheme("light-theme");
};
export default function SolutionChecker(props) {
  // const monaco_editor = useMonaco();
  const { state: problem, dispatch } = useProblemContext();
  const editorRef = useRef(null);
  const inputRef = useRef(null);
  const [stringed, setStringed] = useState(null);
  const ref = useRef(null);
  const ref2 = useRef(null);
  const [showStdOut, setShowStdOut] = useState(false);
  const navigate = useNavigate();
  const { problemid } = useParams();

  const [editorHeight, setEditorHeight] = useState(window.innerWidth / 3);

  const handleResize = () => {
    if (editorRef.current) {
      editorRef.current.layout(); // Trigger Monaco Editor layout update on resize
    }
    if (inputRef.current) {
      inputRef.current.layout(); // Trigger Monaco Editor layout update on resize
    }
  };

  const handleCheckSolution = async () => {
    await SubmissionService.checkSolution(
      problem.checkerCode,
      problem.checkerCanvas,
      problem.test,
      problem.testActivity
    );
  };

  useEffect(() => {
    // Attach resize event listener
    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component unmounts
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // console.log("--->", props.stdout.length == 0);
    if (!showStdOut && props.stdout.length > 0) {
      setShowStdOut(true);
    }
  }, [props.stdout]);
  const editorMount = (editor, monaco) => {
    ref.current = editor;
    monaco.editor.setTheme("light-theme");
  };

  const inputMount = (editor, monaco) => {
    ref2.current = editor;
    monaco.editor.setTheme("light-theme");
  };

  const codeChanged = () => {
    props.setCode(ref.current.getValue());
  };

  return (
    <div>
      <div className="flex flex-col gap-0 md:gap-0 w-full bg-[#1F2531] mt-4 h-128">
        <div
          className={
            "w-full bg-[#1F2531] " +
            (props.stdout.length > 0 && showStdOut ? "h-2/3" : "h-full")
          }
        >
          <Editor
            // ref={editorRef}
            height="100%" // Set the height to 100% of its parent div
            className={
              "box-border border-4 border-solid border-gray-600 border-spacing-4"
            }
            language="javascript"
            theme="light-theme"
            value={props.code}
            onMount={editorMount}
            beforeMount={defineEditorTheme}
            onChange={codeChanged}
            options={{
              inlineSuggest: true,
              fontSize: "13px",
              formatOnType: true,
              autoClosingBrackets: true,
              minimap: { enabled: false },
              tabSize: 2,
              // automaticLayout: true,
            }}
          />
        </div>

        {props.stdout.length > 0 && showStdOut && (
          <div
            className={
              "w-full h-1/3 m-0 text-left p-5 bg-[#1F2531] text-md text-white  break-all overflow-scroll  box-border border-4 border-solid border-gray-600 border-spacing-4 whitespace-pre border-t-0"
            }
          >
            {props.stdout}
          </div>
        )}
      </div>

      <div className=" rounded-full w-80 mx-auto h-12 flex items-center justify-between gap-1 my-4">
        <div
          className="flex gap-2 items-center justify-center bu-text-primary bu-button-secondary w-full h-full rounded-l-full text-2xl"
          onClick={() => {
            if (showStdOut) setShowStdOut(false);
            else if (props.stdout.length > 0) setShowStdOut(true);
            // setShowStdOut((prev) => !prev);
          }}
        >
          {showStdOut ? <Visibility /> : <VisibilityOff />}
        </div>

        <div
          className="flex gap-2 items-center justify-center bu-button-secondary w-full h-full text-2xl "
          onClick={handleCheckSolution}
        >
          <FontAwesomeIcon icon={faPlay} />
          {/* RUN */}
        </div>
        <div
          className="flex gap-2 items-center justify-center bu-text-primary bu-button-secondary w-full h-full rounded-r-full text-2xl"
          onClick={async () => await props.save()}
        >
          {/* SAVE */}
          <SaveIcon />
        </div>
      </div>
    </div>
  );
}
