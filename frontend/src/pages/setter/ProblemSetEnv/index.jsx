import React, { useState, useEffect, useRef } from "react";
import { useParams, useBeforeUnload } from "react-router-dom";
import { setLoading, showSuccess } from "../../../App";
import ProblemSettingView from "./ProblemSettingView";
import { problemApi } from "../../../api";
import ProblemContextProvider, { useProblemContext } from "./Model";

const ProblemSetEnvController = () => {
  const backupProblem = useRef(null);
  const { problemid } = useParams(); // problem.id
  const [isFormDirty, setFormDirty] = useState(false); // pending
  const { state: problem, dispatch } = useProblemContext();

  const getProblem = async () => {
    const res = await problemApi.getProblemById(problemid);
    if (res.success) {
      backupProblem.current = res.data;
      dispatch({
        type: "SET_INITIAL_STATE",
        payload: JSON.parse(
          JSON.stringify({
            ...res.data,
            test: null,
            testActivity: {},
            checkerCanvas: res.data.checkerCanvas ?? res.data.canvasData,
          })
        ),
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (isFormDirty) {
        const message =
          "You have unsaved changes. Are you sure you want to leave?";
        event.returnValue = message;
        return message;
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isFormDirty]);

  useEffect(() => {
    if (problemid != undefined) {
      getProblem();
    }
  }, [problemid]);

  return <ProblemSettingView backupProblem={backupProblem} />;
};
const ProblemSetEnv = () => {
  return (
    <ProblemContextProvider>
      <ProblemSetEnvController />
    </ProblemContextProvider>
  );
};
export default ProblemSetEnv;
