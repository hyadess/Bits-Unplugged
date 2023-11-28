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
  const [stringed, setStringed] = useState(null);
  const ref = useRef(null);
  const ref2 = useRef(null);
  const navigator = useNavigate();
  const { prob_id } = useParams();
  const switchPath = (pathname) => {
    navigator(pathname);
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
      className="hbox"
      style={{ height: "100%", width: "100%", gap: "0", marginTop: "1rem" }}
    >
      <div className="vbox" style={{ height: "600px", width: "75%" }}>
        <Editor
          height="800px"
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
          }}
        />
      </div>
      <div className="vbox" style={{ height: "600px", width: "25%", gap: "0" }}>
        <div style={{ height: "50%" }}>
          <Editor
            className="white-border"
            height="100%"
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
          className="text-display"
          style={{ height: "40%", margin: "0", borderRadius: "0px" }}
        >
          {props.stdout}
        </div>
        <button
          style={{
            float: "right",
            height: "10%",
            backgroundColor: "rgb(236, 72, 153)",
            borderRadius: "0px",
          }}
          type="submit"
          class="text-white bg-black-600 hover:bg-black-700 focus:ring-4 focus:outline-none focus:bg-pink-300 font-medium  text-lg px-7 py-3 text-center bg-pink-600 hover:bg-pink-700 focus:bg-pink-800"
          onClick={submit}
        >
          RUN
        </button>
      </div>
    </div>
  );
}
