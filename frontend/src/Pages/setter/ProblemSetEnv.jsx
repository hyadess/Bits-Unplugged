import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CanvasContainer from "../../Components/Canvas/CanvasContainer";
import SolutionChecker from "../SolutionChecker";
import { Button } from "@mui/material";
import ProblemController from "../../controller/problemController";
import ProbSetTab from "../../Components/ProbSetTab";
import ProblemStatement from "./Statement";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import SaveIcon from "@mui/icons-material/Save";
import Confirmation from "../../Components/Confirmation";
import {
  faExpand,
  faSave,
  faTrashCan,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SelectionField, SelectionField2 } from "../../Components/InputFields";

import CanvasController from "../../controller/canvasController";
import { setLoading } from "../../App";
import { Save } from "@mui/icons-material";
const problemController = new ProblemController();
const canvasController = new CanvasController();

const SolutionCheckerTab = ({
  checkerType,
  setCheckerType,
  code,
  setCode,
  input,
  handleCheckSolution,
  canvasId,
  checkerCanvas,
  setCheckerCanvas,
  params,
  setParams,
  setUiParams,
  uiParams,
  controlParams,
  setControlParams,
  updateSolutionChecker,
  backup,
  canvasRef,
}) => {
  const [output, setOutput] = useState("");
  const [stdout, setStdout] = useState([]);
  const resetChecker = () => {
    setCheckerCanvas(JSON.parse(JSON.stringify(backup)));
  };
  return (
    <>
      <SelectionField
        label="Choose Checker"
        onChange={setCheckerType}
        value={checkerType}
        options={[
          { label: "code", value: 0 },
          { label: "canvas", value: 1 },
        ]}
      />
      {checkerType == 0 ? (
        <SolutionChecker
          code={code}
          setCode={setCode}
          input={input}
          stdout={stdout}
          output={output}
          setOutput={setOutput}
          setStdout={setStdout}
          checkSubmit={handleCheckSolution}
        />
      ) : (
        <CanvasContainer
          id={canvasId}
          input={checkerCanvas}
          setInput={setCheckerCanvas}
          ref={canvasRef}
          mode="preview"
          params={params}
          setParams={setParams}
          uiParams={uiParams}
          setUiParams={setUiParams}
          controlParams={controlParams}
          setControlParams={setControlParams}
        />
      )}
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
  );
};

