import React, { forwardRef, useRef } from "react";
import CanvasContainer from "../components/Canvases/CanvasContainer";
import { useProblemContext } from "../store/ProblemContextProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCamera,
  faCameraRetro,
  faCode,
  faObjectGroup,
  faPlay,
  faRotateRight,
} from "@fortawesome/free-solid-svg-icons";
import html2canvas from "html2canvas";
import { storageApi } from "api";
import SubmissionService from "services/submissionService";
const deepCopy = (obj) => {
  return typeof obj === "string"
    ? JSON.parse(obj)
    : JSON.parse(JSON.stringify(obj));
};

const CanvasPreview = ({ onSubmit, takeSnapshot }, ref) => {
  const { state: problem, dispatch } = useProblemContext();
  const stageRef = useRef(null);

  const solutionSubmit = async () => {
    console.log(problem.checkerCanvas, problem.test, problem.testActivity);
    let res = await SubmissionService.checkSolution(
      problem.checkerCode,
      problem.checkerCanvas,
      problem.test,
      problem.testActivity
    );
    takeSnapshot
      ? onSubmit(res.output, await canvasToImage())
      : onSubmit(res.output);
  };

  const saveCanvasAsImage = async () => {
    const stage = stageRef.current;

    // check if the stage is canvas or canvas = await html2canvas(element), then use canvas.toDataURL()
    let image;
    try {
      image = stage.toDataURL();
    } catch (error) {
      const canvas = await html2canvas(stage, { backgroundColor: null });
      image = canvas.toDataURL("image/png");
    }

    // Create a temporary link element
    const link = document.createElement("a");
    link.href = image;
    link.download = "canvas_image.png";

    // Trigger the download
    document.body.appendChild(link);
    link.click();

    // Clean up
    document.body.removeChild(link);
  };
  const canvasToImage = async () => {
    // Convert canvas to image file
    // Then send the image file to the server
    // Then get the response from the server
    // Then return the link to the image
    const stage = stageRef.current;
    let image;
    try {
      image = stage.toDataURL();
    } catch (error) {
      const canvas = await html2canvas(stage, { backgroundColor: null });
      image = canvas.toDataURL("image/png");
    }
    const response = await fetch(image);
    const blob = await response.blob();

    // Create FormData
    const formData = new FormData();
    formData.append("file", blob, "canvas_image.png");

    const res = await storageApi.trimmedUpload(formData);
    if (res.success) {
      return res.data.path;
    } else {
      return null;
    }
  };
  return (
    ref && (
      <div className="rounded-[30px] pb-[0.3rem] bg-[#fbfbfb]">
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
          stageRef={stageRef}
        />
        <div className="w-full h-[.2rem] bg-gray-200"></div>
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
            onClick={solutionSubmit}
          >
            <FontAwesomeIcon icon={faPlay} />
            {/* RUN */}
          </div>
          <div
            className="flex gap-2 items-center justify-center bu-text-primary bu-button-secondary w-full h-full rounded-r-full text-2xl"
            onClick={saveCanvasAsImage}
          >
            {/* SAVE */}
            <FontAwesomeIcon icon={faCameraRetro} />
          </div>
        </div>
      </div>
    )
  );
};

export default forwardRef(CanvasPreview);
