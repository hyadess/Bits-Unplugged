import React, { useState, useEffect, useRef, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { setLoading, showToast } from "../App";
import ContestProblemView from "../views/ContestProblem";
import { contestApi, problemApi, submissionApi, userActivityApi } from "../api";
import SubmissionService from "../services/submissionService";
import GlobalContext from "../store/GlobalContext";
import ProblemContextProvider, {
  useProblemContext,
} from "../store/ProblemContextProvider";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
function ContestProblemController(endDate) {
  const { type } = useContext(GlobalContext);
  const { id } = useParams();
  const { problemid } = useParams();
  const backup = useRef(null);
  // const [problem, setProblem] = useState(null);
  // const [canvasData, setCanvasData] = useState(null);
  // const [activityData, setActivityData] = useState({});
  const canvasRef = useRef();

  const { state: problem, dispatch } = useProblemContext();

  useEffect(() => {
    const fetchData = async () => {
      renderProblem();
      // fetch contest. We need the end time
    };

    fetchData();
  }, [problemid]);
  const deepCopy = (obj) => {
    return typeof obj === "string"
      ? JSON.parse(obj)
      : JSON.parse(JSON.stringify(obj));
  };

  const renderProblem = async () => {
    const res = await problemApi.getContestProblemById(problemid);
    if (res.success) {
      backup.current = res.data.canvasData;
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
      // setCanvasData(JSON.parse(JSON.stringify(result.data.canvasData)));
      if (res.data.canvasId === null) setLoading(false);
    }
  };

  // const reset = async () => {
  //   console.log(backup.current);
  //   dispatch({
  //     type: "UPDATE_CANVAS",
  //     payload: deepCopy(backup.current),
  //   });
  //   canvasRef?.current?.handleReset(JSON.parse(JSON.stringify(backup.current)));
  // };

  const startTimeRef = useRef(null);

  const solutionSubmit = async (verdict, image) => {
    if (verdict === "Accepted") {
      if (startTimeRef.current) {
        const endTime = new Date();
        const durationInSeconds = Math.floor(
          (endTime - startTimeRef.current) / 1000
        );

        // let result;

        // if (durationInSeconds > 1 && type === 0) {
        //   console.log("Duration:", durationInSeconds);
        //   result = await submissionApi.submitSolution(
        //     problem.canvasData,
        //     res.output,
        //     problemid,
        //     durationInSeconds
        //   );
        // } else {
        //   result = await submissionApi.submitSolution(
        //     problem.canvasData,
        //     res.output,
        //     problemid,
        //     0
        //   );
        // }

        const isSolved = await contestApi.isContestProblemSolved(id, problemid);
        console.log("endTime==>", endDate);
        if (endDate?.endDate.endTime.getTime() < Date.now()) {
          showToast("Contest has ended", "error");
        } else if (
          isSolved.data.length === 0 &&
          endDate?.endDate.endTime.getTime() > Date.now()
        ) {
          const res2 = await contestApi.getContestProblemById(id, problemid);
          await contestApi.addSubmissionToContest(
            id,
            problemid,
            verdict,
            problem.test,
            problem.testActivity,
            res2.data[0].rating,
            durationInSeconds,
            image,
            new Date() - startTimeRef.current
          );
        }
      }
    } else {
      // const result = await submissionApi.submitSolution(
      //   problem.canvasData,
      //   res.output,
      //   problemid,
      //   0
      // );
      // const isSolved = await contestApi.isContestProblemSolved(id, problemid);
      // console.log("submissions==>", isSolved);
      if (startTimeRef.current) {
        const endTime = new Date();
        const durationInSeconds = Math.floor(
          (endTime - startTimeRef.current) / 1000
        );
        await contestApi.addSubmissionToContest(
          id,
          problemid,
          verdict,
          problem.test,
          problem.testActivity,
          0,
          durationInSeconds,
          image,
          new Date() - startTimeRef.current
        );
      }
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
        // if (durationInSeconds > 1 && type == 0)
        //   problemApi.trackDuration(problemid, durationInSeconds);
      }
    };
  }, []);

  return (
    <ContestProblemView
      ref={canvasRef}
      onSubmit={solutionSubmit}
      // onReset={reset}
      type={type}
      colorMode={colorMode}
    />
  );
}

const ContestProblem = (endTime) => {
  return (
    <ProblemContextProvider>
      <DndProvider backend={HTML5Backend}>
        <ContestProblemController endDate={endTime} />
      </DndProvider>
    </ProblemContextProvider>
  );
};

export default ContestProblem;
