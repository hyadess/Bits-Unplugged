import React, { useState, useEffect, useRef } from "react";
import CanvasContainer from "../components/Canvases/CanvasContainer";
import { useProblemContext } from "../store/ProblemContextProvider";
import { canvasApi, problemApi } from "../api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faRotateRight,
} from "@fortawesome/free-solid-svg-icons";
import SaveIcon from "@mui/icons-material/Save";
const deepCopy = (obj) => {
  return typeof obj === "string"
    ? JSON.parse(obj)
    : JSON.parse(JSON.stringify(obj));
};

const CanvasDesignTab = ({ backupProblem, onSave }) => {
  const [canvasList, setCanvasList] = useState([]);
  const [canvasFullList, setCanvasFullList] = useState([]);
  const canvasRef = useRef();
  const [mode, setMode] = useState("edit");
  const stageRef = useRef(null);
  const reset = async () => {
    dispatch({
      type: "UPDATE_PROBLEM",
      payload: {
        canvasId: backupProblem?.current?.canvasId,
        canvasData: deepCopy(backupProblem?.current?.canvasData),
        editOptions: deepCopy(backupProblem?.current?.editOptions),
        previewOptions: deepCopy(backupProblem?.current?.previewOptions),
      },
    });
    if (backupProblem.current.canvasId !== problem.canvasId) {
      var res = canvasFullList.find((canvas) => {
        return canvas.id == problem.canvasId;
      });
      if (res) {
        dispatch({
          type: "UPDATE_PROBLEM",
          payload: {
            checkerCode: res.template,
            checkerCanvas: deepCopy(backupProblem.current.canvasData),
            editOptions: deepCopy(res.editOptions),
            previewOptions: deepCopy(res.previewOptions),
          },
        });
      }
    }
    canvasRef?.current?.handleReset(deepCopy(backupProblem.current.canvasData)); // can be called from the child
  };

  const getCanvasList = async () => {
    const res = await canvasApi.getAllCanvas();
    if (res.success) {
      setCanvasFullList(res.data);
      const newArray = res.data.map((canvas) => ({
        value: canvas.id,
        label: canvas.name,
      }));

      setCanvasList(newArray);
      // console.log("=->", res);
    }
  };

  useEffect(() => {
    getCanvasList();
  }, []);

  const changeCanvas = (canvasId) => {
    // if (problem.canvasId == canvasId) return;
    dispatch({ type: "UPDATE_CANVAS_ID", payload: canvasId });
    // console.log(problem.canvasId);
    // type: CHANGE_CANVAS
    if (canvasId == backupProblem.current.canvasId) {
      // saved one
      const temp = backupProblem.current;
      dispatch({
        type: "UPDATE_PROBLEM",
        payload: {
          canvasData: deepCopy(temp.canvasData),
          checkerCode: temp.checkerCode,
          checkerCanvas: deepCopy(temp.checkerCanvas ?? temp.canvasData),
          test: null,
          testActivity: {},
          editOptions: deepCopy(temp.editOptions),
          previewOptions: deepCopy(temp.previewOptions),
        },
      });
      dispatch({
        type: "SET_TEST_CANVAS",
        payload: deepCopy(temp.canvasData),
      });
    } else {
      var res = canvasFullList.find((canvas) => {
        return canvas.id == canvasId;
      });
      if (res) {
        // testRef.current.handleReset(
        //   JSON.parse(JSON.stringify(problem.canvasData))
        // ); // Call this after reset
        dispatch({
          type: "UPDATE_PROBLEM",
          payload: {
            canvasData: null,
            checkerCode: res.template,
            checkerCanvas: null,
            test: null,
            testActivity: {},
            editOptions: deepCopy(res.editOptions),
            previewOptions: deepCopy(res.previewOptions),
          },
        });
      }
    }
  };

  const handleCanvasChange = (prop) => (e) => {
    changeCanvas(e.target.value);
  };

  const { state: problem, dispatch } = useProblemContext();

  // useEffect(() => {
  //   console.log("Backup:", backupProblem?.current?.canvasData.array);
  // }, [problem.canvasData]);

  // useEffect(() => {
  //   console.log("Handle reset called");
  //   canvasRef?.current?.handleReset(
  //     deepCopy(problem.canvasData) // can be called from the child
  //   );
  // }, [problem.canvasId]);
  return (
    <div className="rounded-[30px] pb-[0.25rem] bg-[#fbfbfb]">
      <CanvasContainer
        canvasId={problem.canvasId}
        input={problem.canvasData}
        setInput={(dataOrFunction) => {
          console.log("Updating from here");
          dispatch((prevState) => {
            return {
              type: "UPDATE_CANVAS",
              payload:
                typeof dataOrFunction === "function"
                  ? dataOrFunction(prevState.canvasData)
                  : dataOrFunction,
            };
          });
        }}
        onCanvasChange={changeCanvas}
        ref={canvasRef}
        mode={mode}
        editOptions={problem.editOptions}
        setEditOptions={(data) => {
          dispatch({
            type: "UPDATE_EDIT_OPTIONS",
            payload: data,
          });
        }}
        previewOptions={problem.previewOptions}
        setPreviewOptions={(data) => {
          dispatch({
            type: "UPDATE_PREVIEW_OPTIONS",
            payload: data,
          });
        }}
        stageRef={stageRef}
      />
      <div className="w-full h-[.2rem] bg-gray-200"></div>
      <div className=" rounded-full w-80 mx-auto h-12 flex items-center justify-between gap-1 my-4">
        <div
          className="flex gap-2 items-center justify-center bu-text-primary bu-button-secondary w-full h-full rounded-l-full text-2xl"
          onClick={() => {
            reset();
          }}
        >
          {/* <RotateLeftIcon /> */}
          <FontAwesomeIcon icon={faRotateRight} />
        </div>

        <div
          className="flex gap-2 items-center justify-center bu-button-secondary w-full h-full text-2xl "
          onClick={() => {
            setMode(mode === "edit" ? "edit_preview" : "edit");
          }}
        >
          <FontAwesomeIcon icon={mode === "edit" ? faEye : faEyeSlash} />
          {/* RUN */}
        </div>
        <div
          className="flex gap-2 items-center justify-center bu-text-primary bu-button-secondary w-full h-full rounded-r-full text-2xl"
          onClick={async () => {
            await onSave();
            backupProblem.current.canvasId = problem.canvasId;
            backupProblem.current.editOptions = problem.editOptions;
            backupProblem.current.previewOptions = problem.previewOptions;
          }}
        >
          {/* SAVE */}
          <SaveIcon />
        </div>
      </div>
    </div>
  );
};

export default CanvasDesignTab;
