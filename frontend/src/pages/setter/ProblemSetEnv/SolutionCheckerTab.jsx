import React, { useState, useEffect, useRef } from "react";
import CanvasContainer from "../../../components/Canvases/CanvasContainer";
import SolutionChecker from "../../SolutionChecker";
import Button from "@mui/material/Button";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import SaveIcon from "@mui/icons-material/Save";
import { SelectionField } from "../../../components/InputFields";
const SolutionCheckerTab = ({
  checkerType,
  setCheckerType,
  code,
  setCode,
  input,
  canvasId,
  checkerCanvas,
  setCheckerCanvas,
  previewOptions,
  editOptions,
  updateSolutionChecker,
  handleCheckSolution,
}) => {
  const [output, setOutput] = useState("");
  const [stdout, setStdout] = useState([]);
  // const [test, setTest] = useState(null);
  const onSubmit = async () => {
    const result = await handleCheckSolution();
    setOutput(result.output);
    setStdout(result.stdout);
  };
  // useEffect(() => {
  //   setTest(JSON.parse(JSON.stringify(input)));
  // }, [input]);

  const resetChecker = () => {
    setCheckerCanvas(JSON.parse(JSON.stringify(input)));
    canvasRef.current !== undefined &&
      canvasRef.current !== null &&
      canvasRef.current.handleReset(JSON.parse(JSON.stringify(input)));
  };
  const canvasRef = useRef();

  return (
    <>
      {checkerType == 0 ? (
        <SolutionChecker
          code={code}
          setCode={setCode}
          input={input}
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
            canvasId={canvasId}
            input={checkerCanvas}
            setInput={setCheckerCanvas}
            ref={canvasRef}
            mode="preview"
            previewOptions={previewOptions}
            editOptions={editOptions}
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
                // updateCanvas();
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
