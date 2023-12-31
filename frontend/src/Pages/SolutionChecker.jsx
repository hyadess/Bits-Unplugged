import React, { useState, useEffect, useRef } from "react";
import { useAsyncError, useNavigate, useParams } from "react-router-dom";
import Editor, { loader, useMonaco } from "@monaco-editor/react";
import ProblemController from "../controller/problemController";
import { showToast } from "../App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import monaco_theme from "../Components/themes/my_theme.json";
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
const problemController = new ProblemController();
//<ReactTypingEffect speed={0.5} eraseSpeed={1} cursor={"_"} text={[""]}></ReactTypingEffect>
export default function SolutionChecker(props) {
  // const monaco_editor = useMonaco();
  const editorRef = useRef(null);
  const inputRef = useRef(null);
  const [stringed, setStringed] = useState(null);
  const ref = useRef(null);
  const ref2 = useRef(null);
  const navigator = useNavigate();
  const { prob_id } = useParams();
  const switchPath = (pathname) => {
    navigator(pathname);
  };
  const [editorHeight, setEditorHeight] = useState(window.innerWidth / 3);

  // useEffect(() => {
  //   monaco_editor.editor.defineTheme("light-theme", monaco_theme);
  // }, [monaco_editor]);

  const handleResize = () => {
    if (editorRef.current) {
      editorRef.current.layout(); // Trigger Monaco Editor layout update on resize
    }
    if (inputRef.current) {
      inputRef.current.layout(); // Trigger Monaco Editor layout update on resize
    }
  };

  const handleCheckSolution = async () => {
    try {
      const result = await problemController.checkSolution(
        ref.current.getValue(),
        0,
        JSON.parse(ref2.current.getValue())
      );
      props.setOutput(result.output);
      props.setStdout(result.stdout);
    } catch (error) {
      showToast("Invalid Input", "error");
    }
  };

  useEffect(() => {
    const jsonData = JSON.stringify(props.input ? props.input : {}, null, 2);
    setStringed(jsonData);

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

  const submit = () => {
    // console.log(prob_id);
    handleCheckSolution();
    // problemController.updateSolutionChecker(prob_id, ref.current.getValue(), 0);
  };

  // const p =
  //   props.output == "" ? null : (
  //     <div className="out-display">{props.output}</div>
  //   );
  return (
    stringed && (
      <div
        className="flex flex-col md:flex-row gap-0 md:gap-0 w-full h-160 md:h-160 bg-[#1F2531]"
        style={{ marginTop: "1rem" }}
      >
        <div className="w-full md:w-9/12 h-1/2 md:h-full bg-[#1F2531]">
          <Editor
            // ref={editorRef}
            height="100%" // Set the height to 100% of its parent div
            className="box-border border-4 border-solid border-gray-600 border-spacing-4 md:border-r-0"
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
        <div className="flex flex-col w-full md:w-1/4 h-1/2 md:h-full gap-0">
          <div className="flex flex-row md:flex-col gap-0 h-80% md:h-90%">
            <div className="w-1/2 md:w-full h-full md:h-1/2">
              <Editor
                className="box-border border-4 border-solid border-gray-600 border-spacing-4 border-r-0 md:border-r-4 border-t-0 md:border-t-4"
                // ref={inputRef}
                width="100%"
                height="100%" // Set the height to 100% of its parent div
                language="json"
                theme="light-theme"
                value={stringed}
                onMount={inputMount}
                options={{
                  inlineSuggest: true,
                  fontSize: "10px",
                  formatOnType: true,
                  autoClosingBrackets: true,
                  minimap: { enabled: false },
                  lineNumbers: "off",
                }}
              />
            </div>
            <div className="w-1/2 md:w-full h-full md:h-1/2 m-0 text-left p-5 bg-[#1F2531] text-lg text-white box-border border-4 border-solid border-gray-600 border-spacing-4 border-t-0">
              {props.stdout}
            </div>
          </div>
          <button
            style={{
              float: "right",
              borderRadius: "0px",
            }}
            type="submit"
            className="text-white font-bold rounded-lg text-lg md:text-md px-7 py-3.5 text-center bu-button-secondary w-full h-20% md:h-10% flex flex-row gap-5 justify-center items-center box-border border-4 border-solid border-gray-600 border-spacing-4 border-t-0"
            onClick={submit}
          >
            <FontAwesomeIcon icon={faPlay} />
            RUN
          </button>
        </div>
      </div>
    )
  );
}
