import React, { useState, useEffect, useRef } from "react";
import CanvasContainer from "../../../components/Canvases/CanvasContainer";
import Button from "@mui/material/Button";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import SaveIcon from "@mui/icons-material/Save";
import { SelectionField2 } from "../../../components/InputFields";
import { useProblemContext } from "../../../store/ProblemContextProvider";
import { canvasApi, problemApi } from "../../../api";
const CanvasDesignTab = ({ backupProblem }) => {
  const [canvasList, setCanvasList] = useState([]);
  const [canvasFullList, setCanvasFullList] = useState([]);
  const canvasRef = useRef();
  const deepCopy = (obj) => {
    return JSON.parse(JSON.stringify(obj));
  };

  const updateCanvas = async () => {
    dispatch({
      type: "UPDATE_CHECKER_CANVAS",
      payload: deepCopy(problem.canvasData),
    });
    backupProblem.current.canvasData = problem.canvasData;
    const res = await problemApi.updateProblem(problem.id, {
      canvasId: problem.canvasId,
      canvasData: problem.canvasData,
      editOptions: problem.editOptions,
      previewOptions: problem.previewOptions,
      checkerCode: problem.checkerCode,
      checkerCanvas: problem.checkerCanvas,
    });
    if (res.success) {
      // console.log(res);
    }
  };

  const reset = async () => {
    dispatch({
      type: "UPDATE_PROBLEM",
      payload: {
        canvasId: backupProblem?.current?.canvasId,
        canvasData: backupProblem?.current?.canvasData,
        editOptions: backupProblem?.current?.editOptions,
        previewOptions: backupProblem?.current?.previewOptions,
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
            editOptions: res.editOptions,
            previewOptions: res.previewOptions,
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
    // setCanvasId(canvasId;

    dispatch({ type: "UPDATE_CANVAS_ID", payload: canvasId });
    console.log(problem.canvasId);
    // type: CHANGE_CANVAS
    if (canvasId == backupProblem.current.canvasId) {
      // saved one
      const problem = backupProblem.current;
      dispatch({
        type: "UPDATE_PROBLEM",
        payload: {
          canvasData: deepCopy(problem.canvasData),
          checkerCode: problem.checkerCode,
          checkerCanvas: deepCopy(problem.checkerCanvas ?? problem.canvasData),
          editOptions: problem.editOptions,
          previewOptions: problem.previewOptions,
        },
      });
      canvasRef?.current?.handleReset(
        deepCopy(backupProblem.current.canvasData) // can be called from the child
      );
    } else {
      var res = canvasFullList.find((canvas) => {
        return canvas.id == canvasId;
      });
      if (res) {
        dispatch({
          type: "UPDATE_PROBLEM",
          payload: {
            canvasData: null,
            checkerCode: res.template,
            checkerCanvas: null,
            editOptions: res.editOptions,
            previewOptions: res.previewOptions,
          },
        });
      }
    }
  };

  const handleCanvasChange = (prop) => (e) => {
    changeCanvas(e.target.value);
  };

  const { state: problem, dispatch } = useProblemContext();
  return (
    <>
      {problem.canvasId && (
        <CanvasContainer
          canvasId={problem.canvasId}
          input={problem.canvasData}
          setInput={(data) => {
            dispatch({
              type: "UPDATE_CANVAS",
              payload: { ...data },
            });
          }}
          ref={canvasRef}
          mode="edit"
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
        />
      )}

      {problem.canvasId && (
        <div
          className="flex py-5"
          style={{ justifyContent: "space-between", marginLeft: "auto" }}
        >
          <Button
            variant="contained"
            color="success"
            size="large"
            onClick={() => {
              reset();
              // canvasRef.current.handleReset();
            }}
            startIcon={
              <RotateLeftIcon sx={{ fontSize: "2rem", color: "white" }} />
            }
          >
            Reset
          </Button>
          <Button
            variant="contained"
            onClick={async () => {
              await updateCanvas();
            }}
            size="large"
            startIcon={<SaveIcon sx={{ fontSize: "2rem", color: "white" }} />}
          >
            Save
          </Button>
        </div>
      )}

      <SelectionField2
        label="Choose Canvas"
        onChange={handleCanvasChange}
        id="canvasId"
        value={problem.canvasId == null ? "" : problem.canvasId}
        options={canvasList}
      />
    </>
  );
};

export default CanvasDesignTab;
