import React, { useState, useEffect, useRef, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { setLoading } from "../App";
import ProblemsCanvasView from "../views/ProblemsCanvas";
import { problemApi, submissionApi, userActivityApi } from "../api";
import SubmissionService from "../services/submissionService";
import GlobalContext from "../store/GlobalContext";
import ProblemContextProvider, {
  useProblemContext,
} from "../store/ProblemContextProvider";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
function ProblemsCanvasController() {
  const { type } = useContext(GlobalContext);
  const { id } = useParams();
  const backup = useRef(null);
  // const [problem, setProblem] = useState(null);
  // const [canvasData, setCanvasData] = useState(null);
  // const [activityData, setActivityData] = useState({});
  const canvasRef = useRef();

  const { state: problem, dispatch } = useProblemContext();

  useEffect(() => {
    renderProblem();
  }, []);
  const deepCopy = (obj) => {
    return JSON.parse(JSON.stringify(obj));
  };
  const renderProblem = async () => {
    const res = await problemApi.getProblemById(id);
    if (res.success) {
      backup.current = res.data.canvasData;
      dispatch({
        type: "SET_INITIAL_STATE",
        payload: JSON.parse(
          JSON.stringify({
            ...res.data,
            activityData: {},
          })
        ),
      });
      // setCanvasData(JSON.parse(JSON.stringify(result.data.canvasData)));
      if (res.data.canvasId === null) setLoading(false);
    }
  };

  const reset = async () => {
    console.log(backup.current);
    dispatch({
      type: "UPDATE_CANVAS",
      payload: deepCopy(backup.current),
    });
    canvasRef?.current?.handleReset(JSON.parse(JSON.stringify(backup.current)));
  };

  const startTimeRef = useRef(null);

  const solutionSubmit = async (e) => {
    let res = await SubmissionService.checkSolution(
      problem.checkerCode,
      problem.checkerCanvas,
      problem.canvasData,
      problem.activityData
    );
    console.log("output " + res.output);

    if (res.output === "Accepted") {
      if (startTimeRef.current) {
        const endTime = new Date();
        const durationInSeconds = Math.floor(
          (endTime - startTimeRef.current) / 1000
        );

        if (durationInSeconds > 1 && type == 0) {
          console.log("Duration:", durationInSeconds);
          await submissionApi.submitSolution(
            problem.canvasData,
            res.output,
            id,
            durationInSeconds
          );
        } else {
          await submissionApi.submitSolution(
            problem.canvasData,
            res.output,
            id,
            0
          );
        }
      }
    } else {
      await submissionApi.submitSolution(problem.canvasData, res.output, id, 0);
    }
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

        //console.log("Duration:", durationInSeconds);
        // Send the duration to the backend
        if (durationInSeconds > 1 && type == 0)
          problemApi.trackDuration(id, durationInSeconds);
      }
    };
  }, []);

  return (
    <ProblemsCanvasView
      ref={canvasRef}
      onSubmit={solutionSubmit}
      onReset={reset}
      type={type}
      colorMode={colorMode}
    />
  );
}

const ProblemSetEnv = () => {
  return (
    <ProblemContextProvider>
      <DndProvider backend={HTML5Backend}>
        <ProblemsCanvasController />
      </DndProvider>
    </ProblemContextProvider>
  );
};

export default ProblemSetEnv;
