import React, { useState, useEffect, useRef } from "react";
import CanvasContainer from "../../../components/Canvases/CanvasContainer";
import SolutionChecker from "../../SolutionChecker";
import Button from "@mui/material/Button";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import SaveIcon from "@mui/icons-material/Save";
import { SelectionField } from "../../../components/InputFields";
import { useProblemContext } from "../../../store/ProblemContextProvider";
import { problemApi } from "../../../api";
import SubmissionService from "../../../services/submissionService";
import { showSuccess } from "../../../App";
const SolutionCheckerTab = () => {
  const { state: problem, dispatch } = useProblemContext();
  const [output, setOutput] = useState("");
  const [stdout, setStdout] = useState([]);
  const [checkerType, setCheckerType] = useState(1);
  // const [test, setTest] = useState(null);
  const onSubmit = async () => {
    const result = await SubmissionService.checkSolution(
      problem.checkerCode,
      problem.checkerCanvas,
      problem.test,
      problem.testActivity
    );
    setOutput(result.output);
    setStdout(result.stdout);
  };

  const updateSolutionChecker = async () => {
    if (checkerType == 0 && problem.checkerCode == null) return;
    if (checkerType == 1 && problem.checkerCanvas == null) return;
    const res = await problemApi.updateProblem(problem.id, {
      ...(checkerType == 0 && {
        checkerCode: problem.checkerCode,
      }),
      ...(checkerType == 1 && {
        checkerCanvas: problem.checkerCanvas,
      }),
    });
    if (res.success) {
      // console.log(res);
      showSuccess("Checker saved successfully", res);
    }
  };

  const canvasRef = useRef();

  const resetChecker = () => {
    dispatch({
      type: "UPDATE_CHECKER_CANVAS",
      payload: JSON.parse(JSON.stringify(problem.canvasData)),
    });
    canvasRef?.current?.handleReset(
      JSON.parse(JSON.stringify(problem.canvasData))
    );
  };

  return (
    <>
      {checkerType == 0 ? (
        <SolutionChecker
          code={problem.checkerCode}
          setCode={(code) =>
            dispatch({ type: "UPDATE_CHECKER_CODE", payload: code })
          }
          stdout={stdout}
          output={output}
          setOutput={setOutput}
          setStdout={setStdout}
          checkSubmit={onSubmit}
          save={updateSolutionChecker}
        />
      ) : checkerType == 1 ? (
        <>
          <CanvasContainer
            canvasId={problem.canvasId}
            input={problem.checkerCanvas}
            setInput={(data) => {
              dispatch({
                type: "UPDATE_CHECKER_CANVAS",
                payload: { ...data },
              });
            }}
            ref={canvasRef}
            mode="preview"
            previewOptions={problem.previewOptions}
            editOptions={problem.editOptions}
          />
          <div
            className="flex py-5"
            style={{ justifyContent: "space-between", marginLeft: "auto" }}
          >
            <Button
              variant="contained"
              color="success"
              size="large"
              onClick={() => {
                resetChecker();
              }}
              startIcon={
                <RotateLeftIcon sx={{ fontSize: "2rem", color: "white" }} />
              }
            >
              Reset
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                updateSolutionChecker();
              }}
              size="large"
              startIcon={<SaveIcon sx={{ fontSize: "2rem", color: "white" }} />}
            >
              Save
            </Button>
          </div>
        </>
      ) : (
        <></>
      )}
      <SelectionField
        label="Choose Checker"
        onChange={setCheckerType}
        value={checkerType}
        options={[
          { label: "code", value: 0 },
          { label: "canvas", value: 1 },
        ]}
      />
    </>
  );
};

export default SolutionCheckerTab;
