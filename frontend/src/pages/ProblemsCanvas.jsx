import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CanvasContainer from "../components/Canvas/CanvasContainer";
import ProblemController from "../controller/problemController";
import SubmissionController from "../controller/submissionController";
import UserActivityController from "../controller/userActivityController";
import { Button } from "@mui/material";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import SaveIcon from "@mui/icons-material/Save";
import SendIcon from "@mui/icons-material/Send";
import Cookies from "universal-cookie";
import Latex from "react-latex";
import EditIcon from "@mui/icons-material/Edit";
import Title from "../components/Title";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { setLoading } from "../App";
import MDEditor from "@uiw/react-md-editor";
import MarkdownEditor from "@uiw/react-markdown-editor";
import katex from "katex";
import "katex/dist/katex.css";
import { getCodeString } from "rehype-rewrite";

import MarkdownPreview from "../components/Markdown/MarkdownPreview";
//<ReactTypingEffect speed={0.5} eraseSpeed={1} cursor={"_"} text={[""]}></ReactTypingEffect>
const problemController = new ProblemController();
const submissionController = new SubmissionController();
const userActivityController = new UserActivityController();

export default function ProblemsCanvas() {
  /**
     * https://i.postimg.cc/T1GDtZtZ/image-1.png
        https://i.postimg.cc/15mFw1nF/image-2.png
        https://i.postimg.cc/1Rc683tP/image-4.png
        https://i.postimg.cc/KjNgwJV4/image-5.png
     */
  const navigator = useNavigate();
  const switchPath = (pathname) => {
    navigator(pathname);
  };

  const { id } = useParams();
  const [problem, setProblem] = useState(null);
  const [backup, setBackup] = useState(null);
  const [input, setInput] = useState(null);
  const [canvasId, setCanvasId] = useState(null);
  const [title, setTitle] = useState("");
  const [statement, setStatement] = useState("");
  const [data, setData] = useState();
  const [canvas, setCanvas] = useState(null);
  const [type, setType] = useState(-1);
  const [resetTrigger, setResetTrigger] = useState(false);
  const baseURL = "https";
  const canvasRef = useRef();
  const [editOptions, setEditOptions] = useState({});
  const [previewOptions, setPreviewOptions] = useState({});
  useEffect(() => {
    renderProblem();
    const cookies = new Cookies();
    const isLoggedIn = !!cookies.get("token");
    if (isLoggedIn) {
      setType(cookies.get("type"));
    }
  }, []);

  const renderProblem = async () => {
    const result = await problemController.getProblemById(id);
    if (result.success) {
      console.log(result.data);
      setProblem(result.data);
      setInput(JSON.parse(JSON.stringify(result.data.canvasData)));
      setBackup(JSON.parse(JSON.stringify(result.data.canvasData)));
      setCanvasId(result.data.canvasId);
      setStatement(result.data.statement);
      setEditOptions(result.data.editOptions);
      setPreviewOptions(result.data.previewOptions);
      setTitle(result.data.title);
      if (result.data.canvasId === null) setLoading(false);
    }
  };

  const reset = async () => {
    // const result = await problemController.getProblemById(id);
    // if (result.success)
    {
      setInput(JSON.parse(JSON.stringify(backup)));
      canvasRef.current !== undefined &&
        canvasRef.current !== null &&
        canvasRef.current.handleReset(JSON.parse(JSON.stringify(backup)));
      // setResetTrigger(!resetTrigger);
    }
  };
  const calculateNumberOfLines = (content) => {
    return content.split("\n").length;
  };
  const solutionSubmit = async (e) => {
    let res = await problemController.checkSolution(
      problem.checkerCode,
      problem.checkerCanvas,
      input
    );
    console.log("output " + res.output);
    submissionController.submitSolution(input, res.output, id);
    if (res.output === "Accepted")
      userActivityController.updateOnSuccessfulAttempt(id);
    else userActivityController.updateOnFailedAttempt(id);
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

  useEffect(() => {}, [backup]);
  useEffect(() => {
    canvasRef.current !== undefined && canvasRef.current.handleReset();
  }, [resetTrigger]);
  return (
    <div>
      {problem ? (
        <>
          <div>
            <div className="flex flex-row justify-between">
              <div className="flex max-w-screen-xl flex-col gap-3 py-4 sm:pt-12">
                <div className="mt-4 md:mt-0">
                  <h2 className="text-left text-5xl font-extrabold tracking-tight ">
                    <span className="bu-text-title">{title}</span>
                  </h2>
                </div>
                <span className="bu-text-subtitle text-xl">
                  {problem
                    ? problem.topicName + " > " + problem.seriesName
                    : ""}
                </span>
              </div>
              {type !== 0 ? (
                <div className="flex items-center">
                  <button
                    className="bu-button-primary rounded-lg px-7 py-3.5 text-center text-lg font-medium text-white"
                    onClick={() => {
                      setLoading(true);
                      navigator(
                        type == 2
                          ? `/admin/problems/${id}`
                          : `/problem/${id}/edit`
                      );
                    }}
                  >
                    <div className="flex flex-row items-center gap-4">
                      <FontAwesomeIcon icon={faPenToSquare} size="sm" />
                      EDIT
                    </div>
                  </button>
                </div>
              ) : (
                <div className="flex items-center">
                  <button
                    className="bu-button-primary rounded-lg px-7 py-3.5 text-center text-lg font-medium text-white"
                    onClick={() => {
                      setLoading(true);
                      console.log(problem);
                      navigator(`/submission/${id}`);
                    }}
                  >
                    <div className="flex flex-row items-center gap-4">
                      SUBMISSIONS
                    </div>
                  </button>
                </div>
              )}
            </div>

            <div className="mx-auto max-w-screen-2xl items-center">
              <div className="bu-text-primary mb-6  text-left font-light md:text-lg">
                <div
                  style={{
                    width: "100%",
                    padding: "30px 0",
                    fontSize: "25px",
                    border: "none",
                    borderRadius: "20px",
                  }}
                >
                  <MarkdownPreview
                    colorMode={colorMode}
                    text={statement}
                    customStyle={{ padding: "20px" }}
                  />
                </div>
              </div>
            </div>
          </div>
          {canvasId && canvasRef && (
            <div className="flex w-full flex-col gap-5">
              <CanvasContainer
                canvasId={canvasId}
                input={input}
                setInput={setInput}
                mode={"preview"}
                ref={canvasRef}
                editOptions={editOptions}
                setEditOptions={setEditOptions}
                previewOptions={previewOptions}
                setPreviewOptions={setPreviewOptions}
              />
              <div className="flex flex-row justify-between">
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => {
                    reset();
                    // canvasRef.current.handleReset(); // Call this after reset
                  }}
                  startIcon={
                    <RotateLeftIcon sx={{ fontSize: "2rem", color: "white" }} />
                  }
                >
                  Reset
                </Button>
                <Button
                  variant="contained"
                  onClick={solutionSubmit}
                  endIcon={
                    <SendIcon sx={{ fontSize: "2rem", color: "white" }} />
                  }
                >
                  Submit
                </Button>
              </div>
            </div>
          )}
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
