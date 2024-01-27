import React, { forwardRef } from "react";
import CanvasContainer from "../../../components/Canvases/CanvasContainer";
import Button from "@mui/material/Button";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import Send from "@mui/icons-material/Send";
import { useProblemContext } from "../../../store/ProblemContextProvider";
import SubmissionService from "../../../services/submissionService";
const TestTab = (props, ref) => {
  const { state: problem, dispatch } = useProblemContext();

  return (
    problem.canvasId &&
    ref && (
      <>
        <CanvasContainer
          canvasId={problem.canvasId}
          input={problem.test}
          setInput={(data) => {
            dispatch({
              type: "UPDATE_TEST_CANVAS",
              payload: { ...data },
            });
          }}
          activityData={problem.testActivity}
          setActivityData={(data) => {
            dispatch({
              type: "UPDATE_TEST_ACTIVITY",
              payload: { ...data },
            });
          }}
          ref={ref}
          mode="preview"
          previewOptions={problem.previewOptions}
          editOptions={problem.editOptions}
        />
        <div className="flex flex-row justify-between py-5">
          <Button
            variant="contained"
            color="success"
            onClick={() => {
              dispatch({
                type: "UPDATE_TEST_CANVAS",
                payload: JSON.parse(JSON.stringify(problem.canvasData)),
              });
              ref?.current.handleReset(
                JSON.parse(JSON.stringify(problem.canvasData))
              ); // Call this after reset
            }}
            startIcon={
              <RotateLeftIcon sx={{ fontSize: "2rem", color: "white" }} />
            }
          >
            Reset
          </Button>
          <Button
            variant="contained"
            onClick={() =>
              SubmissionService.checkSolution(
                problem.checkerCode,
                problem.checkerCanvas,
                problem.test,
                problem.testActivity
              )
            }
            endIcon={<Send sx={{ fontSize: "2rem", color: "white" }} />}
          >
            Submit
          </Button>
        </div>
      </>
    )
  );
};

export default forwardRef(TestTab);
