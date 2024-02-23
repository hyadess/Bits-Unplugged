import React, { forwardRef } from "react";
import CanvasContainer from "../../../components/Canvases/CanvasContainer";
import Button from "@mui/material/Button";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import Send from "@mui/icons-material/Send";
import { useProblemContext } from "../../../store/ProblemContextProvider";
import SubmissionService from "../../../services/submissionService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SaveIcon from "@mui/icons-material/Save";
import {
  faCamera,
  faCameraRetro,
  faCode,
  faObjectGroup,
  faPlay,
  faRotateRight,
} from "@fortawesome/free-solid-svg-icons";
const deepCopy = (obj) => {
  return typeof obj === "string"
    ? JSON.parse(obj)
    : JSON.parse(JSON.stringify(obj));
};

const TestTab = (props, ref) => {
  const { state: problem, dispatch } = useProblemContext();

  return (
    ref && (
      <>
        <CanvasContainer
          canvasId={problem.canvasId}
          input={problem.test}
          setInput={(dataOrFunction) => {
            dispatch((prevState) => {
              return {
                type: "UPDATE_TEST_CANVAS",
                payload:
                  typeof dataOrFunction === "function"
                    ? dataOrFunction(prevState.test)
                    : dataOrFunction,
              };
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
        <div className=" rounded-full w-80 mx-auto h-12 flex items-center justify-between gap-1 my-4">
          <div
            className="flex gap-2 items-center justify-center bu-text-primary bu-button-secondary w-full h-full rounded-l-full text-2xl"
            onClick={() => {
              dispatch({
                type: "SET_TEST_CANVAS",
                payload: deepCopy(problem.canvasData),
              });
              ref?.current.handleReset(deepCopy(problem.canvasData)); // Call this after reset
            }}
          >
            {/* <RotateLeftIcon /> */}
            <FontAwesomeIcon icon={faRotateRight} />
          </div>

          <div
            className="flex gap-2 items-center justify-center bu-button-secondary w-full h-full text-2xl "
            onClick={() =>
              SubmissionService.checkSolution(
                problem.checkerCode,
                problem.checkerCanvas,
                problem.test,
                problem.testActivity
              )
            }
          >
            <FontAwesomeIcon icon={faPlay} />
            {/* RUN */}
          </div>
          <div
            className="flex gap-2 items-center justify-center bu-text-primary bu-button-secondary w-full h-full rounded-r-full text-2xl"
            onClick={() => {
              // updateSolutionChecker();
            }}
          >
            {/* SAVE */}
            <FontAwesomeIcon icon={faCameraRetro} />
          </div>
        </div>
      </>
    )
  );
};

export default forwardRef(TestTab);
