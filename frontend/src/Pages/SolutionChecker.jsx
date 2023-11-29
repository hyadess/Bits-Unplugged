import React, { useState, useEffect, useRef } from "react";
import { useAsyncError, useNavigate, useParams } from "react-router-dom";
import { Button, TextareaAutosize } from "@mui/material";
import "./SolutionChecker.scss";
// import ProblemController from "../controller/problemController";
import Editor from "@monaco-editor/react";
import ProblemController from "../controller/problemController";
import { showToast } from "../App";
const problemController = new ProblemController();
//<ReactTypingEffect speed={0.5} eraseSpeed={1} cursor={"_"} text={[""]}></ReactTypingEffect>
export default function SolutionChecker(props) {
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
        JSON.parse(ref2.current.getValue())
      );
      props.setOutput(result.output);
      props.setStdout(result.stdout);
    } catch (error) {
      showToast("Invalid Input", "error");
    }
  };

  useEffect(() => {
    const jsonData = JSON.stringify(props.input, null, 2);
    setStringed(jsonData);

    // Attach resize event listener
    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component unmounts
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const editorMount = (editor, monaco) => {
    ref.current = editor;
  };

  const inputMount = (editor, monaco) => {
    ref2.current = editor;
  };
  const codeChanged = () => {
    props.setCode(ref.current.getValue());
  };

  const submit = () => {
    // console.log(prob_id);
    handleCheckSolution();
    problemController.updateSolutionChecker(prob_id, ref.current.getValue());
  };

  const p =
    props.output == "" ? null : (
      <div className="out-display">{props.output}</div>
    );
  return (
    <div
      className="flex flex-col md:flex-row gap-0 md:gap-0 w-full pb-10 h-160 md:h-128"
      style={{ marginTop: "1rem" }}
    >
      <div className="w-full md:w-9/12 h-1/2 md:h-full">
        <Editor
          ref={editorRef}
          height="100%" // Set the height to 100% of its parent div
          className="white-border"
          language="javascript"
          theme="vs-dark"
          value={props.code}
          onMount={editorMount}
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
        <div
          className="flex flex-row md:flex-col gap-0 h-85% md:h-90%"
          // style={{ height: "100%" }}
        >
          <div className="w-1/2 md:w-full h-full md:h-1/2">
            <Editor
              className="white-border"
              ref={inputRef}
              width="100%"
              height="100%" // Set the height to 100% of its parent div
              language="json"
              theme="vs-dark"
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
          <div
            className="w-1/2 md:w-full h-full md:h-full text-display m-0"
            style={{ borderRadius: "0px" }}
          >
            {props.stdout}
          </div>
        </div>
        <button
          style={{
            float: "right",
            // height: "10%",
            backgroundColor: "rgb(236, 72, 153)",
            borderRadius: "0px",
          }}
          type="submit"
          class="text-white bg-black-600 hover:bg-black-700 focus:ring-4 focus:outline-none focus:bg-pink-300 font-medium  text-lg px-7 py-3 text-center bg-pink-600 hover:bg-pink-700 focus:bg-pink-800 w-full h-15% md:h-10%"
          onClick={submit}
        >
          RUN
        </button>
      </div>
    </div>
  );
}
