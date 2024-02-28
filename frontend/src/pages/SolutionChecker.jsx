import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Editor from "@monaco-editor/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faObjectGroup,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import monaco_theme from "../themes/my_theme.json";
import SaveIcon from "@mui/icons-material/Save";
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
  const [output, setOutput] = useState("");
  const [stdout, setStdout] = useState([]);
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
    console.log(problem.test);
    const result = await SubmissionService.checkSolution(
      problem.checkerCode,
      problem.checkerCanvas,
      problem.test,
      problem.testActivity
    );
    setOutput(result.output);
    setStdout(result.stdout);

    if (!showStdOut && result.stdout.length > 0) {
      setShowStdOut(true);
    }
  };

  useEffect(() => {
    // Attach resize event listener
    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component unmounts
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
      <div className="flex flex-col gap-0 md:gap-0 w-full bg-[#1F2531] mt-4 h-[32.3rem]">
        <div
          className={
            "w-full bg-[#1F2531] " +
            (stdout.length > 0 && showStdOut ? "h-2/3" : "h-full")
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
              fontSize: "17px",
              formatOnType: true,
              autoClosingBrackets: true,
              minimap: { enabled: false },
              tabSize: 2,
              wordWrap: "on",
              // automaticLayout: true,
            }}
          />
        </div>

        {stdout.length > 0 && showStdOut && (
          <div
            className={
              "w-full h-1/3 m-0 text-left p-5 bg-[#1F2531] text-md text-white  break-all overflow-auto  box-border border-4 border-solid border-gray-600 border-spacing-4 whitespace-pre border-t-0"
            }
          >
            {stdout.map((line, index) => (
              <p key={index}>{line.replace(/"/g, "")}</p>
            ))}
          </div>
        )}
      </div>

      <div className="relative">
        <button
          className="bu-button-secondary rounded-l-full px-7 py-2 text-center text-2xl  text-white absolute bottom-0 right-0 font-bold"
          onClick={() => props.setCheckerType((prev) => !prev)}
        >
          <FontAwesomeIcon icon={faObjectGroup} />
        </button>
        <div className=" rounded-full w-80 mx-auto h-12 flex items-center justify-between gap-1 my-4">
          <div
            className="flex gap-2 items-center justify-center bu-text-primary bu-button-secondary w-full h-full rounded-l-full text-2xl"
            onClick={() => {
              if (showStdOut) setShowStdOut(false);
              else if (stdout.length > 0) setShowStdOut(true);
              // setShowStdOut((prev) => !prev);
            }}
          >
            <FontAwesomeIcon icon={showStdOut ? faEye : faEyeSlash} />
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
    </div>
  );
}