export default function ProblemSetEnv() {
  const { prob_id } = useParams();
  const [params, setParams] = useState({});
  const [uiParams, setUiParams] = useState({});
  const [checkerCanvas, setCheckerCanvas] = useState(null);
  const [controlParams, setControlParams] = useState({});
  const navigator = useNavigate();
  const switchPath = (pathname) => {
    navigator(pathname);
  };
  const [checkerType, setCheckerType] = useState(0);
  const getProblem = async () => {
    //console.log(prob_id)
    const res = await problemController.getProblemById(prob_id);
    if (res.success) {
      setInput(JSON.parse(JSON.stringify(res.data[0].canvas_data)));
      setBackup(JSON.parse(JSON.stringify(res.data[0].canvas_data)));
      setCheckerCanvas(JSON.parse(JSON.stringify(res.data[0].canvas_data)));
      setTitle(res.data[0].title);
      setProblemStatement(res.data[0].statement);
      setCheckerType(res.data[0].checker_type ? res.data[0].checker_type : 0);
      if (res.data[0].checker_type == 0) setCode(res.data[0].checker_code);
      else if (res.data[0].checker_canvas !== null)
        setCheckerCanvas(res.data[0].checker_canvas);
      setCanvasId(res.data[0].canvas_id);
      setBackupId(res.data[0].canvas_id);
      setParams(res.data[0].params);
      setUiParams(res.data[0].ui_params);
      setControlParams(res.data[0].control_params);
      setLoading(false);
    }
  };

  const [output, setOutput] = useState("");
  const [stdout, setStdout] = useState([]);

  const handleCheckSolution = async () => {
    try {
      const result = await problemController.checkSolution(code, input);
      setOutput(result.output);
      setStdout(result.stdout);
    } catch (error) {
      console.error(error);
    }
  };

  //title.......................
  const [backupId, setBackupId] = useState(null);
  const [canvasId, setCanvasId] = useState(null);
  const [title, setTitle] = useState("Title");
  const [isTextEditable, setIsTextEditable] = useState(false);

  const handleTextClick = () => {
    setIsTextEditable(!isTextEditable);
  };
  const handleTextChange = (event) => {
    setTitle(event.target.value);
  };

  //statement.......................
  const [problemStatement, setProblemStatement] = useState(" "); // Replace with your actual problem statement

  // Function to handle changes in the textarea

  const [open, setOpen] = useState(false);
  const [code, setCode] = useState("");
  const [backup, setBackup] = useState(null);
  const [input, setInput] = useState(null);
  const canvasRef = useRef();
  const [activeComponent, setActiveComponent] = useState("statement");
  const [canvasList, setCanvasList] = useState([]);
  const [canvasFullList, setCanvasFullList] = useState([]);
  const [resetTrigger, setResetTrigger] = useState(false);
  const getCanvasList = async () => {
    const res = await canvasController.getAllCanvas();
    if (res.success) {
      setCanvasFullList(res.data);
      const newArray = res.data.map((item) => ({
        value: item.canvas_id,
        label: item.name,
      }));

      setCanvasList(newArray);
      console.log(res);
    }
  };

  const reset = async () => {
    // const result = await problemController.getProblemById(prob_id);
    // if (result.success)
    {
      setInput(JSON.parse(JSON.stringify(backup)));
      if (backupId !== canvasId) {
        setCanvasId(backupId);
        changeCanvas(backupId);
      }
      setResetTrigger(!resetTrigger);
    }
  };

  const changeCanvas = (canvas_id) => {
    setCanvasId(canvas_id);
    var res = canvasFullList.find((element) => {
      return element.canvas_id == canvas_id;
    });

    if (res) {
      setCode(res.template);
      setInput(null);
      setParams(res.params);
      setUiParams(res.ui_params);
      setControlParams(res.control_params);
    }
  };

  const handleCanvasChange = (prop) => (e) => {
    changeCanvas(e.target.value);
  };

  useEffect(() => {
    canvasRef.current !== undefined &&
      canvasRef.current !== null &&
      canvasRef.current.handleReset();
  }, [resetTrigger]);

  // const SolutionCheckerTab = () => {
  //   const resetChecker = () => {
  //     setCheckerCanvas(JSON.parse(JSON.stringify(backup)));
  //   };
  //   return (
  //     <>
  //       <SelectionField
  //         label="Choose Checker"
  //         onChange={setCheckerType}
  //         value={checkerType}
  //         options={[
  //           { label: "code", value: 0 },
  //           { label: "canvas", value: 1 },
  //         ]}
  //       />
  //       {checkerType == 0 ? (
  //         <SolutionChecker
  //           code={code}
  //           setCode={setCode}
  //           input={input}
  //           stdout={stdout}
  //           output={output}
  //           setOutput={setOutput}
  //           setStdout={setStdout}
  //           checkSubmit={handleCheckSolution}
  //         />
  //       ) : (
  //         <>
  //           <CanvasContainer
  //             id={canvasId}
  //             input={checkerCanvas}
  //             setInput={setCheckerCanvas}
  //             ref={canvasRef}
  //             mode="preview"
  //             params={params}
  //             setParams={setParams}
  //             uiParams={uiParams}
  //             setUiParams={setUiParams}
  //             controlParams={controlParams}
  //             setControlParams={setControlParams}
  //           />
  //         </>
  //       )}
  //       <div
  //         className="flex py-5"
  //         style={{ justifyContent: "space-between", marginLeft: "auto" }}
  //       >
  //         <Button
  //           variant="contained"
  //           color="success"
  //           size="large"
  //           onClick={() => {
  //             resetChecker();
  //           }}
  //           startIcon={
  //             <RotateLeftIcon sx={{ fontSize: "2rem", color: "white" }} />
  //           }
  //         >
  //           Reset
  //         </Button>
  //         <Button
  //           variant="contained"
  //           onClick={() => {
  //             // updateCanvas();
  //             updateSolutionChecker();
  //           }}
  //           size="large"
  //           startIcon={<SaveIcon sx={{ fontSize: "2rem", color: "white" }} />}
  //         >
  //           Save
  //         </Button>
  //       </div>
  //     </>
  //   );
  // };

  const renderComponent = () => {
    switch (activeComponent) {
      case "statement":
        return (
          <ProblemStatement
            problemStatement={problemStatement}
            setStatement={setProblemStatement}
          />
        );
      case "canvas":
        return (
          <>
            <SelectionField2
              label="Choose Canvas"
              onChange={handleCanvasChange}
              id="canvas_id"
              value={canvasId == null ? "" : canvasId}
              options={canvasList}
            />
            {canvasId && (
              <CanvasContainer
                id={canvasId}
                input={input}
                setInput={setInput}
                ref={canvasRef}
                mode="edit"
                params={params}
                setParams={setParams}
                uiParams={uiParams}
                setUiParams={setUiParams}
                controlParams={controlParams}
                setControlParams={setControlParams}
              />
            )}

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
                onClick={() => {
                  updateCanvas();
                  updateSolutionChecker();
                }}
                size="large"
                startIcon={
                  <SaveIcon sx={{ fontSize: "2rem", color: "white" }} />
                }
              >
                Save
              </Button>
            </div>
          </>
        );
      case "solution":
        return (
          canvasId && (
            <SolutionCheckerTab
              checkerType={checkerType}
              setCheckerType={setCheckerType}
              code={code}
              setCode={setCode}
              input={input}
              handleCheckSolution={handleCheckSolution}
              canvasId={canvasId}
              checkerCanvas={checkerCanvas}
              setCheckerCanvas={setCheckerCanvas}
              params={params}
              setParams={setParams}
              setUiParams={setUiParams}
              uiParams={uiParams}
              controlParams={controlParams}
              setControlParams={setControlParams}
              updateSolutionChecker={updateSolutionChecker}
              backup={backup}
              canvasRef={canvasRef}
            />
          )
        );
      default:
        return null;
    }
  };

  const deleteProblem = async () => {
    const res = await problemController.deleteProblem(prob_id);
    if (res.success) {
      switchPath("/problemSet");
    }
  };

  const updateTitle = async () => {
    const res = await problemController.updateTitle(prob_id, title);
    if (res.success) {
      console.log(res);
    }
  };
  const updateStatement = async () => {
    const res = await problemController.updateStatement(
      prob_id,
      problemStatement,
    );
    if (res.success) {
      console.log(res);
    }
  };

  const updateCanvas = async () => {
    setCheckerCanvas(JSON.parse(JSON.stringify(input)));
    const res = await problemController.updateCanvas(
      prob_id,
      canvasId,
      input,
      params,
      uiParams,
      controlParams,
    );
    if (res.success) {
      console.log(res);
    }
  };

  const updateSolutionChecker = async () => {
    const res = await problemController.updateSolutionChecker(
      prob_id,
      checkerType == 0 ? code : checkerCanvas,
      checkerType,
    );
    if (res.success) {
      console.log(res);
    }
  };

  const updateAll = async () => {
    // await updateTitle();
    // await updateStatement();
    // await updateCanvas();
    // await updateSolutionChecker();
    await problemController.submitProblem(prob_id);
  };

  useEffect(() => {
    getCanvasList();
  }, []);

  useEffect(() => {
    console.log(prob_id);
    if (prob_id != undefined) {
      getProblem();
    }

    return () => {
      console.log("Leaving MyComponent");
    };
  }, [prob_id]);

  return (
    <div>
      <div>
        <div className="mx-auto max-w-screen-2xl items-center py-4 sm:pt-16 md:grid md:grid-cols-2">
          <div className="mt-4 flex flex-row items-center md:mt-0">
            <h2 className="text-center text-5xl font-extrabold tracking-tight md:text-left ">
              <span className="bu-text-title">
                <div onClick={handleTextClick} style={{ cursor: "pointer" }}>
                  {isTextEditable ? (
                    <input
                      className="title h-[3.5rem] rounded-lg border border-[#1C5B5F] text-4xl outline-none focus:border-green-800 focus:ring-4 focus:ring-green-800"
                      type="text"
                      autoFocus
                      value={title}
                      onChange={handleTextChange}
                      onClick={(e) => e.stopPropagation()} // Prevent the click event from propagating to the div
                      onBlur={() => {
                        updateTitle();
                        handleTextClick();
                      }}
                    />
                  ) : (
                    title
                  )}
                </div>
              </span>
            </h2>
            {/* <div className="bu-text-primary text-3xl bu-button-primary p-3 rounded-lg">
              <FontAwesomeIcon icon={faSave} />
            </div> */}
          </div>
          <div className="flex flex-row justify-end gap-2">
            <button
              className="bu-button flex flex-row items-center gap-4 rounded-lg bg-teal-300 px-7 py-3.5 text-center text-lg font-medium hover:bg-teal-400 active:ring-teal-300 dark:bg-green-600 dark:hover:bg-green-700 dark:active:ring-green-600"
              onClick={() => {
                setLoading(true);
                switchPath(`/problem/${prob_id}/preview`);
              }}
              // onClick={() => setOpen(true)}
            >
              <FontAwesomeIcon icon={faExpand} />
              PREVIEW
            </button>
            <button
              className="bu-button-delete flex flex-row items-center gap-4 rounded-lg px-7 py-3.5 text-center text-lg font-medium text-white"
              // onClick={deleteProblem}
              onClick={() => setOpen(true)}
            >
              <FontAwesomeIcon icon={faTrashCan} />
              DELETE
            </button>
            <button
              className="bu-button-primary flex flex-row items-center gap-4 rounded-lg px-7 py-3.5 text-center text-lg font-medium text-white"
              onClick={updateAll}
            >
              <FontAwesomeIcon icon={faUpload} />
              PUBLISH
            </button>
          </div>
        </div>
      </div>
      <ProbSetTab activeTab={activeComponent} click={setActiveComponent} />

      <div className="component-container">{renderComponent()}</div>
      <Confirmation open={open} setOpen={setOpen} onConfirm={deleteProblem} />
    </div>
  );
}
