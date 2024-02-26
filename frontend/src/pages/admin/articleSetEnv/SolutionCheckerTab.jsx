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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCode,
  faObjectGroup,
  faPlay,
  faRotateRight,
} from "@fortawesome/free-solid-svg-icons";
import { ToggleButton } from "@mui/material";
import { Code } from "@mui/icons-material";
// import SaveIcon from "@mui/icons-material/Save";
const SolutionCheckerTab = ({ onSave }) => {
  const { state: problem, dispatch } = useProblemContext();
  const [output, setOutput] = useState("");
  const [stdout, setStdout] = useState([]);
  const [checkerType, setCheckerType] = useState(1);
  const stageRef = useRef(null);
  // const [test, setTest] = useState(null);
  const onSubmit = async () => {
    const result = await SubmissionService.checkSolution(
      problem.checkerCode,
      problem.checkerCanvas,
      problem.test,
      problem.testActivity
    );
    setOutput(result.output);
    // setStdout(result.stdout);
  };

  const updateSolutionChecker = async () => {
    onSave(checkerType);
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
    <div className="relative">
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
        canvasRef && (
          <>
            <CanvasContainer
              canvasId={problem.canvasId}
              input={problem.checkerCanvas}
              setInput={(dataOrFunction) => {
                dispatch((prevState) => {
                  return {
                    type: "UPDATE_CHECKER_CANVAS",
                    payload:
                      typeof dataOrFunction === "function"
                        ? dataOrFunction(prevState.checkerCanvas)
                        : dataOrFunction,
                  };
                });
              }}
              ref={canvasRef}
              mode="preview"
              previewOptions={problem.previewOptions}
              editOptions={problem.editOptions}
              stageRef={stageRef}
            />
            <div className=" rounded-full w-80 mx-auto h-12 flex items-center justify-between gap-1 my-4">
              <div
                className="flex gap-2 items-center justify-center bu-text-primary bu-button-secondary w-full h-full rounded-l-full text-2xl"
                onClick={() => {
                  resetChecker();
                }}
              >
                {/* <RotateLeftIcon /> */}
                <FontAwesomeIcon icon={faRotateRight} />
              </div>

              <div
                className="flex gap-2 items-center justify-center bu-button-secondary w-full h-full text-2xl "
                onClick={onSubmit}
              >
                <FontAwesomeIcon icon={faPlay} />
                {/* RUN */}
              </div>
              <div
                className="flex gap-2 items-center justify-center bu-text-primary bu-button-secondary w-full h-full rounded-r-full text-2xl"
                onClick={() => {
                  updateSolutionChecker();
                }}
              >
                {/* SAVE */}
                <SaveIcon />
              </div>
            </div>
            {/* <div
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
               <SelectionField
                label="Choose Checker"
                onChange={(e) => setCheckerType(e.target.value)}
                value={checkerType}
                options={[
                  { label: "code", value: 0 },
                  { label: "canvas", value: 1 },
                ]}
              /> 
              <Button
                variant="contained"
                onClick={() => {
                  updateSolutionChecker();
                }}
                size="large"
                startIcon={
                  <SaveIcon sx={{ fontSize: "2rem", color: "white" }} />
                }
              >
                Save
              </Button>
            </div> */}
          </>
        )
      ) : (
        <></>
      )}

      <button
        className="bu-button-secondary rounded-l-full px-7 py-2 text-center text-2xl  text-white absolute bottom-0 right-0 font-bold"
        onClick={() => setCheckerType((prev) => !prev)}
      >
        <FontAwesomeIcon icon={checkerType ? faCode : faObjectGroup} />
      </button>
      {/* <SelectionField
        label="Choose Checker"
        onChange={setCheckerType}
        value={checkerType}
        options={[
          { label: "code", value: 0 },
          { label: "canvas", value: 1 },
        ]}
      /> */}
    </div>
  );
};

export default SolutionCheckerTab;
