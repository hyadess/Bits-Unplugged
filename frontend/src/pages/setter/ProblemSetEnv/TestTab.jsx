import React, { useState, useEffect, useRef } from "react";
import CanvasContainer from "../../../components/Canvases/CanvasContainer";
import Button from "@mui/material/Button";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import Send from "@mui/icons-material/Send";
import { useProblemContext } from "./Model";
const TestTab = ({
  test,
  setTest,
  testActivity,
  setTestActivity,
  handleCheckSolution,
  input,
}) => {
  const { state: problem, dispatch } = useProblemContext();
  const testRef = useRef();
  return (
    problem.canvasId &&
    testRef && (
      <>
        <CanvasContainer
          canvasId={problem.canvasId}
          input={test}
          setInput={setTest}
          activityData={testActivity}
          setActivityData={setTestActivity}
          ref={testRef}
          mode="preview"
          previewOptions={problem.previewOptions}
          editOptions={problem.editOptions}
        />
        <div className="flex flex-row justify-between py-5">
          <Button
            variant="contained"
            color="success"
            onClick={() => {
              setTest(JSON.parse(JSON.stringify(input)));

              testRef.current.handleReset(JSON.parse(JSON.stringify(input))); // Call this after reset
            }}
            startIcon={
              <RotateLeftIcon sx={{ fontSize: "2rem", color: "white" }} />
            }
          >
            Reset
          </Button>
          <Button
            variant="contained"
            onClick={handleCheckSolution}
            endIcon={<Send sx={{ fontSize: "2rem", color: "white" }} />}
          >
            Submit
          </Button>
        </div>
      </>
    )
  );
};

export default TestTab;
