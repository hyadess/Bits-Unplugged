import React, { useState, useEffect, useRef, useContext } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
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
  const canvasRef = useRef();

  const { state: problem, dispatch } = useProblemContext();
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    renderProblem();
  }, []);
  const deepCopy = (obj) => {
    return typeof obj === "string"
      ? JSON.parse(obj)
      : JSON.parse(JSON.stringify(obj));
  };

  const renderProblem = async () => {
    const res = await problemApi.getProblemById(id);

    if (res.success) {
      backup.current = res.data.canvasData;
      if (searchParams.get("submission")) {
        const res2 = await submissionApi.getSubmissionById(
          searchParams.get("submission")
        );
        if (res2.success) {
          console.log("Submission:", res2.data, searchParams.get("submission"));
          dispatch({
            type: "SET_INITIAL_STATE",
            payload: JSON.parse(
              JSON.stringify({
                ...res.data,
                test: deepCopy(res2.data.canvasData),
                testActivity: deepCopy(res2.data.userActivity),
              })
            ),
          });
        }
      } else {
        dispatch({
          type: "SET_INITIAL_STATE",
          payload: JSON.parse(
            JSON.stringify({
              ...res.data,
              test: deepCopy(res.data.canvasData),
              testActivity: {},
            })
          ),
        });
      }

      // setCanvasData(JSON.parse(JSON.stringify(result.data.canvasData)));
      if (res.data.canvasId === null) setLoading(false);
    }
  };

  const reset = async () => {
    dispatch({
      type: "SET_TEST_CANVAS",
      payload: deepCopy(problem.canvasData),
    });
    canvasRef?.current?.handleReset(deepCopy(problem.canvasData));
  };

  const startTimeRef = useRef(null);

  const solutionSubmit = async (verdict, image) => {
    if (verdict === "Accepted") {
      if (startTimeRef.current) {
        const endTime = new Date();
        const durationInSeconds = Math.floor(
          (endTime - startTimeRef.current) / 1000
        );

        if (durationInSeconds > 1 && type == 0) {
          console.log("Duration:", durationInSeconds);
          await submissionApi.submitSolution(
            problem.test,
            verdict,
            id,
            durationInSeconds,
            image,
            problem.testActivity
          );
        } else {
          await submissionApi.submitSolution(
            problem.test,
            verdict,
            id,
            0,
            image,
            problem.testActivity
          );
        }
      }
    } else {
      await submissionApi.submitSolution(
        problem.test,
        verdict,
        id,
        0,
        image,
        problem.testActivity
      );
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
