import React, { useState, useEffect, useRef } from "react";
import CanvasContainer from "../../../components/Canvases/CanvasContainer";
import Button from "@mui/material/Button";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import SaveIcon from "@mui/icons-material/Save";
import { SelectionField2 } from "../../../components/InputFields";
const CanvasDesignTab = ({
  handleCanvasChange,
  canvasId,
  canvasList,
  input,
  setInput,
  canvasRef,
  editOptions,
  setEditOptions,
  previewOptions,
  setPreviewOptions,
  reset,
  updateCanvas,
  updateSolutionChecker,
}) => {
  return (
    <>
      {canvasId && (
        <CanvasContainer
          canvasId={canvasId}
          input={input}
          setInput={setInput}
          ref={canvasRef}
          mode="edit"
          editOptions={editOptions}
          setEditOptions={setEditOptions}
          previewOptions={previewOptions}
          setPreviewOptions={setPreviewOptions}
        />
      )}

      {canvasId && (
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
        value={canvasId == null ? "" : canvasId}
        options={canvasList}
      />
    </>
  );
};

export default CanvasDesignTab;
