import React, { useState, useEffect, useRef, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { setLoading } from "../App";
import ProblemsCanvasView from "../views/ProblemsCanvas";
import { problemApi, submissionApi, userActivityApi } from "../api";
import SubmissionService from "../services/submissionService";
import GlobalContext from "../store/GlobalContext";
export default function ProblemsCanvas() {
  const { type } = useContext(GlobalContext);
  const { id } = useParams();
  const backup = useRef(null);
  const [problem, setProblem] = useState(null);
  const [canvasData, setCanvasData] = useState(null);
  const [activityData, setActivityData] = useState({});
  const canvasRef = useRef();

  useEffect(() => {
    renderProblem();
  }, []);

  const renderProblem = async () => {
    const result = await problemApi.getProblemById(id);
    if (result.success) {
      backup.current = result.data.canvasData;
      setProblem(result.data);
      setCanvasData(JSON.parse(JSON.stringify(result.data.canvasData)));
      if (result.data.canvasId === null) setLoading(false);
    }
  };

  const reset = async () => {
    setCanvasData(JSON.parse(JSON.stringify(backup.current)));
    canvasRef?.current?.handleReset(JSON.parse(JSON.stringify(backup)));
  };

  const startTimeRef = useRef(null);

  const solutionSubmit = async (e) => {
    let res = await SubmissionService.checkSolution(
      problem.checkerCode,
      problem.checkerCanvas,
      canvasData,
      activityData
    );
    console.log("output " + res.output);
    await submissionApi.submitSolution(problem.canvasData, res.output, id);
    if (res.output === "Accepted") {
      if (startTimeRef.current) {
        const endTime = new Date();
        const durationInSeconds = Math.floor(
          (endTime - startTimeRef.current) / 1000
        );
        if (durationInSeconds > 3) {
          await problemApi.trackDuration(id, durationInSeconds);
        }
      }
      await userActivityApi.updateOnSuccessfulAttempt(id);
    } else await userActivityApi.updateOnFailedAttempt(id);
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
          problemApi.trackDuration(id, durationInSeconds);
      }
    };
  }, []);

  return (
    <ProblemsCanvasView
      problem={problem}
      id={id}
      input={canvasData}
      setInput={setCanvasData}
      ref={canvasRef}
      activityData={activityData}
      setActivityData={setActivityData}
      onSubmit={solutionSubmit}
      onReset={reset}
      type={type}
      colorMode={colorMode}
    />
  );
}
