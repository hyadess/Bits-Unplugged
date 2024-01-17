import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProblemController from "../controller/problemController";
import SubmissionController from "../controller/submissionController";
import UserActivityController from "../controller/userActivityController";
import Cookies from "universal-cookie";
import { setLoading } from "../App";
import ProblemsCanvasView from "../views/ProblemsCanvas";
//<ReactTypingEffect speed={0.5} eraseSpeed={1} cursor={"_"} text={[""]}></ReactTypingEffect>
const problemController = new ProblemController();
const submissionController = new SubmissionController();
const userActivityController = new UserActivityController();

export default function ProblemsCanvas() {
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
  const [activityData, setActivityData] = useState({});
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
    const isLoggedIn = localStorage.hasOwnProperty("token");
    if (isLoggedIn) {
      setType(localStorage.getItem("type"));
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
    setInput(JSON.parse(JSON.stringify(backup)));
    canvasRef?.current?.handleReset(JSON.parse(JSON.stringify(backup)));
  };

  const calculateNumberOfLines = (content) => {
    return content.split("\n").length;
  };

  const startTimeRef = useRef(null);

  const solutionSubmit = async (e) => {
    let res = await problemController.checkSolution(
      problem.checkerCode,
      problem.checkerCanvas,
      input,
      activityData
    );
    console.log("output " + res.output);
    await submissionController.submitSolution(input, res.output, id);
    if (res.output === "Accepted") {
      if (startTimeRef.current) {
        const endTime = new Date();
        const durationInSeconds = Math.floor(
          (endTime - startTimeRef.current) / 1000
        );
        if (durationInSeconds > 3) {
          await problemController.trackDuration(id, durationInSeconds);
        }
      }
      await userActivityController.updateOnSuccessfulAttempt(id);
    } else await userActivityController.updateOnFailedAttempt(id);
  };
  function getColorModeFromLocalStorage() {
    return localStorage.getItem("color-theme") || "light";
  }

  const [colorMode, setColorMode] = useState(getColorModeFromLocalStorage());

  useEffect(() => {
    console.log("Start:", new Date());
    startTimeRef.current = new Date();

    const handleStorageChange = (event) => {
      setColorMode(getColorModeFromLocalStorage);
    };
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      console.log("End:", new Date(), startTimeRef.current);
      if (startTimeRef.current) {
        const endTime = new Date();
        const durationInSeconds = Math.floor(
          (endTime - startTimeRef.current) / 1000
        );

        console.log("Duration:", durationInSeconds);
        // Send the duration to the backend
        if (durationInSeconds > 3)
          problemController.trackDuration(id, durationInSeconds);
      }
    };
  }, []);

  useEffect(() => {}, [backup]);
  useEffect(() => {
    canvasRef.current !== undefined && canvasRef.current.handleReset();
  }, [resetTrigger]);

  return (
    <ProblemsCanvasView
      problem={problem}
      id={id}
      statement={statement}
      canvasId={canvasId}
      input={input}
      setInput={setInput}
      ref={canvasRef}
      editOptions={editOptions}
      setEditOptions={setEditOptions}
      previewOptions={previewOptions}
      setPreviewOptions={setPreviewOptions}
      activityData={activityData}
      setActivityData={setActivityData}
      onSubmit={solutionSubmit}
      onReset={reset}
      type={type}
      colorMode={colorMode}
    />
  );
}
